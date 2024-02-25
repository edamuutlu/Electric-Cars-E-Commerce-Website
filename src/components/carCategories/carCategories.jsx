"use client";

import SearchBar from "@/components/SearchBar/searchbar";
import CustomFilter from "@/components/CustomFilter/customfilter";
import CarCard from "@/components/CarCard/carCard";
import styles from "./carCategories.module.css";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

const CarCategories = ({ cars }) => {
  const [manufacturer, setManufacturer] = useState("all");
  const [category, setCategory] = useState("all");
  const [filterCar, setFilterCars] = useState([]);
  const [price, setPrice] = useState(10000000);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const categoryMatch =
        manufacturer === "all"
          ? cars
          : car.categories.some((categ) => categ.name === manufacturer);
      const priceMatch = car.price <= price;
      return categoryMatch && priceMatch;
    });
    setFilterCars(filtered);
  }, [manufacturer, price, cars]);
  console.log(filterCar);

  return (
    <>
      <div className={styles.home__filters}>
        <SearchBar
          cars={cars}
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <div className={styles.home__filter_container}>
          <div className="mr-2">
            <div className="text-lg mb-2 font-medium">
              Max Price:{" "}
              <span className="text-blue-600">
                {price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}TL
              </span>
              <span className="ml-2">
                {filterCar.length > 1
                  ? `${filterCar.length} items`
                  : filterCar === 0
                  ? `${filterCar.length} items`
                  : `${filterCar.length} item`}
              </span>
            </div>
            <Slider
              defaultValue={[10000000]}
              max={10000000}
              step={1}
              onValueChange={(val) => setPrice(val[0])}
            />
          </div>
          <CustomFilter /* title="fuel" */ />
          <CustomFilter /* title="year" */ />
        </div>
      </div>

      <CarCard cars={filterCar} />
    </>
  );
};

export default CarCategories;
