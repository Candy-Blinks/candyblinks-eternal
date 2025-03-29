import { SOLANA_ADDRESS_REGEX } from "../regex";
import { z } from "zod";

export const validSolanaAddress = z
  .string()
  .regex(SOLANA_ADDRESS_REGEX, "Must be a valid solana address");
