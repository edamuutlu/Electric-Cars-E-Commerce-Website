"use client";
import React from "react";

const NavigateItem = ({
  text,
  title,
  icon,
  activeMenu,
  setActiveMenu,
  scroll,
}) => {

  const handleMenuClick = () => {
    setActiveMenu(title === activeMenu ? null : title);
    window.scrollTo({ top: scroll, behavior: "smooth" });
  };

  return (
    <li
      className={`relative flex items-center justify-center py-2 mt-3 font-medium rounded-md cursor-pointer transition-colors group
          ${
            activeMenu === title
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-indigo-400"
          }`}
      onClick={() => handleMenuClick(title)}
    >
      {icon}
      <div
        className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6 max-sm:ml-2 max-md:ml-2
            bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
      >
        {text}
      </div>
    </li>
  );
};

export default NavigateItem;
