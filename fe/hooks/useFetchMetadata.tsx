import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IUseFetchMetadata {
  url?: string;
}
export default function useFetchMetadata({ url }: IUseFetchMetadata) {
  const { ...query } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(url!);
      return data;
    },
    queryKey: ["url", url],
    enabled: !!url,
  });

  return { ...query };
}
