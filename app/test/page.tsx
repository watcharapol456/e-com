"use client";

import { UploadButton } from '@/utils/uploadthing'
import React from 'react'

function Testpage() {
  return (
    <div> <UploadButton
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
  )
}

export default Testpage