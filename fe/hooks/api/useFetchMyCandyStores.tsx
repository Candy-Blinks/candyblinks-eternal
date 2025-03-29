import { useQuery } from "@tanstack/react-query";

import { API_INSTANCE } from "@/lib/api";
import { AnchorWallet } from "@solana/wallet-adapter-react";

interface IUseFetchMyCandyStoresProps {
  wallet: AnchorWallet | undefined;
}

export default function useFetchMyCandyStores({
  wallet,
}: IUseFetchMyCandyStoresProps) {
  return useQuery({
    queryKey: ["candy-store", wallet],
    queryFn: async () => {
      // TODO: Make this server side
      const {
        data: { data },
      } = await API_INSTANCE.get(
        `candy-stores/users/${wallet?.publicKey.toString()}`
      );

      return data.filter((e: any) => e.owner == wallet?.publicKey.toString());
    },
    enabled: !!wallet,
  });
}
