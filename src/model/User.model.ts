import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
    fullName: string;
    email: string;
    photoURL: string;
    collections: Types.ObjectId[]; // References for collection model
};

const UserSchema: Schema<User> = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    photoURL: {
        type: String,
    },
    collections: [{
        type: Schema.Types.ObjectId,
        ref: "Collection"
    }],
}, { timestamps: true });

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;