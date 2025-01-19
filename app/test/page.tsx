"use client";
import { UploadButton } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Testpage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // ตรวจสอบสถานะการโหลดและ role
    if (status === "authenticated" && session?.user.role !== "admin") {
      router.push("/"); 
    }
  }, [session, status, router]);

  // แสดงข้อความ loading ระหว่างตรวจสอบ session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // ถ้าผู้ใช้เป็น admin ให้แสดงเนื้อหา
  if (session?.user.role === "admin") {
    return (
      <div>
        <h1>Admin Page</h1>
        <p>Welcome, {session.user.name}!</p>
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

   
      </div>
    );
  }

  return null; // หรือข้อความว่างในกรณีที่กำลัง redirect
}

export default Testpage;
