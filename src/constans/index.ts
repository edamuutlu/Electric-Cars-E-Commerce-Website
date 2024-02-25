import { client } from "@/app/lib/sanity";
import { GET } from "@/app/api/get/route";

export const allData = async () => {
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

export const allCategory = async () => {
  const query = `*[_type == 'category']{
    name
  }`;
  const data = await client.fetch(query);
  return data;
};

// ALL Category
let manufacturers: string[] = []; // Boş bir dizi oluştur
const fetchData = async () => {
  try {
    const data = await allCategory();
    const names = data.map((item) => item.name);
    manufacturers = names;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchData();
export { manufacturers };

// ALL cars
/* let manufacturers: string[] = []; // Boş bir dizi oluştur
const fetchData = async () => {
  try {
    const data = await allData();
    const names = data.map((item) => item.categories[0].name);
    manufacturers = names;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchData();
export { manufacturers }; */

// Get By User Id
export const getById = async (emailBy: string) => {
  try {
    const email = emailBy;
    const response = await GET(email);
    const byId = response._id.toString();
    return byId;
  } catch (error) {
    console.error(error);
  }
};

export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
];

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];
