import { z } from "zod";

export const CreateCollectionSchema = z.object({
  collectionName: z.string().min(2).max(50),
  collectionSymbol: z.string().min(2).max(5),
  collectionDescription: z.string().min(2).max(50),
  isFreezeCollection: z.boolean(),
  isAutoPostX: z.boolean(),
  isAutoPostDiscord: z.boolean(),
  royalties: z
    .array(
      z.object({
        shares: z.string().regex(/^\d+$/, "Shares must be a number"),
        wallet: z.string().min(2, "Wallet address is required"),
      })
    )
    .optional(),
  mintSplits: z
    .array(
      z.object({
        shares: z.string().regex(/^\d+$/, "Shares must be a number"),
        wallet: z.string().min(2, "Wallet address is required"),
      })
    )
    .optional(),
});

export type ICreateCollectionSchema = z.infer<typeof CreateCollectionSchema>;

export const CreateCollectionSchemaDefaults: ICreateCollectionSchema = {
  collectionName: "",
  collectionSymbol: "",
  collectionDescription: "",
  isFreezeCollection: false,
  isAutoPostX: false,
  isAutoPostDiscord: false,
  royalties: [{ shares: "", wallet: "" }],
  mintSplits: [{ shares: "", wallet: "" }],
};
