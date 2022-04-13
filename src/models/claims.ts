import { model, Schema, Model, Document } from 'mongoose';

interface Claim extends Document {
  name: string;
  internalCode: string;
  fileUrl: string;
  fileUid: string;
  description: string;
  timestamps: boolean;
}

const ClaimSchema: Schema = new Schema({
  name: { type: String, required: true },
  internalCode: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileUid: {type: String, required: true},
  timestamps: {type: Boolean, required: true, default: true},
});


const Claim: Model<Claim> = model('User', ClaimSchema);

export default Claim