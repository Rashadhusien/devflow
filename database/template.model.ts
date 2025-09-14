import { model, models, Schema, types } from "mongoose";

export const IModel {}

const ModelSchema = new Schema<IModel>({}, {timestamps: true})

const Model = models?.Model || model<IModel>("Model", ModelSchema)

export default Model