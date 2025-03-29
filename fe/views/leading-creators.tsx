"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CreatorCard from "./creator-card";
import { useQuery } from "@tanstack/react-query";
import { API_INSTANCE } from "@/lib/api";

export default function LeadingCreators() {
  const { data: users } = useQuery({
    queryFn: async () => {
      const {
        data: { data },
      } = await API_INSTANCE.get("users");
      return data;
    },
    queryKey: ["users"],
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <p className={cn("ty-h4 text-white-100")}>Leading nft creators</p>
        <p className={cn("ty-title text-white-50 underline")}>View All</p>
      </div>

      <Carousel>
        <CarouselContent>
          {users?.map((user: any) => {
            return (
              <CarouselItem key={user?.address} className="basis-1/4">
                <CreatorCard
                  address={user?.address}
                  created={user?.created ?? 0}
                  followers={user?.followers}
                  sold={user?.sold}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
