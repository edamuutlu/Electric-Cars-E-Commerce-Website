import { findUserId } from "./findUserId";
import ShoppingCart from "@/models/ShoppingCart";

export const findProduct = async () => {
    const userId = await findUserId();    

    if (userId !== null) {
      try {
        const product = await ShoppingCart.findOne({ userId: userId });
        if (product) {
          return product.productId;
        } else {
          return null;
        }
      } catch (err) {
        console.error("Hata:", err);
      }
    } else {
      console.log("Ürün bilgisi bulunamadı.");
    }

  return null; // Eğer kullanıcı bulunamazsa null döndürülüyor
};
