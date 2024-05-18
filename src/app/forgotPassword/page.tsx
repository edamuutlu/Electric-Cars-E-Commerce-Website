"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/app/api/auth.module.css";
import Image from "next/image";

const forgotPassword = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    document.title = "Change Password  - E-Cars";
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const newPassword = e.target[1].value;
    const confirmPassword = e.target[2].value;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password is too short");
      return;
    }

    // Şifreyi sıfırlama işlemleri
    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
      if (response.status === 200) {
        setError("");
        router.push("/login");
      } 
      if (response.status === 404) {
        setError("No user found with this email address");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred while resetting password");
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
                    <h2 className="text-black text-4xl mb-8 font-semibold">
                      Change Password
                    </h2>
                    <form onSubmit={handleForgotPassword }>
                      <input
                        type="text"
                        className={styles.auth_input}
                        placeholder="Email"
                        required
                      />
                      <input
                        type="password"
                        className={styles.auth_input}
                        placeholder="New Password"
                        required
                      />
                      <input
                        type="password"
                        className={styles.auth_input}
                        placeholder="Confirm Password"
                        required
                      />
                      <button type="submit" className={styles.auth_submit}>
                        {" "}
                        Reset password
                      </button>
                      <p className="text-red-600 text-[16px] mb-4">
                        {error && error}
                      </p>
                    </form>

                    <div className="text-left">
                      <p className="text-neutral-600 mt-12">
                        Don&apos;t have an account?
                        <Link
                          className="text-black ml-2 cursor-pointer hover:underline transition"
                          href="/register"
                        >
                          Create an account
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

export default forgotPassword;
