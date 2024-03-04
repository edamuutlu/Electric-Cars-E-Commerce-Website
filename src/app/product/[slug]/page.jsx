"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { urlFor } from "@/app/lib/sanity";
import "react-toastify/dist/ReactToastify.css";
import { getCarData } from "@/constans";
import { Tab } from "@headlessui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductCarVitrin from "./../../../components/ProductCarVitrin/productCarVitrin";
import CarInfoTable from "./../../../components/CarInfoTable/carInfoTable";

const ProductDetails = ({ params }) => {
  const [car, setCar] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      const carData = await getCarData(params.slug);
      setCar(carData);
    };

    fetchCarData();
  }, [params.slug]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const images = [
    { src: car.images[0], alt: "First" },
    { src: car.images[1], alt: "Second" },
    { src: car.images[2], alt: "Third" },
    { src: car.images[3], alt: "Fourth" },
  ];

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto">
        <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col gap-14">
          <div
            className="xl:flex-1 w-full xl:w-[50%] lg:w-[50%] md:w-full sm:w-full flex-col xl:h-[600px] md:h-[440px] sm:h-[540px]
        flex justify-center items-center"
          >
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="h-96 w-full rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex h-full w-full items-center justify-center">
                    <Image
                      src={urlFor(image.src).url()}
                      width={500}
                      height={400}
                      alt={image.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail */}
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={12}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbs mt-3 h-32 w-full rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <button className="flex h-full w-full items-center justify-center">
                    <Image
                      src={urlFor(image.src).url()}
                      width={500}
                      height={400}
                      alt={image.alt}
                      className="object-contain p-1 border shadow-sm hover:bg-gray-100 rounded-md"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex-1 w-full xl:w-[50%] lg:w-[50%] md:w-full sm:w-full flex px-4 flex-col justify-center items-start gap-10">
            <Link
              href={"/"}
              className="flex items-center text-black-100 gap-2 font-semibold hover:text-red-500"
            >
              <ChevronLeft size={20} />
              Back to Home
            </Link>
            {/* Car title, price, description, addToCart */}
            <ProductCarVitrin car={car} />
            {/* Car info */}
            <div className="flex flex-col w-full gap-3">
              <CarInfoTable car={car} />
            </div>
          </div>
        </div>
        {/* Car Technical Specifications */}
        <div>Car Technical Specifications</div>
        <Tab.Group>
          <Tab.List>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default ProductDetails;
