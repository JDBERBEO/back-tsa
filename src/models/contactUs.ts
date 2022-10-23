import { model, Schema, Model, Document } from 'mongoose';

interface ContactUs extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactUsSchema: Schema = new Schema(
  {
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  },
  {
    timestamps: true,
  });

const ContactUs: Model<ContactUs> = model('ContactUs', ContactUsSchema);

export default ContactUs;
