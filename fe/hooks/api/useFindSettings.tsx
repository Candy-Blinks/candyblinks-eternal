import { useQuery } from "@tanstack/react-query";

import { API_INSTANCE } from "@/lib/api";

export default function useFindSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const {
        data: { data },
      } = await API_INSTANCE.get(`settings`);

      return data?.[0];
    },
  });
}
