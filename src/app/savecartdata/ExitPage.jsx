"use client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

const ExitPage = () => {
  const { clearCart } = useShoppingCart();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      clearCart();
      setInitialized(true);
    }
  }, [clearCart]);
  const handleLogout = () => {
    signOut({
      callbackUrl: "/login", // Yönlendirme yapılacak sayfanın URL'si
    });
  };
  handleLogout();
  return <div></div>;
};

export default ExitPage;
