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

      // Local storage'daki persist:root içeriğini temizle
      localStorage.removeItem("persist:root");
    }
  }, [clearCart, initialized]);

  const handleLogout = () => {
    signOut({
      callbackUrl: "/login", // Yönlendirme yapılacak sayfanın URL'si
    });
  };

  handleLogout();

  return <div></div>;
};

export default ExitPage;
