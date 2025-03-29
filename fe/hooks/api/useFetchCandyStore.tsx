import { API_URL } from "@/lib/constants";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface IUseFetchCandyStore {
  candyStoreAddress?: string;
}

export default function useFetchCandyStore({
  candyStoreAddress,
}: IUseFetchCandyStore) {
  const { setHubCandyStore, setHubCollection } = useStore();

  const query = useQuery({
    queryKey: ["candy-store", candyStoreAddress],
    queryFn: async () => {
      const {
        data: { data },
      } = await axios.get(`${API_URL}candy-stores/${candyStoreAddress}`);

      const response = data?.[0];

      if (!response) {
        throw Error("No response");
      }

      if (!candyStoreAddress) {
        throw Error("No Candy Store Address");
      }

      if (!response?.collection) {
        throw Error("No Collection address");
      }

      setHubCandyStore(candyStoreAddress);
      setHubCollection(response?.collection);

      return data?.[0];
    },
    enabled: !!candyStoreAddress,
  });

  return {
    ...query,
  };
}
