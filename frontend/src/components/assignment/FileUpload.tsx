"use client";

import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  const { getRootProps, getInputProps } =
    useDropzone();

  return (
    <div
      {...getRootProps()}
      className="
      border-2
      border-dashed
      rounded-2xl
      p-10
      text-center
      cursor-pointer
      "
    >
      <input {...getInputProps()} />

      <p className="font-medium">
        Choose a file or drag &
        drop it here
      </p>

      <p className="text-sm text-gray-500 mt-2">
        PDF, PNG, JPG up to 10MB
      </p>
      <button
  className="
    mt-4
    bg-gray-100
    px-4
    py-2
    rounded-lg
  "
>
  Browse Files
</button>
    </div>
  );
}