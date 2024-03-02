import React, { MouseEventHandler } from "react";

export interface CustomButtomProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  carBrand?: string;
  manufacturer?: string;
  setManufacturer?: (manufacturer: string) => void;
  carModel?: string;
  setCarModel?: (carModel: string) => void;
  icon?: string;
  inputDisplay?: string;
}

export interface CarModel {
  brand: string;
  model: string;
}

export interface CustomFilterProps {
  yearList?: string[];
  colors?: string[];
  title?: string;
  value?: string;
  onChange?: (manufacturer: string) => void;
}

export interface CarProps {
  images: [[Object]];
  price: 39.99;
  price_id: null;
  slug: null;
  categories: [
    {
      name: "tesla";
    }
  ];
  _id: "ddc5edf3-f6a1-4e24-911a-cb5d5485e50b";
  name: "Tesla Model Y3";
  description: "The Tesla Model 3 is Tesla’s cheapest electric car, but in many ways the best. That said, it’s not as practical as Tesla's own Model Y";
}
