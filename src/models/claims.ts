import { model, Schema, Model, Document } from 'mongoose';

interface Claim extends Document {
  templateType: string;
  templateInternalCode: string;
  fileUrl: string;
  fileUid: string;
  revisionStatus: string;
  payment?: object;
  claimFields?: object
}

const ClaimSchema: Schema = new Schema(
  {
    templateType: { 
    type: String, 
    required: true 
  },
  templateInternalCode: { 
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
  revisionStatus: {
    type: String,
    default: "notChecked"
  },
  payment: {
    type: Object,
    default: {
      status: 'notPaid',
      amount: 0,
      currency: '',
      tax: 0,
      description: '',
      storeResponse: '',
      paymentMethod: '',
    }
  },
  claimFields: {
    type: Object,
      proofs: '',
      templateId: '',
      acceptTerms: false,
      defendantName: '',
      agreementDate: '',
      claimerName: '',
      claimerIdNumber: '',
      claimerCity: '',
      claimerAddress: '',
      claimerEmail: '',
      documentMonth: '',
      documentYear: '',
      casePrice: '',
      facts: ''
  }
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
