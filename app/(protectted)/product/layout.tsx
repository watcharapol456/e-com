
import Footer from "@/components/bar/Footer";
import Navbar from "@/components/bar/Navbar";
import ReduxProvider from "@/redux/provider";


import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        <Navbar></Navbar>
        <main className="flex-grow">
        {children}
          </main>
        <Footer></Footer>
        </ReduxProvider>
  
  

      </body>
    </html>
  );
}
