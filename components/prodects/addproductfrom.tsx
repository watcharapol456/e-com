"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { addProduct } from "@/action/action.products";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";

function AddProductForm() {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [properties, setProperties] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productData = await addProduct({
        id: Math.random().toString(36).substr(2, 9),
        labelName: productName,
        labelPrice: Number(price),
        stock: Number(stock),
        properties: properties,
        imgURL: thumbnail || "",
      });
      console.log("Product added:", productData);
    } catch (error) {
      console.error("Error while adding product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-8"
    >
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-gray-700 font-medium"
        >
          Name
        </label>
        <Input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-medium">
          Price
        </label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value === ""
                ? ""
                : Math.max(0, parseFloat(e.target.value))
            )
          }
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="stock" className="block text-gray-700 font-medium">
          Stock
        </label>
        <Input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) =>
            setStock(
              e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value))
            )
          }
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="properties" className="block text-gray-700 font-medium">
          Properties
        </label>
        <Input
          type="text"
          id="properties"
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="thumbnail" className="block text-gray-700 font-medium">
          Thumbnail URL
        </label>
        <UploadButton
          className="mt-5"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            if (res && res.length > 0) {
              console.log("Selected file URL: ", res[0].url);
              setThumbnail(res[0].url);
            }
            console.log("Thumbnail before submission: ", thumbnail);
          }}
          onUploadError={(error: Error) => {
            console.log("error ", error);
          }}
        />
      </div>
          {/* <Link href={'/addproduct'}> */}
          <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Product
      </button>
          {/* </Link> */}
    
    </form>
  );
}

export default AddProductForm;
