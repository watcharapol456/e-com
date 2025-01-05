import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
<div className="w-full h-screen flex justify-center items-center">
  <div className="text-center flex flex-col">
    Welcome to website
    <div className="">
      <Link href={"shop"}>
      <Button>เลือกซื้อสินค้า</Button>
      </Link>
  
    </div>
 
  </div>
</div>

  );
}
