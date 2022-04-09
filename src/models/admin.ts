import { model, Schema, Model, Document } from 'mongoose';

interface Admin extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password?: string
  age: number
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: {type: String, required: true}
});

const Admin: Model<Admin> = model('User', UserSchema);

export default Admin