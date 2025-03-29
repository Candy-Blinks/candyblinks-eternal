import { cn } from "@/lib/utils";
import React from "react";

export default function HeroSection() {
  return (
    <div className="w-full flex flex-col gap-16 items-center">
      <div className="flex flex-col gap-4 items-center">
        <p className={cn("ty-h2 text-white-100")}>CandyBlinks Launchpad</p>
        <p className={cn("ty-title text-white-100")}>
          Launch your own candy store by using our candy creator.
        </p>
      </div>

      {/* <div className="flex justify-center gap-16 items-center">
        <div className="flex flex-col gap-4 items-center">
          <p className={cn("ty-h4 text-white-100")}>100</p>
          <p className={cn("ty-descriptions text-white-100")}>Nft’s Minted</p>
        </div>

        <div className="h-[62px] p-[0.5px] w-[0.5px] bg-white-50"></div>

        <div className="flex flex-col gap-4 items-center">
          <p className={cn("ty-h4 text-white-100")}>100</p>
          <p className={cn("ty-descriptions text-white-100")}>Nft’s Minted</p>
        </div>
        <div className="h-[62px] p-[0.5px] w-[0.5px] bg-white-50"></div>

        <div className="flex flex-col gap-4 items-center">
          <p className={cn("ty-h4 text-white-100")}>100</p>
          <p className={cn("ty-descriptions text-white-100")}>Nft’s Minted</p>
        </div>
        <div className="h-[62px] p-[0.5px] w-[0.5px] bg-white-50"></div>

        <div className="flex flex-col gap-4 items-center">
          <p className={cn("ty-h4 text-white-100")}>100</p>
          <p className={cn("ty-descriptions text-white-100")}>Nft’s Minted</p>
        </div>
      </div> */}
    </div>
  );
}
