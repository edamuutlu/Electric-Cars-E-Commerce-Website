import { getServerSession } from "next-auth";
import { findUserId } from "./findUserId";
import ShoppingCart from "@/models/ShoppingCart";

export const deleteProduct = async () => {
    const userId = await findUserId();    

    if (userId !== null) {
      try {
        const product = await ShoppingCart.deleteOne({ userId: userId });
      } catch (err) {
        console.error("Hata:", err);
      }
    } else {
      console.log("Ürün bilgisi bulunamadı.");
    }

  return null; 
};
