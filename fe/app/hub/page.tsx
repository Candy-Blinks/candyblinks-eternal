"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Footer from "@/components/footer";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useMount from "@/hooks/useMount";
import { ChevronDown, Search } from "lucide-react";
export default function Hub() {
  const mounted = useMount();
  const { fetchMyCandyStores } = useLaunchpadProgram();

  if (!mounted) {
    return <></>;
  }
  return (
    <>
      <Navbar />
      <div className="w-full flex items-start justify-center min-h-dvh">
        <div className="max-w-[1280px] w-full flex flex-col gap-8">
          <div className="w-full flex justify-between items-center">
            <p className={cn("ty-h4")}>Creators Hub</p>

            <div className="flex items-center gap-2">
              <Button className={cn("bg-white-4")}>Create Collection</Button>
              <Button className={cn("bg-pink-100")}>Delete</Button>
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-4 bg-white-4 p-2 rounded-lg">
              <p
                className={cn(
                  "ty-subtitle text-white-50 bg-pink-100 p-1 rounded"
                )}
              >
                All
              </p>
              <p className={cn("ty-subtitle text-white-50 p-1 rounded")}>
                Fully Minted
              </p>
              <p className={cn("ty-subtitle text-white-50 p-1 rounded")}>
                Not Fully Minted
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className={cn("bg-white-4")}>
                    Sort By <ChevronDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
              <div className="max-w-[150px] flex items-center gap-1 bg-white-4 shadow-lg rounded-lg border border-white-4 py-1 px-2">
                <Search size={16} />

                <Input
                  className={cn(
                    "w-full h-full placeholder:ty-descriptions text-white-32 bg-transparent"
                  )}
                  placeholder="Search by name"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {fetchMyCandyStores?.data?.map((candyStore: any) => {
              return (
                <CandyStoreCard
                  jsonUrl={candyStore.url}
                  key={candyStore.address}
                  publicKey={candyStore.address}
                  numberOfItems={candyStore.numberOfItems}
                  name={candyStore.name}
                  minted={candyStore.minted}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
interface ICandyStoreCardProps {
  jsonUrl: string;
  publicKey: string;
  name: string;
  minted: number;
  numberOfItems: number;
}

function CandyStoreCard({
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
  });

  if (data?.image == "") {
    return <></>;
  }

  const rawMintPercentage = (Number(minted) / Number(numberOfItems)) * 100
  const mintPercentage = rawMintPercentage % 1 === 0 ? rawMintPercentage.toFixed(0) : rawMintPercentage.toFixed(2)


  return (
    <Link
      href={`/hub/${publicKey}`}
      key={publicKey}
      className="p-3 basis-[19.50%] gap-2 bg-white-4 rounded-lg shadow-lg flex flex-col w-fit items-center cursor-pointer hover:shadow-pink-600/50 hover:border-pink-600 transition duration-200 ease-in-out"
    >
      <div className="h-[180px] w-[180px] bg-red-200 rounded-2xl relative">
        <Image
          src={data?.image}
          alt={data?.image}
          fill
          className="object-cover rounded-2xl"
        ></Image>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className={cn("ty-title")}>{name}</div>
        <div className={cn("ty-subtitle text-white-80")}>{data?.symbol}</div>
        <Progress value={(Number(minted) / Number(numberOfItems)) * 100} />

        <div className="flex justify-between">
          <p className={cn("ty-subtext text-white-80")}>
            {mintPercentage}% Minted
          </p>

          <p className={cn("ty-subtext text-white-50")}>
            ({Number(minted)}/{Number(numberOfItems)})
          </p>
        </div>
      </div>
    </Link>
  );
}
