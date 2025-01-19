"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { editProduct, getProduct } from "@/action/action.products";
import { UploadButton } from "@/utils/uploadthing";

interface IFormData {
  imgURL: string;
  labelName: string;
  labelPrice: number;
  properties: string;
  stock: number;
}

const DEFAULT_FORM_DATA: IFormData = {
  labelName: "",
  labelPrice: 0,
  properties: "",
  stock: 0,
  imgURL: "",
};

const EditPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>(DEFAULT_FORM_DATA);

  const id = params.id as string;

  const queryBlog = useCallback(async (id: string) => {
    try {
      const product = await getProduct(id);
      setFormData({
        labelName: product.labelName || "",
        labelPrice: product.labelPrice,
        properties: product.properties || "",
        stock: product.stock,
        imgURL: product.imgURL || "",
      });
    } catch (error) {
      console.error("[ERROR]", error);
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      queryBlog(id);
    } else {
      router.push("/");
    }
  }, [id, queryBlog, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "labelPrice" || name === "stock" ? +value : value, // Convert numbers
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await editProduct(formData, id);
        router.push("/admin");
      }
    } catch (error) {
      console.error("[ERROR]", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="labelName" className="text-lg font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="labelName"
            name="labelName"
            value={formData.labelName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter the product name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="labelPrice" className="text-lg font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="labelPrice"
            name="labelPrice"
            value={formData.labelPrice}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter the price"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="properties" className="text-lg font-medium mb-2">
            Properties
          </label>
          <textarea
            id="properties"
            name="properties"
            value={formData.properties}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md resize-none"
            rows={6}
            placeholder="Enter product properties"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="text-lg font-medium mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter stock quantity"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={formData.imgURL || "/placeholder-image.jpg"}
            alt="Product Image"
            width={650}
            height={400}
          />
        </div>
        <UploadButton
          className="mt-4"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0]?.url) {
              setFormData((prev) => ({
                ...prev,
                imgURL: res[0].url,
              }));
            }
          }}
          onUploadError={(error: Error) => {
            console.error("[ERROR]", error);
          }}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-4 bg-green-500 text-white hover:bg-green-600"
          >
            Update Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
