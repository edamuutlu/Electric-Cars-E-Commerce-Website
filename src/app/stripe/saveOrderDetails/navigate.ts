"use client"
import { useRouter } from "next/navigation";

const SuccessNavigate = ({route}) => {
    const router = useRouter();
    router.push(route);
};

export default SuccessNavigate ;
