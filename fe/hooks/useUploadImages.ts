import { useMutation } from "@tanstack/react-query";
import { PINATA } from "@/lib/constants";

interface IUploadImagesArgs {
  images: File[];
}

// TODO: Hide this from client side. People can see the secrets in console logs
export default function useUploadImages() {
  const mutation = useMutation({
    mutationFn: async ({ images }: IUploadImagesArgs) => {
      return await PINATA.upload.fileArray(images);
    },
  });
  return { ...mutation };
}
