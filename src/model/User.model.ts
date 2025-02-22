import mongoose, { Schema, Document } from "mongoose";

interface IRequest {
    name: string;
    type: string;
    method: string;
    URL: string;
    headers?: Record<string, string>;
    body?: string;
}

interface ICollection {
    name: string;
    requests: IRequest[];
}

interface IUser extends Document {
    fullName: string;
    email: string;
    photoURL: string;
    collections: ICollection[];
}

const requestSchema: Schema<IRequest> = new Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'http' },
    method: { type: String, default: 'GET' },
    URL: { type: String, default: '' },
    headers: { type: Map, of: String, default: { "Content-Type": "application/json" } },
    body: { type: Schema.Types.Mixed, default: '' },
});

const collectionSchema: Schema<ICollection> = new Schema({
    name: { type: String, required: true },
    requests: { type: [requestSchema], required: true, default: [] },
});

const userSchema: Schema<IUser> = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String },
    collections: { type: [collectionSchema], required: true },
});

const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", userSchema);

export default User;