
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-lg font-bold">Ohm Website</h1>
            <p className="text-gray-400">สร้างประสบการณ์ที่ดีที่สุดสำหรับคุณ</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white">
              หน้าหลัก
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              เกี่ยวกับเรา
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              บริการ
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              ติดต่อ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
