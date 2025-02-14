import mongoose, { Schema, Document, Types } from "mongoose";

export interface Collection extends Document {
    createdBy: Types.ObjectId; // References for user model
    requests: Types.ObjectId[]; // References for request model
};

const CollectionSchema: Schema<Collection> = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    requests: [{
        type: Schema.Types.ObjectId,
        ref: "Request",
    }],
}, { timestamps: true });

const CollectionModel = (mongoose.models.Collection as mongoose.Model<Collection>) || mongoose.model<Collection>("Collection", CollectionSchema);

export default CollectionModel;