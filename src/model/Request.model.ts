import mongoose, { Schema, Document, Types, Collection } from "mongoose";

export interface Request extends Document {
    type: string;
    method: string;
    URL: string;
    params: Record<string, string>;
    header: Record<string, string>;
    body: Record<string, any>;
}

const RequestSchema: Schema<Request> = new Schema({
    type: {
        type: String,
    },
    method: {
        type: String,
    },
    URL: {
        type: String,
    },
    params: {
        type: Schema.Types.Mixed,
        default: {},
    },
    header: {
        type: Schema.Types.Mixed,
        default: {},
    },
    body: {
        type: Schema.Types.Mixed,
        default: {},
    },
}, { timestamps: true });

const RequestModel = (mongoose.models.Request as mongoose.Model<Collection>) || mongoose.model<Request>("Request", RequestSchema);

export default RequestModel;