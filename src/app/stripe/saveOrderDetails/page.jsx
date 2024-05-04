import { findUserId } from "@/constans/findUserId";
import Image from "next/image";
import saveOrderToDatabase from './../../../components/CartSidebar/orderService';
import SuccessNavigate from "./navigate";

const SaveOrderDetails = async () => {

    const userId = await findUserId();
    console.log(userId);
    const items = [];
    saveOrderToDatabase(userId, items.map(item => item.productId));
    SuccessNavigate("/stripe/success");

    return ( 
        <div className="loader">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Image
            src={"/ecar_logo.png"}
            alt="ecars-logo"
            width={400}
            height={400}
          />
        </div>
      </div>
     );
}
 
export default SaveOrderDetails;