"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "@/app/api/auth.module.css";

const Navbar = () => {
  const { data: session }: any = useSession();
  return (
    <div className="bg-black bg-opacity-45 p-4">
      <ul className="flex justify-between m-6 item-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link> 
          {!session ? (
            <>
            <div className="nav-button">
              <Link href="/login">
              <button className="btn white-btn" id="loginBtn">Sign In</button>
              </Link>
              <Link href="/register">
              <button className="btn" id="registerBtn">Sign Up</button>
              </Link>
              </div>
              
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;