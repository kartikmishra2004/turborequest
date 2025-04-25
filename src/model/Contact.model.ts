import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
    name: string,
    email: string,
    subject: string,
    message: string,
}

const contactSchema: Schema<IContact> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Contact = (mongoose.models.Contact as mongoose.Model<IContact>) || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;