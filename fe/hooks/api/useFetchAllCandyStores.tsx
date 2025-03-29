import { useQuery } from "@tanstack/react-query";

import { API_INSTANCE } from "@/lib/api";

export default function useFetchAllCandyStores() {
  return useQuery({
    queryKey: ["candy-stores"],
    queryFn: async () => {
      const {
        data: { data },
      } = await API_INSTANCE.get(`candy-stores`);
      return data;
    },
  });
}
