// page.jsx

import { findUserId } from "@/constans/findUserId";
import { deleteProduct } from "@/constans/deleteProduct";
import RouteSuccess from "./RouteSuccess";

const DeleteUser = async () => {
  try {
    const userId = await findUserId();
    await deleteProduct(userId);

    return (
      <div>
        User Silindi.
        <RouteSuccess />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default DeleteUser;
