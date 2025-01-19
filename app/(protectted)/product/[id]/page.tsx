"use client";

import { Button } from "@/components/ui/button";
import { updateCart } from "@/redux/features/cart-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import {  useParams } from "next/navigation";
import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface DataProduct {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  properties: string;
  stock:number;
}

interface CartItem {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  stock: number;
}

const Page = () => {
  const paramId = useParams<{ id: string;  }>()
  const paramsnum = Number(paramId.id);
 
  const dispatch = useDispatch<AppDispatch>();
  const cartArray: CartItem[] = useAppSelector((state) => state.cart);
  const [data, setData] = useState<DataProduct | null>(null);

  
  console.log("DEBUG ID",paramsnum)
  console.log("DEBUG ID",typeof paramsnum);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getdata');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const result = await response.json();
        // const matchedItem = result.select().from(stockInventory).where(eq(stockInventory.id,paramsnum))
        const result: DataProduct[] = await response.json();

        // หา item ที่มี id ตรงกับ paramsnum
        const matchedItem = result.find((item) => Number(item.id) === paramsnum);

        setData(matchedItem || null);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paramsnum]);

  

  const addToCart = (product: DataProduct) => {
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.stock + 1 } : item
      );

      dispatch(updateCart(updatedCart));
    } else {
      const newCartItem = {
        key: product.key,
        labelName: product.labelName,
        labelPrice: product.labelPrice,
        id: product.id,
        imgURL: product.imgURL,
        stock: 1,
      };
      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    }
  };

 
  if (!data) {
    return null
    // return redirect("/shop");
  }

  return (
    <div className="flex max-w-full p-6 bg-white h-screen justify-center ml-56">
      <div className="w-1/3 flex justify-center items-center">
        <Image 
        src={data.imgURL}
        alt={data.labelName}
        height={300}
        width={300}
        />
      </div>

      <div className="w-2/3 pl-8 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-gray-800">{data.labelName}</h2>
        <p className="text-2xl text-gray-600 mb-4">{`Price: ${data.labelPrice} บาท`}</p>

        <div className="text-lg space-y-2">
          <h3 className="font-semibold text-gray-700">Details</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium text-gray-700">ID:</span> {data.id}
            </li>
  
            <li>
              <span className="font-medium text-gray-700">Properties:</span> {data.properties}
            </li>
            <li>
              <span className="font-medium text-gray-700">Stock:</span> {data.stock}
            </li>
            
          </ul>
          <div className="flex flex-row gap-5">
            <div>
              <Link href="/shop">
                <Button className="p-8 text-2xl bg-red-600">ย้อนกลับ</Button>
              </Link>
            </div>
            <div>
              <Button
                className="p-8 text-2xl bg-green-400"
                onClick={() => addToCart(data)}
              >
                เพิ่มสินค้า
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;