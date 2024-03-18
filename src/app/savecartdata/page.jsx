import { saveData } from "@/constans/saveCartData";
import { findUserId } from "@/constans/findUserId";
import ExitPage from "./ExitPage";

const SaveCartData = async () => {
  try {
    let productIds = [];
    const userId = await findUserId();
    console.log("userID: ", userId);

    const response = await fetch("http://localhost:3000/api/cartDetails");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Gelen veri dizisindeki her bir öğe için price_id'yi yazdır
    data.forEach((item) => {
      productIds.push(item.price_id);
      console.log("price_id:", item.price_id);
    });

    const saveShpData = await saveData({ userId, productIds });

    return (
      <div>
        {data.map((item, index) => (
          <div key={index}>price_id: {item.price_id}</div>
        ))}
        <ExitPage />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    // Hata durumunda uygun bir işlem yapılabilir
  }
};

export default SaveCartData;
