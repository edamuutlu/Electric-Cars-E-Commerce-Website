import { saveData } from "@/constans/saveCartData";
import { findUserId } from "@/constans/findUserId";
import ExitPage from "./ExitPage";
import axios from "axios";

const SaveCartData = async () => {
  const userId = await findUserId();
  console.log("userID: ", userId);
  const fetchCartDetails = async () => {
    try {
      const response = await axios.get("/savecartdata/productList");
      console.log(response.data.cartDetails);
      /* setCartDetails(response.data.cartDetails); */
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };
  fetchCartDetails();
  /*     console.log("Product IDs1:", productIds);
   */
  //const products = ProductList();
  //console.log("urunler: ", products);

  /* const saveShpData = await saveData({ userId, productIds }); */
  return (
    <div>
      data...
      {/* <ExitPage /> */}
    </div>
  );
};

export default SaveCartData;
