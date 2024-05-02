"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "@/app/api/auth.module.css";
import Image from "next/image";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    document.title = "Register - E-Cars";
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const phone = e.target[4].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          phone,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

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
    sessionStatus !== "authenticated" && (
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="/">
                <span className="sr-only">Home</span>
                <Image
                  className="bg-white rounded-full "
                  src={"/icon-2.png"}
                  alt=" "
                  width={70}
                  height={70}
                />
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to E-CARS
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Streamline your car rental experience with our effortless
                booking process.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <Image
                    className="bg-white rounded-full "
                    src={"/icon-2.png"}
                    alt=" "
                    width={70}
                    height={70}
                  />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to E-CARS
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Streamline your car rental experience with our effortless
                  booking process.
                </p>
              </div>

              <div className={styles.auth_container}>
                <div className="flex justify-center">
                  <div className={styles.auth_formDiv}>
                    <h2 className="text-black text-5xl mb-8 font-semibold">
                      Register
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className={styles.auth_input}
                        placeholder="First Name"
                        required
                      />
                      <input
                        type="text"
                        className={styles.auth_input}
                        placeholder="Last Name"
                        required
                      />
                      <input
                        type="text"
                        className={styles.auth_input}
                        placeholder="Email"
                        required
                      />
                      <input
                        type="password"
                        className={styles.auth_input}
                        placeholder="Password"
                        required
                      />
                      <input
                        type="text"
                        className={styles.auth_input}
                        placeholder="Mobile Number"
                        required
                      />
                      <button type="submit" className={styles.auth_submit}>
                        {" "}
                        Register
                      </button>
                      <p className="text-red-600 text-[16px] mb-4">
                        {error && error}
                      </p>
                    </form>

                    <div className="text-left">
                      <p className="text-neutral-600 mt-12">
                        Already have an account?{" "}
                        <Link className={styles.auth_login} href="/login">
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    )
  );
};

export default Register;
