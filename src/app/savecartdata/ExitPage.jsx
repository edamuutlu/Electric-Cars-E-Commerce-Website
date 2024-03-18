"use client";
import { signOut } from "next-auth/react";
import { useShoppingCart } from "use-shopping-cart";

const ExitPage = () => {
  const { clearCart } = useShoppingCart();
  const handleLogout = () => {
    signOut({
      callbackUrl: "/login", // Yönlendirme yapılacak sayfanın URL'si
    });
  };
  clearCart();
  handleLogout();
  return <div></div>;
};

export default ExitPage;
