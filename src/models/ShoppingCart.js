import mongoose from "mongoose";

const { Schema } = mongoose;

const shoppingcartSchema = new Schema(
  {
    userId: {
      type: Number,
      unique: true, 
      required: true,
    },
    productId: {
      type: Number,
      unique: true,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ShoppingCart || mongoose.model("shoppingCart", shoppingcartSchema);