import { z } from "zod";
import { validSolanaAddress } from "./shared";

export const StartDateFormSchema = z.object({
  enabled: z.boolean(),
  timestamp: z.date().optional(),
});

export const EndDateFormSchema = z.object({
  enabled: z.boolean(),
  timestamp: z.date().optional(),
});

export const SolPaymentFormSchema = z.object({
  user: validSolanaAddress,
  amount: z.coerce.number(),
});

export const MintLimitFormSchema = z.object({
  id: z.coerce.number(),
  limit: z.coerce.number(),
});

export const AllocationFormSchema = z.object({
  id: z.coerce.number(),
  limit: z.coerce.number(),
});

export const PhaseFormSchema = z.object({
  label: z.string().min(2).max(50),
  // startDate: StartDateFormSchema,
  // endDate: EndDateFormSchema,
  // solPayment: SolPaymentFormSchema,
  // mintLimit: MintLimitFormSchema,
  // allocation: AllocationFormSchema,
});

export type IPhaseFormSchema = z.infer<typeof PhaseFormSchema>;

export const PhaseFormSchemaDefaults: IPhaseFormSchema = {
  label: "",
  // startDate: {
  //   enabled: false,
  //   timestamp: new Date(),
  // },
  // endDate: {
  //   enabled: false,
  //   timestamp: new Date(),
  // },
  // solPayment: {
  //   user: "",
  //   amount: 0,
  // },
  // mintLimit: {
  //   id: 0,
  //   limit: 0,
  // },
  // allocation: {
  //   id: 0,
  //   limit: 0,
  // },
};
