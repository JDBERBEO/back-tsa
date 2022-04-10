import { model, Schema, Model, Document } from 'mongoose';

interface Admin extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  age: number;
  claims: Array<object>;
}

const AdminSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: {type: String, required: true},
  claims: {type: [{ type: Schema.Types.ObjectId, ref: "Claims" }]}
});


// TODO: pre save function, password and email Regex
const Admin: Model<Admin> = model('User', AdminSchema);

export default Admin