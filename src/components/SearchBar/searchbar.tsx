"use client";
import { useState } from "react";
import styles from "./searchbar.module.css";
import SearchManufacturer from "./searchmanufacturer";

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");

  const handleSearch = () => {};
  return (
    <form className={styles.searchbar} onSubmit={handleSearch}>
      <div className={styles.searchbar__item}>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
    </form>
  );
};

export default SearchBar;
