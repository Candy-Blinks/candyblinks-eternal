"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GetStarted from "@/views/get-started";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import CandyStoreCard from "@/views/new-collections/candy-store-card";
import { cn } from "@/lib/utils";

export default function NewCollections() {
  const { fetchAllCandyStores } = useLaunchpadProgram();

  return (
    <>
      <Navbar />
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1280px] w-full flex flex-col gap-16">
          <div className="w-full flex items-center justify-center">
            <p className={cn("ty-h2 text-white-100")}>New NFT Collections</p>
          </div>

          <div className="w-full flex flex-wrap gap-4">
            {fetchAllCandyStores.data?.map((candyStore: any) => {
              return (
                <div key={candyStore.address} className="basis-[24%]">
                  <CandyStoreCard
                    jsonUrl={candyStore.url}
                    key={candyStore.address}
                    publicKey={candyStore.address}
                    numberOfItems={candyStore.numberOfItems}
                    name={candyStore.name}
                    minted={candyStore.minted}
                  />
                </div>
              );
            })}
          </div>

          <GetStarted />
        </div>
      </div>
      <Footer />
    </>
  );
}
