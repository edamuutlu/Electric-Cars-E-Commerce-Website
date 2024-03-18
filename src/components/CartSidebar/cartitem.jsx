import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { FaX, FaPlus, FaMinus } from "react-icons/fa6";
import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";

const CartItem = ({ item, open }) => {
  const { removeItem, incrementItem, decrementItem } = useShoppingCart();

  async function deleteCartItem(price_idToDelete) {
    const apiUrl = "http://localhost:3000/api/cartDetails";

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price_id: price_idToDelete }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const handleRemoveItem = async (price_id) => {
    removeItem(price_id);
    await deleteCartItem(price_id);
  };

  const handleDecrementItem = async (price_id, count) => {
    if (count > 1) {
      decrementItem(price_id);
    } else {
      removeItem(price_id);
      await deleteCartItem(price_id);
    }
  };

  return (
    <div className="flex w-full justify-between mb-4 items-center h-[120px] border-b">
      {/* image */}
      <div className="w-[110px] h-[110px] relative">
        <Image
          src={urlFor(item.images[0]).url()}
          fill
          priority
          sizes="(max-width: 110px) 110px, 110px"
          className="object-contain"
        />
      </div>
      {/* name price quantity remove */}
      <div className="w-full max-w-[180px] flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/product/${item.slug}`}
            onClick={() => (open.shouldDisplayCart = false)}
          >
            <h5>{item.name || item.title}</h5>
          </Link>
          {/* <h5>{item.name}</h5> */}
          <button onClick={() => handleRemoveItem(item.id)}>
            <FaX className="text-sm" />
          </button>
        </div>
        {/* increment decrement item price */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button onClick={() => handleDecrementItem(item.id, item.quantity)}>
              <FaMinus className="text-[10px]" />
            </button>
            <div className="font-semibold">{item.quantity}</div>
            <button onClick={() => incrementItem(item.id)}>
              <FaPlus className="text-[10px]" />
            </button>
          </div>
          <div className="font-semibold">
            {(item.price * item.quantity)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            TL
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
