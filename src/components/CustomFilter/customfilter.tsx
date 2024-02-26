import { Listbox, Transition } from "@headlessui/react";
import styles from "./customfilter.module.css";
import { CustomFilterProps } from "@/types";
import { Fragment, useState } from "react";
import { ChevronsUpDown } from "lucide-react";

const CustomFilter = ({
  yearList = [],
  fuelList = [],
  title,
}: CustomFilterProps) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="w-fit">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-fit z-10">
          <Listbox.Button className={styles.custom_filter__btn}>
            {selected || title}
            <ChevronsUpDown
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={styles.custom_filter__options}>
              {yearList.length > 0 && (
                <>
                  {yearList.map((year) => (
                    <Listbox.Option
                      key={year}
                      value={year}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active
                            ? "bg-primary-blue text-white"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {year}
                    </Listbox.Option>
                  ))}
                </>
              )}
              {fuelList.length > 0 && (
                <>
                  {fuelList.map((fuel) => (
                    <Listbox.Option
                      key={fuel}
                      value={fuel}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active
                            ? "bg-primary-blue text-white"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {fuel}
                    </Listbox.Option>
                  ))}
                </>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
