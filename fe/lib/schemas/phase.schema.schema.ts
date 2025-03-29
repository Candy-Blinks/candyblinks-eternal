import { z } from "zod";

export const PhaseSchema = z.object({
  label: z.string().min(2).max(50),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  solPayment: z.number().optional(),
  mintLimit: z.number().optional(),
  allocation: z.number().optional(),
});

export type IPhaseSchema = z.infer<typeof PhaseSchema>;

export const PhaseSchemaDefaults: IPhaseSchema = {
  label: "",
};
