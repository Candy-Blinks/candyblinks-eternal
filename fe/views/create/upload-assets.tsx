import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";

interface IUploadAssetsProps {
  className?: string;
}

export default function UploadAssets({ className }: IUploadAssetsProps) {
  const { setCreateUploadedJson, setCreateUploadedImages } = useStore();
  const handleDrop = (files: File[]) => {
    const images = files.filter((file) => {
      return file.type.startsWith("image/");
    });

    const json = files.filter((file) => {
      return file.type.startsWith("application/json");
    });

    setCreateUploadedImages(images);

    const readJsonFile = (file: File): Promise<any> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const result = e.target?.result;
            if (typeof result === "string") {
              const parsedJson = JSON.parse(result);
              resolve({ fileName: file.name, data: parsedJson });
            }
          } catch (error) {
            reject(new Error(`Invalid JSON in file: ${file.name}`));
          }
        };
        reader.onerror = () =>
          reject(new Error(`Error reading file: ${file.name}`));
        reader.readAsText(file);
      });
    };

    Promise.all(json.map(readJsonFile))
      .then((parsedFiles) => {
        console.log("Parsed JSON Files:", parsedFiles);

        setCreateUploadedJson(parsedFiles);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/json": [".json"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        `flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg shadow-lg transition cursor-pointer min-h-[240px] h-full ${
          isDragActive
            ? "border-blue-500 bg-blue-100"
            : "border-white-4 bg-white-4"
        }`,
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex items-center space-x-2">
        <Image src="/images/upload.png" alt="upload" width={24} height={24} />
        <p className="text-sm font-medium text-gray-500">
          {isDragActive
            ? "Drop files here..."
            : "Click here or Drag & Drop JPEG, PNG, or JSON"}
        </p>
      </div>
    </div>
  );
}
