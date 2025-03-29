import { useMutation } from "@tanstack/react-query";
import { PINATA } from "@/lib/constants";

interface IUploadJsonArgs {
  json: File[];
}

// TODO: Hide this from client side. People can see the secrets in console logs
export default function useUploadJson() {
  const mutation = useMutation({
    mutationFn: async ({ json }: IUploadJsonArgs) => {
      return await PINATA.upload.fileArray(json);
    },
  });

  return { ...mutation };
}
