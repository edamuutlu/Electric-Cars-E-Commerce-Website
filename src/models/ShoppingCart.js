import mongoose from "mongoose";

const { Schema } = mongoose;

const shoppingcartSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true, 
      required: true,
    },
    productId: {
      type: [String],
      unique: false,
      required: false,
    },
  },
  { timestamps: true }
);


export default mongoose.models.ShoppingCart || mongoose.model("shoppingCart", shoppingcartSchema);