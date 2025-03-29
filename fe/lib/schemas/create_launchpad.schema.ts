import { z } from "zod";
import { validSolanaAddress } from "./shared";

export const RoyaltiesSchema = z.object({
  shares: z.string().regex(/^\d+$/, "Shares must be a number"),
  wallet: validSolanaAddress,
});
// URL_REGEX
export const CollectionInformationSchema = z.object({
  collectionName: z.string().min(2).max(50),
  collectionSymbol: z.string().min(2).max(5),
  collectionDescription: z.string().min(2).max(250),
  website: z.string().min(2).max(50),
  tg: z.string(),
  x: z.string(),
  yt: z.string(),
  ig: z.string(),
  discord: z.string(),
  freezeCollection: z.boolean(),
  royalties: z.array(RoyaltiesSchema),
});

export type ICollectionInformationSchema = z.infer<
  typeof CollectionInformationSchema
>;

export const CollectionInformationSchemaDefaults: ICollectionInformationSchema =
  {
    collectionName: "",
    collectionSymbol: "",
    collectionDescription: "",
    website: "",
    tg: "",
    x: "",
    yt: "",
    ig: "",
    discord: "",
    freezeCollection: false,
    royalties: [],
  };
