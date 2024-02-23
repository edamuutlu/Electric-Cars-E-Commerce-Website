"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./carcard.module.css";
import { urlFor } from "@/app/lib/sanity";
import CustomButtom from "../custombuttom/custombuttom";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Car = ({ car }) => {
  const { addItem } = useShoppingCart();
  const carObject = {
    id: car._id,
    name: car.name,
    currency: "TL",
    description: car.description,
    images: car.images,
    price: car.price,
    price_id: car.price_id,
    slug: car.slug,
  };
  const notify = () =>
    toast.success(`${carObject.name} has been added to the cart`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div key={car._id} className={`${styles.car_card} group`}>
      <div className={styles.car_card__content}>
        <h2 className={styles.car_card__content}>{car.name}</h2>
      </div>

      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">TL</span>
        {(car.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
        <span className="self-end text-[14px] font-medium">/Cash</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={urlFor(car.images[0]).url()}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:opacity-0 w-full justify-between text-grey transition-all duration-300">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={"/steering-wheel.svg"}
              width={20}
              height={20}
              alt="streering wheel"
            />
            <p className="text-[14px]">{car.car_type}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src={"/tire.svg"} width={20} height={20} alt="Tire icon" />
            <p className="text-[14px]">{car.tire}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={"/electric-gas.png"}
              width={20}
              height={20}
              alt="Gas icon"
            />
            <p className="text-[14px]">{car.range}</p>
          </div>
        </div>

        <div className="opacity-0 flex group-hover:opacity-100 absolute justify-around bottom-0 w-full z-10 transition-all duration-300">
          <Link href={`/product/${car.slug}`}>
            <CustomButtom
              title="View More"
              containerStyles="w-49 py-[16px] rounded-full bg-primary-blue"
              textStyles="text-white text-[14px] leading-[17px] font-bold mr-3"
              rightIcon="/show-more.png"
            />
          </Link>

          <CustomButtom
            title="Add to Card"
            containerStyles="w-50 py-[16px] rounded-full bg-red-500"
            textStyles="text-white text-[14px] leading-[17px] font-bold mr-3"
            rightIcon="/add-to-basket.png"
            handleClick={() => {
              addItem(carObject);
              notify();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Car;
