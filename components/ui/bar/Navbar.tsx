import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return(
        <div className="flex bg-black h-[100px] w-full">
            <div className="flex flex-1 justify-between text-white">
            <div className=" justify-center justify-items-center flex m-5 text-5xl">
            <Link href={"/"}>
                logo
            </Link>
            </div>
            <div className=" justify-center justify-items-center flex m-5"> 
                <Image 
                src={"/assets/shopping-cart.svg"}
                height={50}
                width={50}
                alt={"cart"}
                />
            </div>
            </div>
        </div>
    )
}
export default Navbar