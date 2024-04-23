"use client";
import React from "react";
import Navbar from "@/components/Navbar/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer/footer";
import { ToastContainer } from "react-toastify";
import Home from "@/app/page";
import { usePathname } from "next/navigation";
import ProductDetails from "@/app/product/[slug]/page";

export const ShoppingCartWrapper = ({ children, cars }) => {
  const [carts, setCarts] = useState({});
  const [initialized, setInitialized] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const username = sessionStatus === "authenticated" ? session.user?.email?.substring(0, session.user?.email?.indexOf("@")) : "guest";
  const pathname = usePathname();
  useEffect(() => {
    const savedCarts =
      JSON.parse(localStorage.getItem(username + "_cart")) || {};
    setCarts(savedCarts);
  }, []);

  const addItem = (carObject, username) => {
    var storedCartData = localStorage.getItem(username + "_cart");

    var cartDataObject;
    if (!storedCartData) {
      cartDataObject = {
        cartCount: 0,
        cartDetails: {},
        totalPrice: 0,
      };
    } else {
      cartDataObject = JSON.parse(storedCartData);
    }

    // carObject'in cartDetails içindeki id'sine göre mevcut bir öğe arayın
    const existingItem = cartDataObject.cartDetails[carObject.price_id];

    if (existingItem) {
      // Eğer aynı id'ye sahip bir öğe varsa, sadece quantity değerini artırın
      existingItem.quantity++;
    } else {
      cartDataObject.cartDetails[carObject.price_id] = {
        ...carObject,
        quantity: 1,
      };
    }
    cartDataObject.cartCount++;
    cartDataObject.totalPrice += parseInt(carObject.price);

    // Güncellenmiş cartData'yı localStorage'a geri ekleyin
    setCarts(JSON.stringify(cartDataObject));
    localStorage.setItem(username + "_cart", JSON.stringify(cartDataObject));
  };

  const removeItem = (id, username) => {
    var storedCartData = localStorage.getItem(username + "_cart");

    storedCartData = JSON.parse(storedCartData);
    const itemToRemove = storedCartData.cartDetails[id];

    // Verilen id'ye sahip öğeyi cartDetails içinden kaldırın
    delete storedCartData.cartDetails[id];

    while (itemToRemove.quantity != 0) {
      storedCartData.cartCount--;
      storedCartData.totalPrice -= parseInt(itemToRemove.price);
      itemToRemove.quantity--;
    }

    // Güncellenmiş cartData'yı localStorage'a geri ekleyin
    setCarts(JSON.stringify(storedCartData));
    localStorage.setItem(username + "_cart", JSON.stringify(storedCartData));
  };

  const clearCart = (username) => {
    var cartDataObject = localStorage.getItem(username + "_cart");

    var cartDataObject = {
      cartCount: 0,
      cartDetails: {},
      totalPrice: 0,
    };

    // Güncellenmiş cartData'yı localStorage'a geri ekleyin
    setCarts(JSON.stringify(cartDataObject));
    localStorage.setItem(username + "_cart", JSON.stringify(cartDataObject));
  };

  const incrementItem = (id, username) => {
    var storedCartData = localStorage.getItem(username + "_cart");

    storedCartData = JSON.parse(storedCartData);

    const itemToFind = storedCartData.cartDetails[id];

    storedCartData.cartCount++;
    storedCartData.totalPrice += parseInt(itemToFind.price);
    itemToFind.quantity++;

    // Güncellenmiş cartData'yı localStorage'a geri ekleyin
    setCarts(JSON.stringify(storedCartData));
    localStorage.setItem(username + "_cart", JSON.stringify(storedCartData));
  };

  const decrementItem = (id, username) => {
    var storedCartData = localStorage.getItem(username + "_cart");

    storedCartData = JSON.parse(storedCartData);

    const itemToFind = storedCartData.cartDetails[id];

    storedCartData.cartCount--;
    storedCartData.totalPrice -= parseInt(itemToFind.price);
    if (itemToFind.quantity == 1) {
      delete storedCartData.cartDetails[id];
    } else {
      itemToFind.quantity--;
    }

    // Güncellenmiş cartData'yı localStorage'a geri ekleyin
    setCarts(JSON.stringify(storedCartData));
    localStorage.setItem(username + "_cart", JSON.stringify(storedCartData));
  };

  const cartCount = (username) => {
    var storedCartData = localStorage.getItem(username + "_cart");
    console.log(storedCartData);
    if (storedCartData !== null) {
      storedCartData = JSON.parse(storedCartData);
      return storedCartData.cartCount || 0;
    }
    return 0;
  };

  const totalPrice = (username) => {
    var storedCartData = localStorage.getItem(username + "_cart");
    if (storedCartData !== null) {
      storedCartData = JSON.parse(storedCartData);
      return storedCartData.totalPrice || 0;
    }
    return 0;
  };

  const cartDetails = (username) => {
    var storedCartData = localStorage.getItem(username + "_cart");
    if (storedCartData !== null) {
      storedCartData = JSON.parse(storedCartData);
      return storedCartData.cartDetails || {};
    }
    return {};
  };

  const transferItems = (username) => {
    // Guest cart'ı al
    var storedCartGuest = localStorage.getItem("guest_cart");
    var storedCartData = JSON.parse(storedCartGuest);

    // Eğer misafir sepeti boşsa veya yoksa, işlem yapma
    if (!storedCartData || !storedCartData.cartDetails) return;

    const arrayFromCart = Object.values(storedCartData.cartDetails);
    // Misafir sepetteki her öğeyi kullanıcı sepetine ekle
    arrayFromCart.forEach((item) => {
      /* storedCartUserData.cartDetails.push(item); */
      addItem(item, username);
    });

    clearCart("guest")

  };


  return (
    <>
      <Navbar
        cartCount={cartCount}
        removeItem={removeItem}
        clearCart={clearCart}
        incrementItem={incrementItem}
        decrementItem={decrementItem}
        totalPrice={totalPrice}
        cartDetails={cartDetails}
      />
      {pathname === "/" ? (
        <Home cars={cars} addItem={addItem} username={username} transferItems={transferItems} sessionStatus={sessionStatus} initialized={initialized} setInitialized={setInitialized}>
          {children}
        </Home>
      ) : pathname.startsWith("/product/") ? (
        <ProductDetails addItem={addItem}>
          {children}
        </ProductDetails>
      ) : (
        [children]
      )}
      <ToastContainer stacked />
      <Footer />
    </>
  );
};
