import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { FaX, FaPlus, FaMinus } from "react-icons/fa6";
import Link from "next/link";

const CartItem = ({
  username,
  item,
  open,
  removeItem,
  incrementItem,
  decrementItem,
}) => {
  return (
    <div className="flex w-full justify-between mb-4 items-center h-[120px] border-b">
      {/* image */}
      <div className="w-[110px] h-[110px] relative">
        <Image
          src={urlFor(item.images[0]).url()}
          alt="car_image"
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
          <button onClick={() => removeItem(item.price_id, username)}>
            <FaX className="text-sm" />
          </button>
        </div>
        {/* increment decrement item price */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button onClick={() => decrementItem(item.price_id, username)}>
              <FaMinus className="text-[10px]" />
            </button>
            <div className="font-semibold">{item.quantity}</div>
            <button onClick={() => incrementItem(item.price_id, username)}>
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
