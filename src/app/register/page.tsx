"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "@/app/api/auth.module.css";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

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
          email,
          password,
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <img
            src="ecar_logo.png"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      
      <div className={styles.auth_container}>
        
      <div className='flex justify-center'>
          <div className={styles.auth_formDiv}>
        <h2 className='text-white text-5xl mb-8 font-semibold'>Register</h2>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className={styles.auth_submit}
            >
              {" "}
              Register
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          
          <div className='text-left'>
            <p className='text-neutral-600 mt-12'>
          Already have an account 
          <Link
            className={styles.auth_login}
            href="/login"
          >
            Login
          </Link>
          </p>
               </div>
        
          </div>
        </div>
      </div>
    )
  );
};

export default Register;