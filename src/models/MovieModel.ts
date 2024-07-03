import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IMovie>("Movie", MovieSchema);
