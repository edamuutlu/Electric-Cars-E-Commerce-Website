import ShoppingCart from "@/models/ShoppingCart";

export const saveData = async ({ userId = "", productIds = [] }) => {
  try {
    // Belirli userId'ye ait alışveriş sepeti öğesini bul
    const existingShoppingCart = await ShoppingCart.findOne({ userId: userId });

    if (existingShoppingCart) {
      // Eğer varsa güncelle
      existingShoppingCart.productId = productIds;
      await existingShoppingCart.save();
      console.log(
        "Alışveriş sepeti öğesi başarıyla güncellendi:",
        existingShoppingCart
      );
    } else {
      // Eğer yoksa yeni kayıt oluştur
      const newShoppingCart = new ShoppingCart({
        userId: userId,
        productId: productIds,
      });

      await newShoppingCart.save();
      console.log(
        "Yeni alışveriş sepeti öğesi başarıyla kaydedildi:",
        newShoppingCart
      );
    }
  } catch (error) {
    console.error("Alışveriş sepeti öğesi kaydedilirken hata oluştu:", error);
  }
};
