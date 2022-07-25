import { model, Schema, Model, Document } from 'mongoose';

interface Claim extends Document {
  name: string;
  internalCode: string;
  fileUrl: string;
  fileUid: string;
  description: string;
  defendant?: string;
  claimer?: string;
  status?: string;
}

const ClaimSchema: Schema = new Schema(
  {
  name: { 
    type: String, 
    required: true 
  },
  internalCode: { 
    type: String, 
    required: true 
  },
  fileUrl: { 
    type: String, 
    required: true 
  },
  fileUid: { 
    type: String, 
    required: true 
  },
  defendant: {
    type: String
  },
  claimer:{
    type: String
  },
  status: {
    type: String,
    default: "notChecked"
  }
  },
  {
    timestamps: true,
  });

const Claim: Model<Claim> = model('Claim', ClaimSchema);

export default Claim;
