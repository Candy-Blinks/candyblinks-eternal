"use client";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface ICandyStoreCardProps {
  jsonUrl: string;
  publicKey: string;
  name: string;
  minted: number;
  numberOfItems: number;
}

export default function CandyStoreCard({
  jsonUrl,
  publicKey,
  name,
  minted,
  numberOfItems,
}: ICandyStoreCardProps) {
  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${jsonUrl}/collection.json`);
      return data;
    },
    queryKey: ["url", jsonUrl],
    enabled: !!jsonUrl,
  });

  if (data?.image == "") {
    return <></>;
  }

  const rawMintPercentage = (Number(minted) / Number(numberOfItems)) * 100
  const mintPercentage = rawMintPercentage % 1 === 0 ? rawMintPercentage.toFixed(0) : rawMintPercentage.toFixed(2)

  return (
    <Link
      href={`/store/${publicKey}`}
      key={publicKey}
      className=" bg-white-4 rounded-lg shadow-lg cursor-pointer hover:shadow-pink-600/50 hover:border-pink-600 transition duration-200 ease-in-out"
    >
      <div className="w-full flex flex-col gap-4 bg-white-4 p-4 rounded-2xl">
        <div className="w-full h-[250px] rounded-3xl bg-white-8 p-4 flex items-center justify-center">
          <div className="h-[230px] w-[230px] bg-red-200 rounded-2xl relative">
            {data?.image && (
              <Image
                src={data?.image}
                alt={data?.image}
                fill
                className="object-cover rounded-2xl"
              />
            )}
          </div>
        </div>
        <div className="w-full flex gap-4 just">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={data?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <p className={cn("ty-title text-white-100")}>{name}</p>
            <p className={cn("ty-descriptions text-white-100 underline")}>
              {data?.symbol}
            </p>
          </div>
        </div>

        <div className="p-2 flex flex-col bg-white-4 rounded-lg gap-1">
          <Progress
            className=" w-full"
            value={(Number(minted) / Number(numberOfItems)) * 100}
          />

          <div className="w-full flex items-center justify-between">
            <p className={cn("ty-subtext text-white-80 ")}>
              {" "}
              {mintPercentage}% Minted
            </p>

            <p className={cn("ty-subtext text-white-50 ")}>
              {" "}
              ({Number(minted)}/{Number(numberOfItems)})
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
