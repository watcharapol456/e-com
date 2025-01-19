"use client";

import { signOut } from "next-auth/react";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

interface CartItem {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  stock: number;
}

const Navbar = () => {
  const [cartItems, setCartItems] = useState(0);
  const { data: session } = useSession();
  const cartArray: CartItem[] = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  return (
    <div className="flex bg-gray-800 h-[100px] w-full fixed z-50 top-0 left-0">
      <div className="flex flex-1 justify-between text-white">
        <div className="justify-center justify-items-center flex m-5 text-5xl">
          <Link href={"/shop"}>logo</Link>
        </div>

        <div className="flex items-center justify-start space-x-4 mr-5">
          <div className="relative">
            <Link href={"/shop/cart"}>
              <Image
                src={"/assets/shopping-cart.svg"}
                height={40}
                width={40}
                alt={"cart"}
              />
            </Link>
            {cartItems > 0 && (
              <div className="absolute top-0 right-0 py-1 px-2 bg-red-500 text-white rounded-full text-xs">
                <span>{cartItems}</span>
              </div>
            )}
          </div>

          <div className="relative flex justify-center justify-items-center m-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={"/assets/align-justify.svg"}
                  alt="menu"
                  width={50}
                  height={12}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <div className="flex justify-center">
                    <p>
                    {session?.user.name}
                    </p>
                  </div>
                  </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="relative hover:bg-slate-300">
                  <Link href={"/shop/cart"}>
                    <button>ตระกร้าสินค้า</button>
                  </Link>
                </DropdownMenuItem>
                {/* เพิ่มเงื่อนไขการแสดงปุ่ม "จัดการสินค้า" ถ้า role เป็น admin */}
                {session?.user?.role === "admin" && (
                  <DropdownMenuItem className="relative hover:bg-slate-300">
                    <Link href={"/admin"}>
                      จัดการสินค้า
                    </Link>
                  </DropdownMenuItem>
                )}
                 {session?.user?.role === "admin" && (
                  <DropdownMenuItem className="relative hover:bg-slate-300">
                    <Link href={"/admin/addproduct"}>
                      เพิ่มสินค้า
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="hover:bg-slate-300">
                  <button onClick={() => signOut()}>ออกจากระบบ</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
