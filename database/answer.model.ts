import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upvote: number;
  downvote: number;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
    content: { type: String, required: true },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
