import { model, Schema, Model, Document, models } from 'mongoose';
import bcrypt from 'bcrypt'
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

interface Admin extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  age: number;
  claims: Array<object>;
}

const AdminSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    match: [emailRegex, "Invalid e-mail"],
    validate: [{
      async validator (email:string) {
        try {
          const admin = await models.Admin.findOne({email})
          return !admin
        } catch (error) {
          return false
        }
      },
      message: 'Email already in used'
    }]  },
  name: { type: String, required: true },
  password: { 
    type: String, 
    required: true, 
    match: [passwordRegExp, "Invalid email or password"], 
  },
  claims: { type: [{ type: Schema.Types.ObjectId, ref: 'Claims' }] },
});

AdminSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});


// TODO: pre save function, password and email Regex
const Admin: Model<Admin> = model('Admin', AdminSchema);

export default Admin;
