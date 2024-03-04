"use client";
import React, { useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { GiHomeGarage, GiCarKey } from "react-icons/gi";
import NavigateItem from "./navigateItem";

const NavigateSideMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <aside className="h-screen fixed top-[30%] z-10">
      <nav className="h-[350px] flex flex-col bg-white border shadow-sm">
        <div className="p-4 pb-2 max-sm:p-0 max-md:p-0 max-lg:p-0 border-b flex justify-between items-center group">
          <IoCarSport className="size-12 max-sm:size-10 max-md:size-10 text-indigo-500 p-1.5 rounded-lg hover:bg-indigo-50" />
          <div
            className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-2
            bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            E - Cars
          </div>
        </div>

        <ul className="flex-1 px-3 max-sm:px-0 max-md:px-0 max-ld:px-0">
          <NavigateItem
            text={"Home"}
            title={"home"}
            icon={<GiHomeGarage className="size-7" />}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            scroll={0}
          />
          <NavigateItem
            text={"Car Categories"}
            title={"car"}
            icon={<GiCarKey className="size-7" />}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            scroll={900}
          />
        </ul>

        <div className="border-t flex p-3 max-sm:p-0 max-md:p-0 max-lg:p-0 items-center justify-center group">
          <span className="font-bold p-2 rounded-lg hover:bg-indigo-50 text-indigo-400">
            <BsPersonCircle className="size-7 text-indigo-500" />
          </span>
          <div
            className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-2
            bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            Nuri Eda
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default NavigateSideMenu;
