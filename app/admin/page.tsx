"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DeleteButton from "@/components/prodects/deleteproductfrom";
import { stockInventory } from "@/db/schema";
import Link from "next/link";

interface DataProduct {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  properties: string;
  stock: number;
}

function AdminPage() {
  const [data, setData] = useState<DataProduct[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://www.localhost:3000/api/getdata");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: DataProduct[] = await response.json();
        setData(result); // update to set DataProduct[] array directly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000); // 10000ms = 10 seconds

    return () => clearInterval(intervalId);
  }, []);
  

  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "admin") {
      router.push("/"); // Redirect if not admin
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.user.role === "admin") {
    return (
      <div className="min-h-screen bg-gray-100 p-8 mt-5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden "
              >
                <div className="relative">
                  <Image
                    src={product.imgURL}
                    alt={product.labelName}
                    width={500} // ปรับขนาดที่ต้องการ
                    height={300} // ปรับขนาดที่ต้องการ
                    objectFit="cover" // ป้องกันการบิดเบือนภาพ
                    className="rounded-t-lg"
                  />

                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-l-md">
                    {product.stock} in stock
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.labelName}
                  </h3>
                  <p className="text-gray-600 mt-2">{product.properties}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-bold text-green-600">
                      B{product.labelPrice}
                    </p>
                    <div className=" flex gap-5">
                      {/* ปุ่มลบ */}
                      <DeleteButton productId={parseInt(product.id) || 0} />

                      {/* ลิงก์ไปหน้าแก้ไข */}
                      <Link href={`/admin/editproduct/${product.id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null; // If not an admin user, render nothing (or redirect)
}

export default AdminPage;
