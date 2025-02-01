import mongoose from "mongoose";

export type ItemDocument = mongoose.Document & {
  vendorId: mongoose.Types.ObjectId;
  itemName: string;
  description: string;
  price: number;
  category: string;
  preparationTime: string;
  image: string;
};

export type ItemData = {
  itemName: string;
  description: string;
  price: number;
  category: string;
  preparationTime: string;
};

export type UpdateItemData = {
  itemName?: string;
  description?: string;
  price?: number;
  category?: string;
  preparationTime: number;
  image?: string;
};

const ItemSchema = new mongoose.Schema<ItemDocument>(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vendor",
    },
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: " Item",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Item = mongoose.model<ItemDocument>("Item", ItemSchema);

export default Item;
