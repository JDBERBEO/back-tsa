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
  claimerEmail?: string;
  payment?: object;
  // claimFields?: object
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
  },
  claimerEmail: {
    type: String,
    required: true
  },
  payment: {
    type: Object,
    default: {
      status: '',
      amount: 0,
      currency: '',
      tax: 0,
      description: '',
      storeResponse: '',
      paymentMethod: '',
    }
  },
  // {
  //   claimFields: {
  //     type: Object,
  //     default: {
        
  //     }
  //   }
  // }
  // expireAt: {
  //   type: Date,
  //   default: Date.now(),
  //   expires: 30
  // }
  },
  {
    timestamps: true,
  });

const Claim: Model<Claim> = model('Claim', ClaimSchema);

export default Claim;
