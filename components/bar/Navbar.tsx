"use client";

import { signOut } from "next-auth/react"
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  stock: number;
}
const Navbar = () => {
  const [cartItems, setCartItems] = useState(0);

  const cartArray: CartItem[] = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  return (
    <div className="flex bg-gray-800 h-[100px] w-full fixed z-50 top-0 left-0 ">
      <div className="flex flex-1 justify-between text-white">
        <div className=" justify-center justify-items-center flex m-5 text-5xl">
          <Link href={"/shop"}>logo</Link>
        </div>
        <div className="relative flex justify-center justify-items-center m-5">
          <Link href={"/shop/cart"}>
            <Image
              src={"/assets/shopping-cart.svg"}
              height={50}
              width={50}
              alt={"cart"}
            />
          </Link>
          <div className="absolute top-0 right-0 py-1 px-2 bg-red-500 text-white rounded-full text-xs">
            <span>{cartItems}</span>
          </div>
        </div>
        <button onClick={() => signOut()} className="-ml-24 p-2 text-xl text-white w-full" >Sign Out</button>
      </div>
    </div>
  );
};
export default Navbar;
