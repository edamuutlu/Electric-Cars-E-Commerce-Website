import ShoppingCart from "@/models/ShoppingCart";

export const saveData = ({userId = "", }) => {
    const newShoppingCart = new ShoppingCart({
        userId: "kullanıcı_id103222",
        productId: ["ürün_idsi_buraya_"],
    });

    // Alışveriş sepeti öğesini kaydedin
    newShoppingCart.save()
        .then((savedItem) => {
            console.log("Alışveriş sepeti öğesi başarıyla kaydedildi:", savedItem);
        })
        .catch((error) => {
            console.error("Alışveriş sepeti öğesi kaydedilirken hata oluştu:", error);
        });
};
