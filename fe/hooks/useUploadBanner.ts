import { useMutation } from "@tanstack/react-query";
import { PINATA } from "@/lib/constants";

interface IUploadBannerArgs {
  image: File;
}

// TODO: Hide this from client side. People can see the secrets in console logs
export default function useUploadBanner() {
  const mutation = useMutation({
    mutationFn: async ({ image }: IUploadBannerArgs) => {
      return await PINATA.upload.file(image);
    },
  });
  return { ...mutation };
}
