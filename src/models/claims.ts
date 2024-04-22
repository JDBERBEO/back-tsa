import { model, Schema, Model, Document } from 'mongoose';

interface Claim extends Document {
  templateType: string;
  templateInternalCode: string;
  fileUrl: string;
  fileUid: string;
  revisionStatus: string;
  transactionId?: string;
  payment?: object;
  claimFields?: ClaimFields;
}

interface ClaimFields extends Claim {
  proofs: string;
  attachProofs: { name: string; url: string }[];
  templateId: string;
  acceptTerms: boolean;
  defendantName: string;
  agreementDate: string;
  claimerName: string;
  claimerIdNumber: string;
  claimerIdCity: string;
  claimerCity: string;
  claimerAddress: string;
  claimerEmail: string;
  documentMonth: string;
  documentYear: string;
  casePrice: string;
  facts: string;
}

const ClaimSchema: Schema = new Schema(
  {
    templateType: {
      type: String,
      required: true,
    },
    templateInternalCode: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileUid: {
      type: String,
      required: true,
    },
    revisionStatus: {
      type: String,
      default: 'notChecked',
    },
    transactionId: {
      type: String,
    },
    payment: {
      type: Object,
      status: '',
      amount: 0,
      currency: '',
      tax: 0,
      description: '',
      storeResponse: '',
      paymentMethod: '',
      transactionId: '',
    },
    claimFields: {
      type: Object,
      proofs: '',
      attachProofs: [],
      templateId: '',
      acceptTerms: false,
      defendantName: '',
      agreementDate: '',
      claimerName: '',
      claimerIdNumber: '',
      claimerIdCity: '',
      claimerCity: '',
      claimerAddress: '',
      claimerEmail: '',
      documentMonth: '',
      documentYear: '',
      casePrice: '',
      facts: '',
    },
    // expireAt: {
    //   type: Date,
    //   default: Date.now(),
    //   expires: 30
    // }
  },
  {
    timestamps: true,
  }
);

const Claim: Model<Claim> = model('Claim', ClaimSchema);

export default Claim;
