"use client";
import React, { useEffect, useState } from "react";

import Navbar from "@/components/navbar";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, Globe, Search, Twitter, Users } from "lucide-react";

import Footer from "@/components/footer";
import useFetchCandyStore from "@/hooks/api/useFetchCandyStore";
import useFetchMetadata from "@/hooks/useFetchMetadata";
import Link from "next/link";
import PhaseEditorDialog from "@/views/hub/phase-editor-dialog";
import { useStore } from "@/store/store";
// import useFetchUserTransactions from "@/hooks/programs/useFetchUserTransactions";

export default function Hub() {
  const params = useParams();

  // const { data } = useFetchUserTransactions({
  //   userAddress: params?.id ? (params?.id as string) : undefined,
  // });

  const { data: candyStore } = useFetchCandyStore({
    candyStoreAddress: params?.id as string,
  });

  const { data: collectionMetadata } = useFetchMetadata({
    url: candyStore?.url ? `${candyStore?.url}/collection.json` : undefined,
  });

  const { setHubPhases } = useStore();

  const [openPhaseEditor, setOpenPhaseEditor] = useState(false);

  useEffect(() => {
    setHubPhases(candyStore?.phases ?? []);
  }, [setHubPhases, candyStore?.phases]);

  return (
    <>
      <Navbar />
      <PhaseEditorDialog
        open={openPhaseEditor}
        onOpenChange={setOpenPhaseEditor}
      />
      <div className="w-full flex items-start justify-center min-h-dvh">
        <div className="max-w-[1280px] w-full flex flex-col gap-8">
          <div className="w-full bg-white-4 border border-white-8 p-8 rounded-xl flex flex-col gap-8">
            <div className="w-full max-h-[196px] h-[196px] bg-white-8 rounded-3xl relative">
              <Image
                src={"/images/banner.jpeg"}
                alt={"/images/banner.jpeg"}
                fill
                className="object-cover rounded-2xl "
              ></Image>
            </div>
            {/* DETAILS */}

            <div className="flex justify-between gap-16">
              <div className="basis-[50%] flex flex-col gap-8">
                <div className="flex gap-4 relative">
                  <div className="w-[150px] h-[150px] bg-red-50 absolute bottom-0 left-0 rounded-2xl ">
                    <div className="h-full w-full relative">
                      <Image
                        src={
                          collectionMetadata?.image
                            ? collectionMetadata?.image
                            : "/images/cmb/collection.png"
                        }
                        alt={
                          collectionMetadata?.image
                            ? collectionMetadata?.image
                            : "/images/cmb/collection.png"
                        }
                        fill
                        className="object-cover rounded-2xl "
                      />
                    </div>
                  </div>
                  <div className="w-[200px]"></div>

                  <div className="w-full flex justify-between">
                    <div className="flex flex-col gap-2">
                      <p className={cn("ty-h6 text-white-100")}>
                        {candyStore?.name ? candyStore?.name : "Undefined"}
                      </p>
                      <p className={cn("ty-subheading text-white-50")}>
                        {collectionMetadata?.symbol
                          ? collectionMetadata?.symbol
                          : "Undefined"}
                      </p>
                    </div>

                    <Button>Follow</Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className={cn("ty-subtitle text-white-100")}>Bio</p>

                    {/* <Button className="flex items-center gap-4">
                      <Pencil size={5} />
                      <p className={cn("ty-title text-white-80")}>Edit</p>
                    </Button> */}
                  </div>
                  <p className={cn("ty-descriptions text-white-50")}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eum sit exercitationem repellendus earum reprehenderit fuga
                    officiis facere, modi molestiae tenetur aliquam? Tenetur,
                    amet a aperiam eius quia dolorum assumenda provident!
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <div className="p-2">
                      <Globe size={16} />
                    </div>
                    <div className="flex flex-col">
                      <p className={cn("ty-subtitle text-white-50")}>Website</p>
                      {candyStore?.website && (
                        <Link href={candyStore?.website} target="_blank">
                          <p
                            className={cn(
                              "ty-descriptions text-white-100 underline"
                            )}
                          >
                            {candyStore?.website
                              ? candyStore?.website
                              : "Undefined"}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="p-2">
                      <Users size={16} />
                    </div>
                    <div className="flex flex-col">
                      <p className={cn("ty-subtitle text-white-50")}>
                        Socials and Community
                      </p>

                      <div className="flex items-center gap-4">
                        {candyStore?.x && (
                          <Link href={candyStore?.x} target="_blank">
                            <Twitter size={16} />
                          </Link>
                        )}

                        {candyStore?.ig && (
                          <Link href={candyStore?.ig} target="_blank">
                            <Twitter size={16} />
                          </Link>
                        )}

                        {candyStore?.tg && (
                          <Link href={candyStore?.tg} target="_blank">
                            <Twitter size={16} />
                          </Link>
                        )}

                        {candyStore?.discord && (
                          <Link href={candyStore?.discord} target="_blank">
                            <Twitter size={16} />
                          </Link>
                        )}

                        {candyStore?.yt && (
                          <Link href={candyStore?.yt} target="_blank">
                            <Twitter size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="basis-[50%] flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="w-full rounded-3xl border border-white-4 flex flex-col gap-4 p-4">
                    <div className="flex w-full justify-between p-4 bg-white-16 rounded-xl">
                      <p className={cn("ty-descriptions text-white-100 ")}>
                        Multiplier
                      </p>
                      <p className={cn("ty-title text-white-100 ")}>0.5x</p>
                    </div>

                    <div className="flex w-full justify-between">
                      <p className={cn("ty-subtitle text-white-50 ")}>
                        Candy Stores Created
                      </p>
                      <p className={cn("ty-title text-white-100 ")}>5</p>
                    </div>

                    <div className="flex w-full justify-between">
                      <p className={cn("ty-subtitle text-white-50 ")}>
                        CMB Hold
                      </p>
                      <p className={cn("ty-title text-white-100 ")}>5</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className={cn("ty-subtitle text-white-50 ")}>
                        Candy Store Mints
                      </p>
                      <p className={cn("ty-title text-white-100 ")}>36</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className={cn("ty-h4 text-white-100")}>John Doe’s Candy Store</p>
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
                  Minted
                </p>
                <p className={cn("ty-subtitle text-white-50 p-1 rounded")}>
                  Not Minted
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
              {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => {
                return (
                  <NftCard
                    jsonUrl={candyStore?.url}
                    key={value}
                    number={value - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

interface INftCardProps {
  jsonUrl?: string;
  number: number;
}

function NftCard({ jsonUrl, number }: INftCardProps) {
  const { data } = useFetchMetadata({
    url: jsonUrl ? `${jsonUrl}/${number}.json` : undefined,
  });

  if (data?.image == "") {
    return <></>;
  }

  return <></>;
  return (
    <div className="p-3 basis-[19.4%] gap-2 bg-white-4 rounded-lg shadow-lg flex flex-col w-fit items-center cursor-pointer hover:shadow-pink-600/50 hover:border-pink-600 transition duration-200 ease-in-out">
      <div className="p-1 w-full flex items-center justify-center bg-black-4">
        <div className="h-[180px] w-[180px] bg-red-200 rounded-2xl relative">
          <Image
            src={data?.image ?? null}
            alt={data?.image ?? null}
            fill
            className="object-cover rounded-2xl"
          ></Image>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className={cn("ty-title")}>{data?.name}</div>
        <div className={cn("ty-subtitle text-white-80")}>{data?.symbol}</div>
      </div>
    </div>
  );
}
