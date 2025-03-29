"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ICollectionInformationSchema } from "@/lib/schemas/create_launchpad.schema";

import { useStore } from "@/store/store";
import { cn, findCandyStorePda } from "@/lib/utils";
import WorldIcon from "@/components/icons/world";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PINATA_GATEWAY } from "@/lib/constants";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import { Keypair, PublicKey } from "@solana/web3.js";
import LoadingDialog from "./loading-dialog";
import SuccessDialog from "./success-dialog";
import { useRouter } from "next/navigation";
import { API_INSTANCE } from "@/lib/api";

export default function CollectionOverview() {
  const { control, watch, getValues, reset } =
    useFormContext<ICollectionInformationSchema>();
  const {
    imageManifestId,
    jsonManifestId,
    collectionBanner,
    createUploadedImages,
    setCreatePage,
    createPage,
    resetCreatePage,
  } = useStore();

  const { push } = useRouter();

  const { createCandyStore } = useLaunchpadProgram();

  const collectionImage = useMemo(
    () =>
      `${PINATA_GATEWAY}ipfs/${imageManifestId}/collection.${
        createUploadedImages[0].name.split(".")[1]
      }`,
    [imageManifestId]
  );

  const { data: collectionJson } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${PINATA_GATEWAY}ipfs/${jsonManifestId}/collection.json`
      );

      console.log(data);

      return data;
    },
    queryKey: [
      "json",
      `${PINATA_GATEWAY}ipfs/${imageManifestId}/collection.json`,
    ],
  });

  const { fields } = useFieldArray({
    control,
    name: "royalties",
  });

  const [openLoading, setOpenLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    if (!createCandyStore?.isPending || createCandyStore?.isError) {
      setOpenLoading(false);
    }
  }, [createCandyStore?.isError, createCandyStore?.isPending]);

  useEffect(() => {
    if (createCandyStore?.isSuccess) {
      setOpenSuccess(true);
    }
  }, [createCandyStore?.isSuccess, resetCreatePage, reset]);

  const onProceed = async () => {
    setOpenLoading(true);
    const collectionKeypair = Keypair.generate();
    const candyStorePda = findCandyStorePda(collectionKeypair.publicKey);

    createCandyStore?.mutate({
      signers: {
        collection: collectionKeypair,
      },
      accounts: {
        collection: collectionKeypair.publicKey,
        candyStore: candyStorePda,
      },
      args: {
        creators: fields.map((creator) => {
          return {
            address: new PublicKey(creator.wallet),
            percentage: Number(creator.shares),
          };
        }),
        name: getValues("collectionName") ?? "",
        url: `${PINATA_GATEWAY}ipfs/${jsonManifestId}`,
        manifestId: jsonManifestId ?? "",
        numberOfItems: createUploadedImages.length - 1,
        description: getValues("collectionDescription"),
        tg: getValues("tg"),
        x: getValues("x"),
        yt: getValues("yt"),
        discord: getValues("discord"),
        website: getValues("website"),
        banner: collectionBanner ?? "",
      },
    });
  };

  useEffect(() => {
    console.log(createCandyStore?.error);
  }, [createCandyStore?.error]);

  return (
    <>
      <LoadingDialog
        title="Deploying"
        open={openLoading}
        onOpenChange={setOpenLoading}
      />
      <SuccessDialog
        title="Collection successfully deployed!"
        open={openSuccess}
        onOpenChange={setOpenSuccess}
        onContinue={() => {
          reset();
          resetCreatePage();
          push("/hub");
        }}
      />

      <div className="w-full p-8 flex flex-col gap-8 bg-white-4 shadow-lg rounded-lg border border-white-4">
        <p className="text-white-100 text-[20px] ty-h6">Collection Overview</p>
        {collectionBanner ? (
          <div className="w-full min-h-[200px] h-full bg-red-200 rounded-[32px] relative">
            <Image
              src={`${PINATA_GATEWAY}ipfs/${collectionBanner}`}
              alt={`${PINATA_GATEWAY}ipfs/${collectionBanner}`}
              fill
              blurDataURL="/images/placeholder.png"
              className="object-cover rounded-2xl"
            />
          </div>
        ) : (
          <div className="w-full min-h-[200px] h-full bg-red-200 rounded-2xl"></div>
        )}

        <div className="w-full flex">
          <div className="w-full flex flex-col gap-12 p-4">
            <div className="flex relative gap-4">
              <div className="w-[150px] h-[150px] bg-gray-700 rounded-2xl absolute bottom-[-20px] left-2">
                <div className="relative w-full h-full rounded-2xl">
                  <Image
                    src={
                      collectionImage
                        ? collectionImage
                        : "/images/sm-placeholder.png"
                    }
                    alt={collectionImage}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="basis-[40%]"></div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-1">
                  <p className={cn("ty-h6")}>{watch("collectionName")}</p>
                  <p className={cn("ty-subheading")}>
                    {watch("collectionSymbol")}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setCreatePage(0);
                  }}
                  className="flex items-center gap-1"
                >
                  <Pencil />
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 p-4">
                <p className={cn("ty-subtitle")}>About the Collection</p>
                <p className={cn("ty-descriptions")}>
                  {watch("collectionDescription")}
                </p>
              </div>
              <div className="flex gap-4 p-4">
                <div className="flex gap-1">
                  <WorldIcon />

                  <div className="flex flex-col gap-1">
                    <p className={cn("ty-subtitle")}>Website</p>
                    <p className={cn("ty-descriptions underline")}>
                      {watch("website")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <WorldIcon />

                  <div className="flex flex-col gap-1">
                    <p className={cn("ty-subtitle")}>Socials and Community</p>
                    <div className="flex items-center gap-2">
                      <Link href={watch("discord")} target="_blank">
                        <WorldIcon />
                      </Link>

                      <Link href={watch("yt")} target="_blank">
                        <WorldIcon />
                      </Link>

                      <Link href={watch("tg")} target="_blank">
                        <WorldIcon />
                      </Link>

                      <Link href={watch("ig")} target="_blank">
                        <WorldIcon />
                      </Link>

                      <Link href={watch("x")} target="_blank">
                        <WorldIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4">
                <p className={cn("ty-title")}>Secondary Royalties</p>

                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between gap-4">
                    <div className="basis-[10%]">
                      <p className={cn("ty-subtitle")}>Shares</p>
                    </div>
                    <div className="w-full">
                      <p className={cn("ty-subtitle")}>Wallet Address</p>
                    </div>
                  </div>

                  {fields.map((e) => {
                    return (
                      <div
                        key={e.id}
                        className="w-full flex justify-between gap-4"
                      >
                        <div className="basis-[10%] p-2 bg-black-50">
                          <p className={cn("ty-subtext")}>{e.shares}%</p>
                        </div>
                        <div className="w-full p-2 bg-black-50">
                          <p className={cn("ty-subtext")}>{e.wallet}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[50%] w-[267px] flex flex-col gap-4 p-4 items-center content-center">
            <div className="w-full flex justify-between items-center">
              <p className={cn("ty-h6 text-[16px]")}>Collection NFT</p>
              <Button
                onClick={() => {
                  setCreatePage(1);
                }}
                className="flex items-center gap-1"
              >
                <Pencil />
                Edit
              </Button>
            </div>

            <div className="p-4 flex flex-col items-center gap-4 rounded-xl bg-white-4 w-[235px]">
              <div className="w-[200px] h-[200px] bg-white-16 rounded-2xl relative">
                <Image
                  src={
                    collectionImage
                      ? collectionImage
                      : "/images/placeholder.png"
                  }
                  alt={collectionImage}
                  fill
                  blurDataURL="/images/placeholder.png"
                  className="object-cover rounded-[8px] size-full"
                />
              </div>

              {/* {JSON.stringify(collectionJson)} */}
              <div className="flex flex-col gap-1 w-full">
                <p className={cn("ty-title text-white-100")}>
                  {" "}
                  {collectionJson?.symbol}
                </p>
                <p className={cn("ty-subtext text-white-100")}>
                  {collectionJson?.name}
                </p>
                {/* <p className={cn("ty-subtext text-white-100")}>5 Attributes</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            onClick={() => {
              setCreatePage(createPage - 1);
            }}
          >
            Back
          </Button>
          <Button
            className="text-xl bg-pink-32 hover:bg-red-500 text-white dm-sans font-bold h-[30px] w-[95] rounded-[4px]"
            onClick={onProceed}
          >
            <span className="text-sm">Deploy</span>
          </Button>
        </div>
      </div>
    </>
  );
}
