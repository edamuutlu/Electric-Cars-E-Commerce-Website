"use client";

import styles from "./carcard.module.css";
import Car from "./car";

const CarCard = ({ cars, filterCarLenght }) => {
  return (
    <div>
      {cars ? (
        <section>
          <span className="ml-5 font-normal">
            Your search for{" "}
            <span className="font-semibold">"Tesla Model Y3"</span> found
            <span className="text-red-600 font-semibold">
              {" "}
              {filterCarLenght > 1
                ? `${filterCarLenght}`
                : filterCarLenght === 0
                ? `${filterCarLenght}`
                : `${filterCarLenght}`}{" "}
            </span>
            sales.
          </span>
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
