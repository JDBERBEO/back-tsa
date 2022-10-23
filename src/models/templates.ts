import { model, Schema, Model, Document } from 'mongoose';

interface Template extends Document {
  name: string;
  internalCode: string;
  fileUrl: string;
  fileUid: string;
  description: string;
  price: number
}

const TemplateSchema: Schema = new Schema(
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
  price: {
    type: Number,
    required: true,
    default: 9000000
  }
  },
  {
    timestamps: true,
  });

const Template: Model<Template> = model('Template', TemplateSchema);

export default Template;
