import mongoose from "mongoose";

export type FavoriteDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
};

const FavoriteSchema = new mongoose.Schema<FavoriteDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Favorite",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Favorite = mongoose.model<FavoriteDocument>("Favorite", FavoriteSchema);

export default Favorite;
