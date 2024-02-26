"use client";
import { Combobox, Transition } from "@headlessui/react";
import styles from "./searchbar.module.css";
import { SearchManufacturerProps } from "@/types";
import { manufacturers, carModels } from "@/constans";
import Image from "next/image";
import { useState, Fragment } from "react";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
  carModel,
  setCarModel,
  icon,
  inputDisplay,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  let filteredOptions = [];

  if (manufacturer) {
    filteredOptions =
      query === ""
        ? manufacturers
        : manufacturers.filter((item) =>
            item
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
  } else {
    filteredOptions =
      query === ""
        ? carModels
        : carModels.filter((item) =>
            item
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
  }

  return (
    <div className={styles.search_manufacturer}>
      <Combobox
        value={manufacturer || carModel}
        onChange={manufacturer ? setManufacturer : setCarModel}
      >
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src={`/${icon}`}
              alt="Car Logo"
              width={20}
              height={20}
              className="ml-4"
            />
          </Combobox.Button>

          <Combobox.Input
            className={inputDisplay}
            placeholder={manufacturer || carModel || "Search..."}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredOptions.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className={styles.search_manufacturer__option}
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option}
                    className={({ active }) => `
                        relative ${styles.search_manufacturer__option} ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`}
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-white"
                                : "text-pribg-primary-purple"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
