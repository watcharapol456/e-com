"use client";
import { Button } from "@/components/ui/button";
import { updateCart } from "@/redux/features/cart-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface CartItem {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  quantity: number;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray: CartItem[] = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  const incrementCartItem = (index: number) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(updatedItems));
  };

  const decrementCartItem = (index: number) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(updateCart(updatedItems));
  };

  const removeCartItem = (index: number) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    dispatch(updateCart(updatedItems));
  };

  return (
    <div className="p-6 bg-white mt-32">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cart</h1>
      {cartArray.length === 0 ? (
        <h2 className="text-xl text-gray-500">Your cart is empty</h2>
      ) : (
        cartArray.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg shadow-md mt-8"
          >
            <div className="flex items-center">
              <Image
                src={item.imgURL}
                alt={"image"}
                width={60}
                height={60}
                className="object-cover rounded-lg mr-4"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {item.labelName}
                </p>
                <p className="text-gray-600">Price: {item.labelPrice} ฿</p>
              </div>
            </div>

            <div className="flex items-center gap-6 py-3">
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-center text-2xl font-semibold">
                  {isNaN(item.quantity * item.labelPrice)
                    ? 0
                    : item.quantity * item.labelPrice}{" "}
                  ฿
                </div>

                <div className="mt-3">
                  <div className="text-gray-600 text-sm flex items-center justify-center">
                    Quantity: {item.quantity}
                  </div>
                  <div className="flex flex-row gap-6 mt-2">
                    <button
                      className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-all duration-200"
                      onClick={() => decrementCartItem(index)}
                    >
                      -
                    </button>

                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200"
                      onClick={() => incrementCartItem(index)}
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 "
                      onClick={() => removeCartItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="mt-6 text-right font-bold text-xl">
        Total:{" "}
        {cartItems.reduce(
          (total, item) => total + item.quantity * item.labelPrice,
          0
        )}{" "}
        ฿
      </div>
      <Link href={'/payment'}>
      <Button>ชำระเงิน</Button>
      </Link>

    </div>
  );
}

export default CartPage;
