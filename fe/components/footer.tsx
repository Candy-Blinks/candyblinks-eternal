import Image from "next/image";
import { ASSETS_URL } from "@/lib/constants";

import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center mt-10 p-4">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src={`${ASSETS_URL}logo.png`}
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <span className="ty- text-pink-32 font-semibold dm-sans md:block hidden">
            CandyBlinks
          </span>
        </div>
        <p className={cn("ty-descriptions text-white-50")}>
          © Copyright 2025, All Rights Reserved by Sweet Studios
        </p>
        <div className="flex items-center gap-4">
          <div className="rounded-full h-4 w-4 bg-white-4">X</div>

          <div className="rounded-full h-4 w-4 bg-white-4">X</div>

          <div className="rounded-full h-4 w-4 bg-white-4">X</div>
          <div className="rounded-full h-4 w-4 bg-white-4">X</div>
        </div>
      </div>
    </footer>
  );
}
