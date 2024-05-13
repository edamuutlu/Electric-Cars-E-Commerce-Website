// navigate.js
"use client";
import { useRouter } from "next/navigation";

export const SuccessNavigate = (route) => {
    const router = useRouter();
    router.push(route);
};