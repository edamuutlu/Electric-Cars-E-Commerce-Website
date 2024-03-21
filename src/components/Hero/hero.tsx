"use client";
import styles from "./hero.module.css";
import CustomButtom from "../custombuttom/custombuttom";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";

const Hero = ({ products = [], userId = "" }) => {
  const { addItem } = useShoppingCart();
  const [initialized, setInitialized] = useState(false);

  if (userId !== null && products.length > 0 && !initialized) {
    products.forEach((item) => addItem(item));
    setInitialized(true);
  }

  const handleScroll = () => {};
  return (
    <div className={styles.hero}>
      <div className="flex-1 pt-36 padding-x">
        <h1 className={styles.hero__title}>
          Find, book, or rent a car - quickly and easily!
        </h1>

        <p className={styles.hero__subtitle}>
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <CustomButtom
          title="Explore Cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>

      <div className={styles.hero__image_container}>
        <div className={styles.hero__image}>
          <Image
            src={"/audi.png"}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
          />
        </div>

        <div className={styles.hero__image_overlay}></div>
      </div>
    </div>
  );
};

export default Hero;
