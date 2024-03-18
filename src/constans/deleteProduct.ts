// deleteProduct.js

import ShoppingCart from "@/models/ShoppingCart";

export async function deleteProduct(userId) {
  if (userId !== null) {
    try {
      const result = await ShoppingCart.deleteOne({ userId: userId });
      console.log("Ürün silindi:", result);
      return result; // İşlem başarılıysa sonucu döndür
    } catch (err) {
      console.error("Hata:", err);
    }
  } else {
    console.log("Ürün bilgisi bulunamadı.");
  }

  return null;
}
