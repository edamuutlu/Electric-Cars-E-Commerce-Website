"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButtom from "../custombuttom/custombuttom";
import { CgShoppingBag } from "react-icons/cg";
import CartSidebar from "../CartSidebar/cartSidebar";
import { useShoppingCart } from "use-shopping-cart";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
  const { data: session }: any = useSession();
  const { cartCount, handleCartClick } = useShoppingCart();
  return (
    <header className="w-full absolute  z-10">
      <nav className="max-w-full shadow-lg sticky mx-auto flex justify-between items-center sm:px-16 px-4">
        <Link href={"/"} className="flex justify-center items-center">
          <Image
            src={"/ecar_logo.png"}
            alt=""
            width={115}
            height={18}
            className="object-contain"
          />  
        </Link>

        <div className="flex justify-end items-center">
          {!session ? (
            <>
              <Link href="/login">
                <CustomButtom
                  title="Sing In"
                  btnType="button"
                  containerStyles="text-black-100 font-medium py-3 mr-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-80 min-w-[130px]"
                />
              </Link>
              <Link href="/register">
                <CustomButtom
                  title="Sing Up"
                  btnType="button"
                  containerStyles="text-black-100 font-semibold py-3 rounded-full bg-white bg-opacity-70 hover:bg-opacity-80 min-w-[130px]"
                />
              </Link>
            </>
          ) : (
            <>
            <CustomButtom
                  title={session.user?.email}
                  btnType="button"
                  containerStyles="text-white py-3 mr-3 rounded-full bg-primary-blue min-w-[130px]"
                />
              <CustomButtom
                title="Logout"
                btnType="button"
                containerStyles="text-white py-3 rounded-full bg-primary-blue min-w-[130px]"
                handleClick={() => {
                  signOut();
                }}
              />
            </>
          )}

          <div
            onClick={() => handleCartClick()}
            className="relative pl-4 cursor-pointer"
          >
            <CgShoppingBag className="text-[26px] text-gray-200" />
            <div className="bg-red-600 w-[18px] h-[18px] absolute -right-1 -bottom-1 rounded-full text-white flex items-center justify-center text-sm font-medium">
              {cartCount}
            </div>
          </div>
          {/* cardSidebar */}
          <CartSidebar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
