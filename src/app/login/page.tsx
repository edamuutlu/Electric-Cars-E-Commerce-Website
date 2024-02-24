"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from 'react-icons/fa';
import styles from "@/app/api/auth.module.css";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
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

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
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
        <h2 className='text-white text-5xl mb-8 font-semibold'>Login</h2>
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
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>

          <div className='flex flex-row items-center gap-4 mt-10 justify-center'>
          <button
            className="bg-white flex text-black w-12 h-12 rounded-full items-center text-center cursor-pointer justify-center"
            onClick={() => {
              signIn("github");
            }}
          >
            <FaGithub size={30}></FaGithub>
          </button>

          <button
            className="bg-white flex text-red-700 w-12 h-12 rounded-full items-center text-center cursor-pointer justify-center"
            onClick={() => {
              signIn("google");
            }}
          >
            <FaGoogle size={30}></FaGoogle>
          </button>
          </div>

          <div className='text-left'>
            <p className='text-neutral-600 mt-12'>
            Don't have an account?
            <Link
              className='text-white ml-2 cursor-pointer hover:underline transition'
               href="/register"
               >Create an account
               </Link> 
               </p>
               </div>
        </div>
      </div>
      </div>
    )
  );
};

export default Login;