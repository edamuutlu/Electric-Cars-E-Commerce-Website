"use client";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/navigation";

const RouteSuccess = () => {
  const router = useRouter();
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

  useEffect(() => {
    const redirect = async () => {
      await router.push("/stripe/success");
    };

    redirect();
  }, [router]);

  return <div>Yönlendiriliyor...</div>;
};

export default RouteSuccess;
