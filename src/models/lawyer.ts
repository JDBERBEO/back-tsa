import { model, Schema, Model, Document } from 'mongoose';

interface Lawyer extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  age: number;
  claims: Array<object>;
}

const LawyerSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  claims: { type: [{ type: Schema.Types.ObjectId, ref: 'Claims' }] },
});

// TODO: pre save function, password and email Regex
const Lawyer: Model<Lawyer> = model('User', LawyerSchema);

export default Lawyer;
