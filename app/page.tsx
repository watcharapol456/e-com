import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
<div className="w-full h-screen flex justify-center items-center bg-[url('/assets/ImageBannerMobile_960x633_New-70-scaled.jpg')] bg-opacity-50">
  <div className="text-center flex flex-col space-y-4 p-12 bg-white rounded-lg shadow-xl">
    <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Website</h1>
    <p className="text-gray-600">พบกับสินค้าและบริการที่น่าตื่นเต้น</p>
    <div>
      <Link href="/shop">
        <Button className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all">
          เลือกซื้อสินค้า
        </Button>
      </Link>
    </div>
  </div>
</div>

  );
}
