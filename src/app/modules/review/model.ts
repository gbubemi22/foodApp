import mongoose from 'mongoose';

export type ReviewDocument = mongoose.Document & {
  riderId: mongoose.Schema.Types.ObjectId;
  reviewer: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
};

const ReviewSchema = new mongoose.Schema<ReviewDocument>(
  {
     riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Review',
    collation: {
      locale: 'en',
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema);

export default Review;