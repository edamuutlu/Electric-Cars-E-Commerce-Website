"use client";
import { useShoppingCart } from "use-shopping-cart";
import { useSession } from "next-auth/react";

const SuccessPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const {clearCart} = useShoppingCart();
  
  if (sessionStatus === "loading") {
    return <div>Loading</div>;
  }

  return <div>Success Page</div>;
}

export default SuccessPage;
