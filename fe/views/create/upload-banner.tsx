import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import useUploadBanner from "@/hooks/useUploadBanner";
import { PINATA_GATEWAY } from "@/lib/constants";

interface IUploadBannerProps {
  className?: string;
}

export default function UploadBanner({ className }: IUploadBannerProps) {
  const { setCollectionBanner, collectionBanner } = useStore();

  const {
    mutate: uploadBanner,
    isSuccess: uploadBannerIsSuccess,
    data: uploadBannerData,
  } = useUploadBanner();
  const handleDrop = (files: File[]) => {
    const images = files.filter((file) => {
      return file.type.startsWith("image/");
    });

    uploadBanner({ image: images[0] });
  };

  useEffect(() => {
    if (uploadBannerIsSuccess && uploadBannerData) {
      setCollectionBanner(uploadBannerData.IpfsHash);
    }
  }, [uploadBannerIsSuccess, uploadBannerData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        `flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg shadow-lg transition cursor-pointer min-h-[150px] h-full ${
          isDragActive
            ? "border-blue-500 bg-blue-100"
            : "border-white-4 bg-white-4"
        }`,
        className
      )}
    >
      <input {...getInputProps()} />

      {collectionBanner ? (
        <div className="flex items-center space-x-2 max-w-full relative w-full min-h-[148px]">
          <Image
            src={`${PINATA_GATEWAY}ipfs/${collectionBanner}`}
            alt="upload"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Image src="/images/upload.png" alt="upload" width={24} height={24} />
          <p className="text-sm font-medium text-gray-500">
            {isDragActive
              ? "Drop files here..."
              : "Click here or Drag & Drop JPEG, PNG, or JSON"}
          </p>
        </div>
      )}
    </div>
  );
}
