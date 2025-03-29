import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export default function FeaturedCollection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center">
        <p className={cn("ty-h2 text-white-100")}>Featured Collections </p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap w-full justify-between">
        <div className="md:basis-[33%] flex flex-col gap-1">
          <div className="w-full h-[314px] bg-white-4 rounded-2xl p-4">
            <div className="w-full h-full bg-white-8 rounded-3xl relative">
              <Image
                src={"/images/collection_3.png"}
                alt={"/images/collection_3.png"}
                fill
                className="object-cover rounded-2xl "
              />
            </div>
          </div>
          <div className="w-full h-[378px] bg-white-4 rounded-2xl p-4">
            <div className="w-full h-full bg-white-8 rounded-3xl relative">
              <Image
                src={"/images/collection_1.png"}
                alt={"/images/collection_1.png"}
                fill
                className="object-cover rounded-2xl "
              />
            </div>
          </div>
        </div>
        <div className="md:basis-[33%] flex flex-col gap-1">
          <div className="w-full h-[378px] bg-white-4 rounded-2xl p-4">
            <div className="w-full h-full bg-white-8 rounded-3xl relative">
              {" "}
              <Image
                src={"/images/collection_2.png"}
                alt={"/images/collection_2.png"}
                fill
                className="object-cover rounded-2xl "
              />
            </div>
          </div>
          <div className="w-full h-[314px] bg-white-4 rounded-2xl p-4">
            <div className="w-full h-full bg-white-8 rounded-3xl relative">
              {" "}
              <Image
                src={"/images/collection_3.png"}
                alt={"/images/collection_3.png"}
                fill
                className="object-cover rounded-2xl "
              />
            </div>
          </div>
        </div>
        <div className="md:basis-[33%] flex flex-col gap-1">
          <div className="w-full h-[314px] bg-white-4 rounded-2xl p-4">
            <div className="w-full h-full bg-white-8 rounded-3xl relative">
              {" "}
              <Image
                src={"/images/collection_3.png"}
                alt={"/images/collection_3.png"}
                fill
                className="object-cover rounded-2xl "
              />
            </div>
          </div>
          <div className="w-full h-[378px] bg-white-4 rounded-2xl p-4">
            <div className="w-full h-full bg-white-8 rounded-3xl relative">
              {" "}
              <Image
                src={"/images/collection_4.png"}
                alt={"/images/collection_4.png"}
                fill
                className="object-cover rounded-2xl "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
