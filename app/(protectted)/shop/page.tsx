"use server"

import db from "@/db";
import { error } from "console";
import Image from "next/image";
import Link from "next/link";

// interface Product {
//   id: string;
//   key: string;
//   imgURL: string;
//   labelName: string;
//   labelPrice: string;
// }

const ProductPage = async () => {
  try{
    const allProducts = await db.query.stockInventory.findMany();
    return (
      <div>
        {/* Banner Section */}
        <div className="relative">
          <Image
            src="/assets/4DQpjUtzLUwmJZZPFiL46zckgdVZn49EOic9X7iY9CVu.jpg"
            alt="Banner"
            width={2000}
            height={600}
            className="w-full h-[500px] object-cover shadow-md"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-full">
            <div className="w-full px-6 py-6 bg-blue-600 text-white font-semibold shadow-lg transition-all">
              <p className="font-bold">ผลิตภัณฑ์ของเรา</p>
            </div>
          </div>
        </div>
  
        {/* Product Section */}
        <div className="grid grid-cols-2 gap-6 justify-center justify-items-center m-5">
          {allProducts.map((item) => (
            <Link
              key={item.key}
              href={`/product/${item.id}`}
              className="w-1/2 flex justify-center"
            >
              <div className="w-full flex flex-col items-center p-4 border rounded-lg shadow-md bg-white">
              
                {/* <Image
                  src={item.imgURL}
                  alt={item.labelName}
                  width={100}
                  height={100}
                  className="rounded-md"
                /> */}
                <p className="mt-2 text-lg font-semibold">{item.labelName}</p>
                <p className="text-gray-600">{`Price: ${item.labelPrice} บาท`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }catch{
    return error;
  }

  // const ProductData:Product[] = [
  //   {
  //     id: "1",
  //     key: "1",
  //     imgURL: "/assets/ceMYv-H5.jpg",
  //     labelName: "น้ำมันไพล",
  //     labelPrice: "10",
  //   },
  //   {
  //     id: "2",
  //     key: "2",
  //     imgURL: "/assets/DK0PMuFQ.jpg",
  //     labelName: "น้ำหมักชีวภาพ",
  //     labelPrice: "10",
  //   },
  //   {
  //     id: "3",
  //     key: "3",
  //     imgURL: "/assets/MmektI_e.jpg",
  //     labelName: "น้ำมันไพลแบบใหญ่",
  //     labelPrice: "10",
  //   },
  //   {
  //     id: "4",
  //     key: "4",
  //     imgURL: "/assets/Xj1PztBi.jpg",
  //     labelName: "มูลไส้เดือน",
  //     labelPrice: "10",
  //   },
  // ];

 
}
export default ProductPage;
