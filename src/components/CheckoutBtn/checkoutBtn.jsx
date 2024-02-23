import { useShoppingCart } from "use-shopping-cart";

const CheckoutBtn = () => {
  const handleCheckout = async () => {
    try {
      const res = await redirectToCheckout();
      if (res?.error) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { redirectToCheckout } = useShoppingCart();
  return (
    <button
      onClick={handleCheckout}
      className="py-4 text-white uppercase bg-black hover:bg-black-100 
      w-full shadow-lg rounded-md"
    >
      Proceed To Checkout
    </button>
  );
};

export default CheckoutBtn;
