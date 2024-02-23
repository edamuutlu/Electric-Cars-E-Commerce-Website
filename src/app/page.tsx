import styles from "./page.module.css";
import Hero from "@/components/Hero/hero";
import SearchBar from "@/components/SearchBar/searchbar";
import CustomFilter from "@/components/CustomFilter/customfilter";
import CarCard from "@/components/CarCard/carCard";

//get data
import { client } from "@/app/lib/sanity";

const getData = async () => {
  const query = `*[_type == 'product']{
    _id,
    name,
    description,
    car_type,
    tire,
    range,
    images,
    price,
    price_id,
    "slug": slug.current,
    "categories": categories[]->{
      name
    }
  }`;
  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const cars = await getData();
  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className={styles.home__text_container}>
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className={styles.home__filters}>
          <SearchBar />
          <div className={styles.home__filter_container}>
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>

        <CarCard cars={cars} />
      </div>
    </div>
  );
}
