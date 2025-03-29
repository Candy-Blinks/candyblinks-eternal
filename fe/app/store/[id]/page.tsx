"use client";
import { Button } from "@/components/ui/button";
// import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { Progress } from "@/components/ui/progress";

import Footer from "@/components/footer";
import { cn, formatUnixTimestamp, truncateAddress } from "@/lib/utils";
import { useParams } from "next/navigation";
import useFetchCandyStore from "@/hooks/api/useFetchCandyStore";
import useFetchMetadata from "@/hooks/useFetchMetadata";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useStore } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_INSTANCE } from "@/lib/api";
import MintedAssets from "@/views/store/minted-assets";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Store() {
  const params = useParams();

  const { mintPhases, setMintPhases, setMintCurrentPhase, mintCurrentPhase } =
    useStore();

  const { wallet } = useLaunchpadProgram();

  const { mintAsset } = useLaunchpadProgram();
  const { data: candyStore } = useFetchCandyStore({
    candyStoreAddress: params?.id as string,
  });

  const { data: assets } = useQuery({
    queryFn: async () => {
      const {
        data: { data },
      } = await API_INSTANCE.get(`assets/collection/${candyStore?.collection}`);

      return data ?? [];
    },
    enabled: !!candyStore?.collection,
    queryKey: ["assets", candyStore?.collection],
  });

  const { data: comments } = useQuery({
    queryFn: async () => {
      const {
        data: { data },
      } = await API_INSTANCE.get(
        `candy-store-comments/candy-store/${candyStore?.address}`
      );

      return data ?? [];
    },
    enabled: !!candyStore?.address,
    queryKey: ["comments", candyStore?.address],
  });

  const queryClient = useQueryClient();
  const [currentComment, setCurrentComment] = useState("");

  const { mutate: comment } = useMutation({
    mutationFn: async ({ candyStore, user, data }: any) => {
      if (data.trim() != "") {
        await API_INSTANCE.post("candy-store-comments", {
          candyStore,
          user,
          data,
        });
      }
    },
    onSuccess: () => {
      setCurrentComment("");
      queryClient.invalidateQueries();
    },
  });

  const onComment = () => {
    comment({
      candyStore: candyStore?.address,
      user: wallet?.publicKey?.toString(),
      data: currentComment,
    });
  };

  const { data: collectionMetadata } = useFetchMetadata({
    url: candyStore?.url ? `${candyStore?.url}/collection.json` : undefined,
  });

  useEffect(() => {
    console.log(candyStore);
  }, [candyStore]);

  useEffect(() => {
    const tempPhases = candyStore?.phases ?? [];

    if (tempPhases.length > 0) {
      setMintPhases(tempPhases);
      setMintCurrentPhase(tempPhases?.[0]?.label);
    }
  }, [setMintPhases, candyStore?.phases, setMintCurrentPhase]);

  // interface IMintArgs {
  //   signers: {
  //     asset: Keypair;
  //   };
  //   accounts: {
  //     collection: PublicKey;
  //     candyStore: PublicKey;
  //     solPaymentUser?: PublicKey;
  //     settings: PublicKey;
  //     treasuryWallet: PublicKey;
  //     minter?: PublicKey;
  //   };
  //   args: {
  //     label: string;
  //   };
  // }

  const onMint = () => {
    const assetKeypair = Keypair.generate();
    mintAsset.mutate({
      signers: {
        asset: assetKeypair,
      },
      accounts: {
        asset: assetKeypair.publicKey,
        collection: new PublicKey(candyStore?.collection),
        candyStore: new PublicKey(params?.id as string),
      },
      args: {
        label: mintCurrentPhase as string,
      },
    });
  };

  useEffect(() => {
    console.log(mintAsset?.error);
  }, [mintAsset?.error]);

  return (
    <>
      <Navbar />

      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1280px] w-full flex flex-col gap-32">
          <div className="w-full flex flex-col gap-16 items-center">
            <div className="w-full flex justify-center gap-8">
              <div className="basis-[50%] flex flex-col items-center">
                <div className="w-full flex items-center justify-center">
                  <div className="w-[460px] h-[460px]  rounded-3xl relative">
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
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full p-4">
                  <Progress
                    className=" w-full"
                    value={
                      (candyStore?.minted ??
                        0 / candyStore?.numberOfItems ??
                        0) * 10
                    }
                  />
                  <div className="flex items-center justify-between">
                    <p className={cn("ty-h6 text-white-80 ")}>
                      {(candyStore?.minted ??
                        0 / candyStore?.numberOfItems ??
                        0) * 10}
                      % minted
                    </p>

                    <p className={cn("ty-h6 text-white-50 ")}>
                      {candyStore?.minted ?? 0} /{" "}
                      {candyStore?.numberOfItems ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  {Array.from({ length: 3 }, (_, i) => i + 1).map((value) => {
                    return (
                      <NftImage
                        jsonUrl={candyStore?.url}
                        key={value}
                        number={value - 1}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="basis-[50%] flex flex-col gap-4">
                <p className={cn("ty-h3 text-white-100")}>Candy Mob Business</p>
                <div className="flex items-center gap-4 bg-white-4 p-2 rounded-lg w-fit">
                  <p
                    className={cn(
                      "ty-subtitle text-white-100 bg-pink-100 p-1 rounded"
                    )}
                  >
                    Phases
                  </p>
                  <p className={cn("ty-subtitle text-white-50 p-1 rounded")}>
                    About
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  {mintPhases?.map((phase: any) => {
                    return (
                      <div
                        key={phase.label}
                        onClick={() => {
                          setMintCurrentPhase(phase.label);
                        }}
                        className={cn(
                          "w-full p-4 flex flex-col gap-2 bg-white-4 border border-white-4",
                          mintCurrentPhase == phase.label
                            ? "border border-pink-32"
                            : ""
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <p className={cn("ty-title text-white-100")}>
                            {phase.label}
                          </p>

                          <div className="flex flex-col items-end gap-1">
                            {phase.startDate && (
                              <p className={cn("ty-subtext text-white-100")}>
                                Start{" "}
                                {formatUnixTimestamp(phase.startDate.timestamp)}
                              </p>
                            )}

                            {phase.endDate && (
                              <p className={cn("ty-subtext text-white-100")}>
                                End{" "}
                                {formatUnixTimestamp(phase.endDate.timestamp)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className={cn("ty-subtext text-white-50")}>
                            {phase.mintLimit
                              ? `Max mint: ${phase.mintLimit.limit} per wallet`
                              : ""}
                          </p>
                          <p className={cn("ty-subtext text-white-100")}>
                            {phase.solPayment
                              ? `SOL ${
                                  phase.solPayment.amount / LAMPORTS_PER_SOL
                                }`
                              : "FREE"}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <Button
                    onClick={onMint}
                    className="my-3 w-full text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-400"
                  >
                    Mint
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <p className={cn("ty-h4 text-white-100")}>Recently minted NFTs</p>
            </div>

            <div className="w-full flex flex-wrap gap-1">
              {assets?.map((asset: any) => (
                <MintedAssets
                  key={asset.address}
                  metadata={asset?.metadata}
                  address={asset?.address}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <p className={cn("ty-h4 text-white-100")}>Comments</p>
            </div>

            <div className="-w-full flex items-center justify-between p-4 gap-4 bg-white-4 rounded-xl">
              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Input
                className={cn("bg-transparent")}
                placeholder={
                  wallet?.publicKey
                    ? "Add a comment"
                    : "Connect wallet to comment"
                }
                value={currentComment}
                onChange={(e) => {
                  setCurrentComment(e.target.value);
                }}
              ></Input>

              {wallet?.publicKey ? (
                <Button
                  disabled={wallet?.publicKey == undefined}
                  onClick={onComment}
                >
                  Send
                </Button>
              ) : <></>}
            </div>

            {comments?.map((comment: any) => {
              return (
                <div
                  key={comment?.id}
                  className="flex gap-4 p-4  bg-white-4 rounded-xl"
                >
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="w-full flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <p className={cn("ty-title text-white-50")}>
                          {truncateAddress(comment?.user)}
                        </p>
                        <p className={cn("ty-descriptions text-white-50")}>
                          9 minutes ago
                        </p>
                      </div>
                      <div className="flex items-center gap-">
                        <p className={cn("ty-title text-white-50")}>HEART</p>
                        <p className={cn("ty-title text-white-50")}>0</p>
                      </div>
                    </div>

                    <p className={cn("ty-subtext text-white-50 h-fit w-fit")}>
                      {comment?.data}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* <div className="w-full flex flex-wrap gap-1">
              {assets?.map((asset: any) => (
                <MintedAssets
                  key={asset.address}
                  metadata={asset?.metadata}
                  address={asset?.address}
                />
              ))}
            </div> */}
          </div>

          <div className="w-full flex flex-col gap-16 items-center h-[510px] justify-center">
            <div className="flex flex-col gap-4 items-center">
              <p className={cn("ty-h2 text-white-100")}>
                Candy Store NFTs are in high demand!
              </p>
              <p className={cn("ty-h2 text-white-100")}>Create yours now!</p>
            </div>

            <Button className={cn("bg-red-400 hover:bg-red-500 ty-title")}>
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
interface INftImageProps {
  jsonUrl?: string;
  number: number;
}

function NftImage({ jsonUrl, number }: INftImageProps) {
  const { data } = useFetchMetadata({
    url: jsonUrl ? `${jsonUrl}/${number}.json` : undefined,
  });

  if (data?.image == "") {
    return <></>;
  }
  return (
    <div className="w-[150px] h-[150px] bg-white-4 rounded-3xl relative">
      <Image
        src={data?.image ?? "/images/cmb/3.png"}
        alt={data?.image ?? "/images/cmb/3.png"}
        fill
        className="object-cover rounded-2xl"
      />
    </div>
  );
}

// function PhaseCard() {
//   return (
//     <div className="w-full p-4 flex flex-col gap-2 bg-white-4 rounded-lg">
//       <div className="flex items-center justify-between">
//         <p className={cn("ty-title text-white-100")}>Whitelist</p>
//       </div>

//       <div className="flex items-center justify-between">
//         <p className={cn("ty-subtext text-white-50")}>Max mint 1 per wallet </p>
//         <p className={cn("ty-subtext text-white-100")}>2.10 SOL</p>
//       </div>
//     </div>
//   );
// }
