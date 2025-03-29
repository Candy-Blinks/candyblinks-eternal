import React from "react";
import Image from "next/image";

interface NFTCardProps {
  name: string;
  attributes: { trait_type: string; value: string | number }[];
  imageUrl?: string;
}

export default function NFTCard({ name, attributes, imageUrl }: NFTCardProps) {
  return (
    <div className="w-[176px] h-auto bg-white-4 rounded-xl shadow-lg p-[8px] relative">
      <div className="absolute top-[18px] left-[18px] bg-black-32 text-white text-xs font-semibold px-2 py-1 rounded">
        Rare
      </div>

      <div className="flex items-center justify-center w-[160px] h-[151px] bg-white-4 rounded-lg">
        {imageUrl ? (
          <Image src={imageUrl} alt="NFT Preview" width={160} height={151} className="rounded-lg object-cover" />
        ) : (
          <Image src="/images/upload.png" alt="upload" width={32} height={32} />
        )}
      </div>

      <p className="mt-[8px] ty-title text-white">{name}</p>

      {/* Display Attributes */}
      <div className="mt-2 text-white text-xs">
        {attributes.map((attr, index) => (
          <p key={index} className="text-gray-300">
            <strong>{attr.trait_type}:</strong> {attr.value}
          </p>
        ))}
      </div>

      <div className="flex justify-end mt-[16px]">
        <button className="px-4 py-2 bg-black-50 text-white ty-title rounded-lg">
          Edit
        </button>
      </div>
    </div>
  );
}
