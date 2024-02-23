import Image from "next/image";
import Link from "next/link";
import { PackageCheck, ChevronLeft } from "lucide-react";
import { client, urlFor } from "@/app/lib/sanity";
import CustomButtom from "./../../../components/custombuttom/custombuttom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddToCart from "@/components/addToCart/addToCart";

const getData = async (slug) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]{
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
      "categories": categories->{name}
  }`;
  const data = await client.fetch(query);
  return data;
};

const ProductDetails = async ({ params }) => {
  const car = await getData(params.slug);

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-14">
          <div
            className="xl:flex-1 xl:h-[600px] bg-gray-100 md:h-[440px] sm:h-[540px]
        flex justify-center items-center"
          >
            <Image
              src={urlFor(car.images[0]).url()}
              width={580}
              height={390}
              priority
              alt=""
              className="object-contain"
            />
          </div>
          <div className="flex-1 flex px-4 flex-col justify-center items-start gap-10">
            <Link
              href={"/"}
              className="flex items-center text-black-100 gap-2 font-semibold hover:text-red-500"
            >
              <ChevronLeft size={20} />
              Back to Home
            </Link>
            <div className="flex flex-col  gap-6 items-start">
              <div>
                <h1 className="text-xl py-2 px-3 font-extrabold">{car.name}</h1>
                <p className="text-lg px-3 font-bold">TL {car.price}</p>
              </div>
              <p className="text-black-100 px-3 font-medium">
                {car.description}
              </p>
              {/* botton */}
              <AddToCart
                /* id={car._id} */
                price_id={car.price_id}
                name={car.name}
                currency="TL"
                description={car.description}
                images={car.images}
                price={car.price}
                slug={car.slug}
                title="Add to Card"
                containerStyles="w-50 py-[16px rounded-full bg-red-500"
                textStyles="text-white text-[14px] leading-[17px] font-bold mr-3"
                rightIcon="/add-to-basket.png"
              />
            </div>
            {/* info */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <PackageCheck size={20} className="text-red-600" />
                <p>Free shipping on orders over TL 130</p>
              </div>
              <div className="flex gap-2">
                <PackageCheck size={20} className="text-red-600" />
                <p>Free shipping on orders over TL 130</p>
              </div>
              <div className="flex gap-2">
                <PackageCheck size={20} className="text-red-600" />
                <p>Free shipping on orders over TL 130</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
