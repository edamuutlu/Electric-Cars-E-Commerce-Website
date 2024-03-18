import ShoppingCart from "@/models/ShoppingCart";

export const saveData = ({ userId = "", productIds = [] }) => {
  const newShoppingCart = new ShoppingCart({
    userId: userId,
    productId: productIds,
  });

  // Alışveriş sepeti öğesini kaydedin
  newShoppingCart
    .save()
    .then((savedItem) => {
      console.log("Alışveriş sepeti öğesi başarıyla kaydedildi:", savedItem);
    })
    .catch((error) => {
      console.error("Alışveriş sepeti öğesi kaydedilirken hata oluştu:", error);
    });
};
