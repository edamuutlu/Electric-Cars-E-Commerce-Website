"use client";

import SearchBar from "@/components/SearchBar/searchbar";
import CustomFilter from "@/components/CustomFilter/customfilter";
import CarCard from "@/components/CarCard/carCard";
import styles from "./carCategories.module.css";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { yearsOfProduction, fuels } from "@/constans";
import { FaLiraSign } from "react-icons/fa";
import PriceBox from "../PriceBox/priceBox";

const CarCategories = ({ cars }) => {
  const yearList = yearsOfProduction.map((item) => item.value);
  const fuelList = fuels.map((item) => item.value);
  const [manufacturer, setManufacturer] = useState("all");
  const [carModel, setCarModel] = useState("model-y3");
  const [filterCar, setFilterCars] = useState([]);
  const [price, setPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [year, setYear] = useState("");

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const categoryMatch =
        manufacturer === "all"
          ? cars
          : car.categories.some((categ) => categ.name === manufacturer);
      const priceMatch = car.price >= price && car.price <= maxPrice;
      console.log(priceMatch);
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
          carModel={carModel}
          setCarModel={setCarModel}
          className="w-full"
        />
        <div className={styles.home__filter_container}>
          <div className="mr-2 max-w-[220px]">
            <div className="text-[16px] mb-2 font-medium flex">
              <PriceBox title="Min Price:" price={price} setPrice={setPrice} />
              <PriceBox
                title="Max Price:"
                price={maxPrice}
                setPrice={setMaxPrice}
              />
            </div>
            <Slider
              defaultValue={[price]}
              value={[price]}
              max={[maxPrice]}
              min={0}
              step={1}
              onValueChange={(val) => setPrice(val[0])}
            />
          </div>
          <CustomFilter title="Year" yearList={yearList} />
          <CustomFilter title="Fuel" fuelList={fuelList} />
        </div>
      </div>

      <CarCard cars={filterCar} filterCarLenght={filterCar.length} />
    </>
  );
};

export default CarCategories;
