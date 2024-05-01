"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CustomButtom from "@/components/custombuttom/custombuttom";
import { useEffect, useState } from "react";
import { IoBagCheck } from "react-icons/io5";
import Image from "next/image";

const SuccessPage = () => {
  document.title = "Successful Payment - E-Cars";
  const { data: session, status: sessionStatus } = useSession();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionStatus === "authenticated") {
        var userEmail = session.user?.email;
        var username = userEmail?.substring(0, userEmail.indexOf("@"));
        if (!initialized) {
          var cartDataObject = localStorage.getItem(username + "_cart");
          var cartDataObject = {
            cartCount: 0,
            cartDetails: {},
            totalPrice: 0,
          };
          localStorage.setItem(username + "_cart", JSON.stringify(cartDataObject));

          setInitialized(true);
        }
      }
    };

    fetchData();
  }, [initialized, sessionStatus, session]);

  if (sessionStatus === "loading") {
    return (
      <div className="loader">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Image
            src={"/ecar_logo.png"}
            alt="ecars-logo"
            width={400}
            height={400}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-slate-100 flex justify-center items-center h-screen">
        <div className="bg-white shadow-md py-7 px-10 w-96 h-72 rounded-md flex flex-col gap-3 items-center ">
          <span><IoBagCheck className="text-green-600 text-5xl" /></span>
          <div className="text-center pt-7">
            <h4 className="mb-1">Payment Successful</h4>
            <span className="text-[14px] text-gray-400">Thank you for your payment!</span>
          </div>
          <Link href={"/"}>
            <CustomButtom
              title="Countinue Shopping"
              containerStyles="btn bg-green-600 rounded-lg mt-4"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default SuccessPage;
