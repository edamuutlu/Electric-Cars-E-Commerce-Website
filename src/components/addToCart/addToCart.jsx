"use client";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const AddToCart = ({
  title,
  containerStyles,
  textStyles,
  rightIcon,
  name,
  currency,
  description,
  images,
  price,
  price_id,
  slug,
}) => {
  const { addItem } = useShoppingCart();

  const carObject = {
    name: name,
    currency: currency,
    description: description,
    images: images,
    price: price,
    price_id: price_id,
    slug: slug,
  };

  const notify = () =>
    toast.success(`${carObject.name} has been added to the cart`, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handlePostRequests = async () => {
    const url = "http://localhost:3000/api/cartDetails";

    const data = {
      price_id: carObject.price_id,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        disabled={false}
        className={`custom-btn ${containerStyles}`}
        onClick={() => {
          addItem(carObject);
          notify();
          handlePostRequests();
        }}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-6 h-6">
            <Image
              src={rightIcon}
              alt="right icon"
              fill
              className="object-contain"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default AddToCart;
