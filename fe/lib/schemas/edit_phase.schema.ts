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
  enabled: z.boolean().optional(),
  user: validSolanaAddress.optional(),
  amount: z.coerce.number().positive().optional(),
});

export const MintLimitFormSchema = z.object({
  id: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  enabled: z.boolean().optional(),
});

export const AllocationFormSchema = z.object({
  id: z.coerce.number().optional(),
  enabled: z.boolean().optional(),
  limit: z.coerce.number().optional(),
});

export const PhaseFormSchema = z.object({
  label: z.string().min(2).max(10),
  startDate: StartDateFormSchema,
  endDate: EndDateFormSchema,
  mintLimit: MintLimitFormSchema,
  solPayment: SolPaymentFormSchema,
  allocation: AllocationFormSchema,
});

export type IPhaseFormSchema = z.infer<typeof PhaseFormSchema>;

export const PhaseFormSchemaDefaults: IPhaseFormSchema = {
  label: "",
  startDate: {
    enabled: false,
    timestamp: new Date(),
  },
  endDate: {
    enabled: false,
    timestamp: new Date(),
  },
  solPayment: {
    enabled: false,
    user: undefined,
    amount: 1,
  },
  mintLimit: {
    enabled: false,
    id: undefined,
    limit: 1,
  },
  allocation: {
    enabled: false,
    id: undefined,
    limit: 1,
  },
};

export const PhaseEditorSchema = z.object({
  phases: z.array(PhaseFormSchema),
  createPhaseForm: PhaseFormSchema,
  editPhaseForm: PhaseFormSchema.optional(),
  editPhaseFormId: z.number().optional(),
});

export type IPhaseEditorSchema = z.infer<typeof PhaseEditorSchema>;

export const PhaseEditorSchemaDefaults: IPhaseEditorSchema = {
  phases: [],
  createPhaseForm: PhaseFormSchemaDefaults,
  editPhaseForm: undefined,
  editPhaseFormId: undefined,
};
