import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import useUploadImages from "./useUploadImages";
import useUploadJson from "./useUploadJson";
import { jsonToFile } from "@/lib/utils";
import { PINATA_GATEWAY } from "@/lib/constants";

interface IUseUploadMetadataArgs {
  images: File[];
  json: any[];
}

// TODO: Hide this from client side. People can see the secrets in console logs
export default function useUseUploadMetadata() {
  const { mutateAsync: uploadImagesAsync } = useUploadImages();
  const { mutateAsync: uploadJsonAsync } = useUploadJson();

  const mutation = useMutation({
    mutationFn: async ({ images, json }: IUseUploadMetadataArgs) => {
      const imageUpload = await uploadImagesAsync({ images });

      const baseImageUrl = `${PINATA_GATEWAY}ipfs/${imageUpload.IpfsHash}/`;

      const tempJsonFiles: File[] = [];
      for (let i: number = 0; i < images.length; i++) {
        const tempImage = images[i];

        const imageFileName = tempImage.name.split(".")[0];

        const tempJson = json.find((j) => {
          return j.fileName.split(".")[0] == imageFileName;
        });

        if (!tempJson) {
          continue;
        }

        tempJsonFiles.push(
          jsonToFile(
            {
              ...tempJson?.data,
              image: `${baseImageUrl}${tempImage.name}`,
            },
            `${imageFileName}.json`
          )
        );
      }

      const jsonUpload = await uploadJsonAsync({ json: tempJsonFiles });
      return { json: jsonUpload.IpfsHash, images: imageUpload.IpfsHash };
    },
  });

  useEffect(() => {
    console.log(mutation.error);
  }, [mutation.error]);

  return { ...mutation };
}
