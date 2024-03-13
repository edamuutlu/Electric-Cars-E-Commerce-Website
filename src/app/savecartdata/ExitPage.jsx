"use client";
import { signOut } from "next-auth/react";

const ExitPage = () => {
    const handleLogout = () => {
        signOut({
          callbackUrl: '/login', // Yönlendirme yapılacak sayfanın URL'si
        });
      };
      handleLogout();
    return ( 
        <div></div>
     );
}
 
export default ExitPage;