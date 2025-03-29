"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/views/hero-section";
import FeaturedCollection from "@/views/feature-collection";
import NewNftCollections from "@/views/new-nft-collections";
import AlmostMintedCollections from "@/views/almost-minted-collections";
import LeadingCreators from "@/views/leading-creators";
import ExploreCollections from "@/views/explore-collections";
import GetStarted from "@/views/get-started";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1280px] w-full flex flex-col gap-32">
          <HeroSection />
          <FeaturedCollection />
          <NewNftCollections />
          <AlmostMintedCollections />
          <LeadingCreators />
          <ExploreCollections />
          <GetStarted />
        </div>
      </div>
      <Footer />
    </>
  );
}
