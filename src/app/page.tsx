import styles from "./page.module.css";
import Hero from "@/components/Hero/hero";
import NavigateSideMenu from "@/components/NavigateSideMenu/navigateSideMenu";
import { findUserId } from "@/constans/findUserId";

//get data
import CarCategories from "@/components/carCategories/carCategories";
import { allData } from "@/constans";
import { findProduct } from "@/constans/findProduct";

export default async function Home() {
  let cartCars = [];
  const cars = await allData();
  const userId = await findUserId();
  const products = await findProduct();

  if (userId !== null) {
    cartCars = cars.filter((car: any) =>
      products.some((item: any) => car.price_id === item)
    );
  }
  return (
    <div className="overflow-hidden">
      <NavigateSideMenu />
      <div id="home">
        <Hero products={cartCars} userId={userId} />
      </div>
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className={styles.home__text_container}>
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <CarCategories cars={cars} />
      </div>
    </div>
  );
}
