"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import CandyStoreCard from "./candy-store-card";
import Link from "next/link";

export default function NewNftCollections() {
  const { fetchAllCandyStores } = useLaunchpadProgram();

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <p className={cn("ty-h4 text-white-100")}>New NFT Collections</p>

        <Link href="/new-collections">
          <p className={cn("ty-title text-white-50 underline")}>View All</p>
        </Link>
      </div>

      <Carousel>
        <CarouselContent>
          {fetchAllCandyStores.data?.map((candyStore: any) => {
            console.log(candyStore);

            return (
              <CarouselItem key={candyStore.address} className="basis-1/4">
                <CandyStoreCard
                  jsonUrl={candyStore.url}
                  key={candyStore.address}
                  publicKey={candyStore.address}
                  numberOfItems={candyStore.numberOfItems}
                  name={candyStore.name}
                  minted={candyStore.minted}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
