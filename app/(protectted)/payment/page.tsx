import Link from "next/link";



const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-green-600">
          ขอบคุณสำหรับการสั่งซื้อ!
        </h1>
        <p className="mt-4 text-center text-gray-700">
          การชำระเงินของคุณเสร็จสมบูรณ์แล้ว 🎉
        </p>
        <p className="mt-2 text-center text-gray-500">
          หากคุณมีคำถามเพิ่มเติม กรุณาติดต่อเราได้ตลอดเวลา
        </p>
        <Link href="/shop">
          <div className="block px-6 py-3 mt-6 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            กลับไปยังหน้าแรก
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
