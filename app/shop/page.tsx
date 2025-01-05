import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: string;
}

export default async function ProductPage() {
  try {
    const res = await fetch("https://677a5172671ca03068339b04.mockapi.io/product"); 

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const ProductData :  Product[] = await res.json();

    return (
      <div className="grid grid-cols-2 gap-6 justify-center justify-items-center m-5">
        {ProductData.map((item, index) => (
           <Link 
            key={item.key} 
            href={`/product/${item.id}`}
            className="w-full justify-center flex"
          >
            <div 
              className={`w-1/2 flex flex-col items-center p-4 border rounded-lg shadow-md bg-white ${
                index >= 4 ? "hidden" : ""
              }`}
            >
              <Image
                src={item.imgURL}
                alt={item.labelName}
                width={100}
                height={100}
                className="rounded-md"
              />
              <p className="mt-2 text-lg font-semibold">{item.labelName}</p>
              <p className="text-gray-600">{item.labelPrice}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return <p className="text-center text-red-500">Failed to load products. Please try again later.</p>;
  }
}
