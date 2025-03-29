import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface IUseFetchUserTransactions {
  userAddress?: string;
}

export default function useFetchUserTransactions({
  userAddress,
}: IUseFetchUserTransactions) {
  const query = useQuery({
    queryKey: ["user-transactions", userAddress],
    queryFn: async () => {
      const {
        data: { data },
      } = await axios.get(`${API_URL}/transactions/users/${userAddress}`);

      return data;
    },
    enabled: !!userAddress,
  });

  return {
    ...query,
  };
}
