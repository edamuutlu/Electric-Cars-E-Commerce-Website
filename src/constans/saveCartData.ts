import ShoppingCart from "@/models/ShoppingCart";
import { findUserId } from "@/constans/findUserId";
 
export const saveCartData = async ({productIds}) => {
    try {
      const userId = await findUserId();
      if (userId) {
        const newShoppingCartItem = new ShoppingCart({
          userId: userId,
          productId: productIds
        });

        await newShoppingCartItem.save();

        console.log("ShoppingCart instance saved successfully.");
      } else {
        console.log("Kullanıcı ID'si bulunamadı.");
      }
    } catch (error) {
      console.error("Error saving ShoppingCart instance:", error);
    }
  };