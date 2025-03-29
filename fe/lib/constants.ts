import { publicKey } from "@metaplex-foundation/umi";
import { PinataSDK } from "pinata-web3";

export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ?? "";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const TREASURY_PUBLIC_KEY = publicKey(
  process.env.NEXT_PUBLIC_TREASURY ?? ""
);

export const CANDY_MACHINE_PUBLIC_KEY = publicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE ?? ""
);

export const COLLECTION_PUBLIC_KEY = publicKey(
  process.env.NEXT_PUBLIC_COLLECTION ?? ""
);

export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "staging";

export const ASSETS_URL =
  "https://raw.githubusercontent.com/Candy-Blinks/assets/refs/heads/main/";

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY ?? "";
export const MONGO_CONNECTION = process.env.NEXT_PUBLIC_MONGO_CONNECTION ?? "";
export const SIGNING_MESSAGE =
  process.env.NEXT_PUBLIC_SIGNING_MESSAGE ?? "TEST";

export const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT ?? "TEST";
export const PINATA_GATEWAY =
  process.env.NEXT_PUBLIC_PINATA_GATEWAY ?? "https://gateway.pinit.io/";

export const PINATA = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});
