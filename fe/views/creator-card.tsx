"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn, truncateAddress } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ICreatorCardProps {
  address: string;
  followers: number;
  created: number;
  sold: number;
}

export default function CreatorCard({
  address,
  followers,
  created,
  sold,
}: ICreatorCardProps) {
  return (
    <div className="w-full flex flex-col rounded-3xl gap-4 bg-white-4">
      <div className="rounded-tr-3xl rounded-tl-3xl w-full h-[90px] bg-white-4 relative">
        <Image
          src={"/images/collection_3.png"}
          alt={"/images/collection_3.png"}
          fill
          className="object-cover rounded-2xl "
        />
      </div>

      <div className="w-full flex items-center justify-between p-2">
        <div className="flex items-center gap-4">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p className={cn("ty-title text-white-100")}>
            {truncateAddress(address)}
          </p>
        </div>

        <Link href={`/user/${address}`}>
          <Button>View</Button>
        </Link>
      </div>

      <div className="rounded-br-3xl rounded-bl-3xl w-full flex items-center bg-white-8 justify-evenly p-4">
        <div className="flex flex-col gap-2">
          <p className={cn("ty-title text-white-100")}>Created</p>
          <p className={cn("ty-subtext text-white-50")}>{created}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className={cn("ty-title text-white-100")}>Sold</p>
          <p className={cn("ty-subtext text-white-50")}>{sold} SOL</p>
        </div>{" "}
        <div className="flex flex-col gap-2">
          <p className={cn("ty-title text-white-100")}>Followers</p>
          <p className={cn("ty-subtext text-white-50")}>{followers}</p>
        </div>
      </div>
    </div>
  );
}
