"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CustomButtom from "@/components/custombuttom/custombuttom";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const { status: sessionStatus } = useSession();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (sessionStatus === "authenticated") {
        if (!initialized) {
          console.log(sessionStatus);
          localStorage.removeItem("phersist:root");
          setInitialized(true);
        }
      }
    };

    fetchData();
  }, [initialized, sessionStatus]);

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
          <img
            src="/ecar_logo.png"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="py-72">
      <div className="container mx-auto">
        <h3>Your payment was successful! Thank you!</h3>
        <Link href={"/"}>
          <CustomButtom
            title="Back to the homepage"
            containerStyles="btn bg-primary-blue"
            textStyles="text-white text-[14px] uppercase leading-[17px] font-bold mr-3"
          />
        </Link>
      </div>
    </section>
  );
};

export default SuccessPage;
