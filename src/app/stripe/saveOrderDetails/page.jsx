"use client";  // Mark this file as a client component

import { useEffect } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SaveOrderDetails = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const username =
    sessionStatus === "authenticated"
      ? session.user?.email?.substring(0, session.user?.email?.indexOf("@"))
      : "guest";

  useEffect(() => {
    const fetchData = async () => {
      const storedCartGuest = localStorage.getItem(username + "_cart");
      const storedCartData = JSON.parse(storedCartGuest);
      const cartData = Object.values(storedCartData.cartDetails);

      if (storedCartGuest && username !== "guest") {
        try {
          const response = await fetch('/api/saveOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartData, state: true }),
          });

          if (response.ok) {
            router.push("/stripe/success");
          } else {
            console.error('Failed to save order');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        router.push("/stripe/success");
      }
    };

    fetchData();
  }, [username, router]);

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

export default SaveOrderDetails;
