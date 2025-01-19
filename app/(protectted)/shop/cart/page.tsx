"use client";

import { Button } from "@/components/ui/button";
import { updateCart } from "@/redux/features/cart-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; 
interface CartItem {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  stock: number;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray: CartItem[] = useAppSelector((state) => state.cart);
  const router = useRouter(); 
  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  // นำเข้า useRouter

const handleOrder = async () => {

  try {
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.stock,
    }));

    const res = await fetch("http://localhost:3000/api/stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: orderItems }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.error);
      return;
    }

    
    router.push("/payment");  // เปลี่ยนเส้นทางไปยังหน้าจ่ายเงิน
  } catch (error) {
    console.error("Error ordering products:", error);
    alert("Failed to place order.");
  }
};


  const incrementCartItem = (index: number) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, stock: item.stock + 1 } : item
    );
    dispatch(updateCart(updatedItems));
  };

  const decrementCartItem = (index: number) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index && item.stock > 1 ? { ...item, stock: item.stock - 1 } : item
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
            key={item.id}
            className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg shadow-md mt-8"
          >
            <div className="flex items-center">
              <Image
                src={item.imgURL}
                alt={item.labelName}
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
                  {item.stock * item.labelPrice} ฿
                </div>

                <div className="mt-3">
                  <div className="text-gray-600 text-sm flex items-center justify-center">
                    Quantity: {item.stock}
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
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
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
          (total, item) => total + item.stock * item.labelPrice,
          0
        )}{" "}
        ฿
      </div>
      {cartArray.length > 0 && (
        <div className="mt-6 text-right">
          <Link href={"/shop"}>
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
