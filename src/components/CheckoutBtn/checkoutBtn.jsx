import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

const CheckoutBtn = ({ isUserId }) => {
  const { redirectToCheckout } = useShoppingCart();
  const [loading, setLoading] = useState(false); // Yükleme durumu için bir state

  const handleCheckout = async () => {
    try {
      setLoading(true); // Yükleme başladığında yüklemeyi başlat
      if (isUserId === null) {
        window.location.href = "/login";
      } else {
        const res = await redirectToCheckout();
        if (res?.error) {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // İşlem tamamlandığında yüklemeyi durdur
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>} {/* Yükleme durumu göstergesi */}
      <button
        onClick={() => {
          handleCheckout();
        }}
        className="py-4 text-white uppercase bg-black hover:bg-black-100 
        w-full shadow-lg rounded-md"
        disabled={loading} // Yükleme sırasında butonu devre dışı bırak
      >
        Proceed To Checkout
      </button>
    </>
  );
};

export default CheckoutBtn;
