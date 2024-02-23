"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./carcard.module.css";
import Car from "./car";

const CarCard = ({ cars }) => {
  return (
    <div>
      {cars ? (
        <section>
          <div className={styles.home__cars_wrapper}>
            {cars?.map((car) => (
              <Car key={car._id} car={car} />
            ))}
          </div>
        </section>
      ) : (
        <div className={styles.home__error_container}>
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </div>
  );
};

export default CarCard;
