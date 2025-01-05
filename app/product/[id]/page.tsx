import Image from "next/image";

async function getProduct(id: string) {
  const response = await fetch(`https://677a5172671ca03068339b04.mockapi.io/product/${id}`);

  if (!response.ok) {
    throw new Error("Can not fetch product data");
  }

  return response.json();
}

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    // ดึงข้อมูลโดยการเรียกใช้ฟังก์ชัน getProduct
    const product = await getProduct(params.id); // รอ fetch ข้อมูล

    return (
      <div>
        <p>Id: {product.id}</p>
        <p>Name: {product.labelName}</p>
        <p>Price: {product.labelPrice}</p>
        <Image
          src={product.imgURL}
          alt={product.labelName}
          width={100}
          height={100}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return (
      <div>
        <p>Error fetching product data. Please try again later.</p>
      </div>
    );
  }
};

export default Page;
