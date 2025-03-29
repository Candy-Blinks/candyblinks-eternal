"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, findCandyStorePda, formatUnixTimestamp } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon, UsersRound, Wallet } from "lucide-react";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import { useStore } from "@/store/store";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  IPhaseEditorSchema,
  IPhaseFormSchema,
  PhaseEditorSchema,
  PhaseEditorSchemaDefaults,
  PhaseFormSchema,
  PhaseFormSchemaDefaults,
} from "@/lib/schemas/edit_phase.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker24h } from "./datetime-picker";
import { BN } from "@coral-xyz/anchor";
import AddPhaseForm from "./add-phase-form";
import EditPhaseForm from "./edit-phase-form";
import CurrentPhases from "./current-phases";
import DateTimePicker from "./date-time-picker";
import NewChanges from "./new-changes";

interface PhaseEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PhaseEditorDialog({
  open,
  onOpenChange,
}: PhaseEditorDialogProps) {
  const { hubCandyStore, hubCollection, hubPhases, setHubPhases } = useStore();

  const form = useForm<IPhaseEditorSchema>({
    resolver: zodResolver(PhaseEditorSchema),
    defaultValues: PhaseEditorSchemaDefaults,
  });

  useEffect(() => {
    form.setValue(
      "phases",
      hubPhases.map((phase: any) => {
        return {
          label: phase.label,
          endDate: {
            enabled: phase.endDate != null,
            timestamp: new Date(),
          },
          startDate: {
            enabled: phase.startDate != null,
            timestamp: new Date(),
          },
          solPayment: {
            enabled: phase.solPayment != null,
            user:
              phase.solPayment?.user != null
                ? phase.solPayment.user
                : undefined,
            amount:
              phase.solPayment?.amount != null ? phase.solPayment.amount : 1,
          },
          allocation: {
            enabled: phase.allocation != null,
            id:
              phase.allocation?.allocationId != null
                ? phase.allocation?.allocationId
                : undefined,
            limit: phase.allocation?.limit != null ? phase.allocation.limit : 1,
          },
          mintLimit: {
            enabled: phase.mintLimit != null,
            id:
              phase.mintLimit?.mintLimitId != null
                ? phase.mintLimit?.mintLimitId
                : undefined,
            limit: phase.mintLimit?.limit != null ? phase.mintLimit.limit : 1,
          },
        };
      })
    );
  }, [hubPhases, form.setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[840px] bg-black-100">
        <DialogHeader>
          <DialogTitle>
            <p className={cn("ty-h6 text-white-100")}>Phase Editor</p>
          </DialogTitle>
          <DialogDescription className="w-full">
            <FormProvider {...form}>
              <div className="flex w-full gap-4">
                {/*  */}

                <div className="flex flex-col gap-1 basis-[49.50%]">
                  {form.watch("editPhaseForm") ? (
                    <EditPhaseForm />
                  ) : (
                    <AddPhaseForm />
                  )}

                  <NewChanges />
                </div>

                <CurrentPhases />
              </div>
            </FormProvider>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
