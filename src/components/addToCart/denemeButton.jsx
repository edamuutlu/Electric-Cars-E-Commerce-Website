"use client";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const DenemeButton = ({
  addItem,
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
  const { data: session, status: sessionStatus } = useSession();
  if (sessionStatus === "authenticated") {
    var userEmail = session.user?.email;
    var username = userEmail?.substring(0, userEmail.indexOf("@"));
  } else {
    var username = "guest";
  }

  const carObject = {
    name: name,
    currency: currency,
    description: description,
    images: images,
    price: price,
    price_id: price_id,
    slug: slug,
    quantity: 1,
  };

  return (
    <div>
      <button
        disabled={false}
        className={`custom-btn ${containerStyles}`}
        onClick={() => {
          addItem(carObject, username);
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default DenemeButton;
