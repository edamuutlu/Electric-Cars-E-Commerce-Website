import { saveData } from "@/constans/saveCartData";
import { findUserId } from "@/constans/findUserId";
import { useShoppingCart } from "use-shopping-cart";
import ExitPage from "./ExitPage";


const SaveCartData = async () => {
    const userId = await findUserId();
    /* const { cartDetails } = useShoppingCart();
    let productIds = [];
    Object.entries(cartDetails).map(([key, item]) => {
        productIds.push(item.id);
    });
    var products = productIds.toString(); */

    console.log("userID: ",userId);
    /* console.log("urunler: ", products); */

    //const saveShpData = await saveData(userId={userId});
    return (
        <div>
            data...
            <ExitPage />
        </div>
    );
}

export default SaveCartData;