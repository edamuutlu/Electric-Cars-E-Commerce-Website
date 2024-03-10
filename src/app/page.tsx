import styles from "./page.module.css";
import Hero from "@/components/Hero/hero";
import NavigateSideMenu from "@/components/NavigateSideMenu/navigateSideMenu";
import { findUserId } from "@/constans/findUserId";

//get data
import CarCategories from "@/components/carCategories/carCategories";
import { allData } from "@/constans";

export default async function Home() {
  const cars = await allData();
  const userId = await findUserId();

  return (
    <div className="overflow-hidden">
      <NavigateSideMenu />
      <div id="home">
        <Hero />
      </div>
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className={styles.home__text_container}>
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <CarCategories cars={cars} isSessionId={userId} />
      </div>
    </div>
  );
}
