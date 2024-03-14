"use client";
import { signOut } from "next-auth/react";
import ProductList from './productList';

const ExitPage = () => {
  

    const productIds = ProductList();
    console.log(productIds); // productIds dizisi burada kullanılabilir
     


    /* const handleLogout = () => {
        signOut({
          callbackUrl: '/login', // Yönlendirme yapılacak sayfanın URL'si
        });
      };
      console.log("çıktım");
      handleLogout(); */
    return ( 
      <div>{productIds}</div>
     );
}
 
export default ExitPage;