"use client";
import { Button } from "@/components/ui/button";
import { updateCart } from "@/redux/features/cart-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { use } from "react";

interface DataProduct {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  features: string;
  ingredients: string;
  properties: string;
  usage: string;
  registration_number: string;
  brand: string;
  benefits: string;
  warnings: string;
}
interface CartItem {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  quantity: number;
}

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray: CartItem[] = useAppSelector((state) => state.cart);

  const products: DataProduct[] = [
    {
      id: "1",
      key: "1",
      imgURL: "/assets/ceMYv-H5.jpg",
      labelName: "น้ำมันไพล",
      labelPrice: 10,
      features: "มีกลิ่นหอมจากธรรมชาติ",
      ingredients: "หัวไพล",
      properties:
        "บรรเทาอาการปวดเมื่อย แก้ตะคริว บรรเทาอาการจากแมลงสัตว์กัดต่อย",
      usage:
        "พ่นสเปรย์ในจุดที่ต้องการ 2-3 ครั้ง นวดเพื่อกระตุ้นการซึมซับให้เร็วขึ้น ฉีดได้บ่อยเท่าที่ต้องการ",
      registration_number: "6-50-06-03/1-0037",
      brand: "Generic",
      benefits: "",
      warnings: "",
    },
    {
      id: "2",
      key: "2",
      imgURL: "/assets/DK0PMuFQ.jpg",
      labelName: "น้ำหมักชีวภาพ",
      labelPrice: 10,
      features: "ธาตุอาหารสูง ดีต่อพืชทุกชนิด บำบัดน้ำเสีย",

      ingredients: "",
      properties:
        "ปรับปรุงดิน ช่วยการเจริญเติบโตของพืช ช่วยพืชได้รับสารอาหาร โตเร็ว",
      usage:
        "ฉีดพ่นทางใบ: 500cc - 1 ลิตร ต่อน้ำ 10 ลิตร ราดรอบโคนต้น: 1 ลิตร ต่อน้ำ 20 ลิตร ฉีดพ่นลงเมล็ดพันธุ์ก่อนปลูก",
      registration_number: "",
      brand: "Green Park",
      benefits: "ช่วยการเจริญเติบโตของพืช ลดการเกิดโรคของพืชและป้องกันแมลง",
      warnings:
        "ห้ามใช้โดยไม่ผสมน้ำ อาจทำให้ต้นไม้ตายได้ เก็บในที่ร่ม อากาศถ่ายเทสะดวก เก็บได้นาน 1 ปี",
    },
    {
      id: "3",
      key: "3",
      imgURL: "/assets/MmektI_e.jpg",
      labelName: "น้ำมันไพลแบบใหญ่",
      labelPrice: 10,
      features: "มีกลิ่นหอมจากธรรมชาติ",
      ingredients: "หัวไพล",
      properties:
        "บรรเทาอาการปวดเมื่อย แก้ตะคริว บรรเทาอาการจากแมลงสัตว์กัดต่อย",
      usage:
        "พ่นสเปรย์ในจุดที่ต้องการ 2-3 ครั้ง นวดเพื่อกระตุ้นการซึมซับให้เร็วขึ้น ฉีดได้บ่อยเท่าที่ต้องการ",
      registration_number: "6-50-06-03/1-0037",
      brand: "Generic",
      benefits: "",
      warnings: "",
    },
    {
      id: "4",
      key: "4",
      imgURL: "/assets/Xj1PztBi.jpg",
      labelName: "มูลไส้เดือน",
      labelPrice: 10,
      features: "ผสมด้วยเชื้อไตรโคเดอร์มา",
      ingredients: "",
      properties:
        "ปรับปรุงดิน บำรุงต้นไม้ พืชแตกยอดไว ใบดก ดอกสวย ช่วยพืชได้รับสารอาหาร โตเร็ว ใช้ได้กับพืชผัก ดอกไม้ แคคตัส และสลัด",
      usage:
        "ใช้โรยกระถาง แปลงผัก หรือโคนต้น เดือนละครั้ง สำหรับต้นไม้ใหญ่ ควรเพิ่มปริมาณให้เหมาะสม รดน้ำให้ดินชุ่ม",
      registration_number: "",
      brand: "Generic",
      benefits: "",
      warnings: "",
    },
  ];

  const addToCart = (product: DataProduct) => {
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );

      dispatch(updateCart(updatedCart));
    } else {
      const newCartItem = {
        key: product.key, 
        labelName: product.labelName, 
        labelPrice: product.labelPrice, 
        id: product.id,
        imgURL: product.imgURL,
        labalPrice: product.labelPrice,
        quantity: 1,
      };
      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    }
  };

  useEffect(() => {
    console.log("cartArray", cartArray);
  }, [cartArray]);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return redirect("/shop");
  }

  if (product) {
    return (
      <div className="flex max-w-full p-6 bg-white h-screen justify-center ml-56">
        <div className="w-1/3 flex justify-center items-center">
          <Image
            src={product.imgURL}
            alt={product.labelName}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        <div className="w-2/3 pl-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {product.labelName}
          </h2>
          <p className="text-2xl text-gray-600 mb-4">{`Price: ${product.labelPrice} บาท`}</p>

          <div className="text-lg space-y-2">
            <h3 className="font-semibold text-gray-700">Details</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-gray-700">ID:</span>{" "}
                {product.id}
              </li>
              <li>
                <span className="font-medium text-gray-700">Features:</span>{" "}
                {product.features}
              </li>
              <li>
                <span className="font-medium text-gray-700">Ingredients:</span>{" "}
                {product.ingredients}
              </li>
              <li>
                <span className="font-medium text-gray-700">Properties:</span>{" "}
                {product.properties}
              </li>
              <li>
                <span className="font-medium text-gray-700">Usage:</span>{" "}
                {product.usage}
              </li>
              <li>
                <span className="font-medium text-gray-700">
                  Registration Number:
                </span>{" "}
                {product.registration_number}
              </li>
              <li>
                <span className="font-medium text-gray-700">Brand:</span>{" "}
                {product.brand}
              </li>
              <li>
                <span className="font-medium text-gray-700">Benefits:</span>{" "}
                {product.benefits.length > 0 ? product.benefits : "None"}
              </li>
              <li>
                <span className="font-medium text-gray-700">Warnings:</span>{" "}
                {product.warnings.length > 0 ? product.warnings : "None"}
              </li>
            </ul>
            <div className="flex flex-row gap-5">
              <div>
                <Link href={"/shop"}>
                  <Button className="p-8 text-2xl bg-red-600">ย้อนกลับ</Button>
                </Link>
              </div>
              <div>
                <Button
                  className="p-8 text-2xl bg-green-400 "
                  onClick={() => addToCart(product)}
                >
                  เพิ่มสินค้า
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
