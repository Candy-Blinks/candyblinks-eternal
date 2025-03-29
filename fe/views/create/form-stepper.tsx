"use client";
import { useStore } from "@/store/store";
import { Check } from "lucide-react";
import React from "react";

export default function FormStepper() {
  const { createPage } = useStore();

  const items = [
    {
      label: "Candy Store Information",
      description:
        "Enter the basic information about your collection, including name, description, and other metadata.",
    },
    {
      label: "Upload",
      description:
        "Upload the assets for your collection, such as images, videos, or other relevant files.",
    },
    {
      label: "Collection Overview",
      description:
        "Review the details of your collection, including uploaded assets, metadata, and settings.",
    },
    {
      label: "Deploy",
      description:
        "Deploy your collection to the blockchain, making it publicly accessible and ready for interaction.",
    },
  ];

  return (
    <div className="space-y-4 p-2 bg-black rounded-lg w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 ${
            createPage >= index
              ? "bg-white-4 shadow-lg rounded-lg border border-white-4"
              : "bg-transparent border-none"
          }`}
        >
          <div
            className={`w-fit h-fit p-2 rounded-full border-2 flex items-center justify-center ${
              createPage >= index
                ? "border-red-500 bg-red-500"
                : "border-gray-500"
            }`}
          >
            {createPage > index && <Check size={4} color="#0C0F18" />}
          </div>

          <div className="flex flex-col gap-3">
            <p
              className={`ty-title font-semibold ${
                createPage >= index ? "text-white" : "text-gray-300"
              }`}
            >
              {item.label}
            </p>
            <p className="ty-subtext text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
