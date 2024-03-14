import { saveData } from "@/constans/saveCartData";
import { findUserId } from "@/constans/findUserId";
import ExitPage from "./ExitPage";

const SaveCartData = async () => {
    const userId = await findUserId();
    console.log("userID: ",userId);
/*     console.log("Product IDs1:", productIds);
 */
    //const products = ProductList();
    //console.log("urunler: ", products);

    /* const saveShpData = await saveData({ userId, productIds }); */
    return (
        <div>
            data...
            <ExitPage />
        </div>
    );
}

export default SaveCartData;