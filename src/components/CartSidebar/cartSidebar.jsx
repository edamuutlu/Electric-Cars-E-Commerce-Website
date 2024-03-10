"use client";
import CartItem from "./cartitem";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useShoppingCart } from "use-shopping-cart";
import CheckoutBtn from "../CheckoutBtn/checkoutBtn";
import CustomButtom from "./../custombuttom/custombuttom";

const CartSidebar = ({ isUserId }) => {
  const {
    cartCount,
    cartDetails,
    shouldDisplayCart,
    handleCartClick,
    totalPrice,
    clearCart,
  } = useShoppingCart();
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Shopping Cart</SheetTitle>
        </SheetHeader>
        <>
          {cartCount === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-[760px]">
              <h5 className="py-14 text-black/50 font-bold uppercase">
                Your cart is empty
              </h5>
            </div>
          ) : (
            <ScrollArea className="h-[70vh] xl:h-[74vh] pr-4 mb-4">
              {cartDetails &&
                Object.entries(cartDetails).map(([key, item]) => {
                  return (
                    <CartItem item={item} key={key} open={shouldDisplayCart} />
                  );
                })}
            </ScrollArea>
          )}
        </>
        {cartCount > 0 && (
          <div>
            <div className="flex justify-between font-semibold">
              <div className="uppercase mb-5">Total</div>
              <div>
                {totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} TL
              </div>
            </div>
            <CheckoutBtn isUserId={isUserId} />
            <CustomButtom
              title="Clear to Cart"
              containerStyles="py-4 mt-3 text-white uppercase bg-black hover:bg-black-100 
              w-full shadow-lg rounded-md"
              handleClick={() => clearCart()}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
