"use client";
import { useState } from "react";
import styles from "./searchbar.module.css";
import SearchManufacturer from "./searchmanufacturer";
import { SearchManufacturerProps } from "@/types";

const SearchBar = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  return (
    <aside className={styles.searchbar}>
      <div className={styles.searchbar__item}>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
    </aside>
  );
};

export default SearchBar;
