"use client";
import React, { useMemo } from "react";
import { cn, findCandyStorePda } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useLaunchpadProgram from "@/hooks/programs/useLaunchpadProgram";
import { useStore } from "@/store/store";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useFormContext } from "react-hook-form";
import { IPhaseEditorSchema } from "@/lib/schemas/edit_phase.schema";
import { BN } from "@coral-xyz/anchor";

export default function NewChanges() {
  const { hubCandyStore, hubCollection, hubPhases, setHubPhases } = useStore();

  const form = useFormContext<IPhaseEditorSchema>();
  const { updatePhases } = useLaunchpadProgram();

  const newChanges = useMemo(() => {
    if (form.watch("phases").length != hubPhases.length) {
      return true;
    }

    for (const hubPhase of hubPhases) {
      const tempPhase = form
        .watch("phases")
        .find((field) => field.label == hubPhase.label);

      if (!tempPhase) {
        return true;
      }
    }

    return false;
  }, [form.watch("phases"), hubPhases]);
  const onSave = () => {
    if (
      [
        ...new Set<string>([
          ...form.getValues("phases").map((phase) => phase.label),
        ]),
      ].length != form.getValues("phases").map((phase) => phase.label).length
    ) {
      console.log("Same Labels");

      return;
    }

    const tempPhases: any[] = [];

    for (const phase of form.getValues("phases")) {
      let tempPhase: any = {
        label: phase.label,
        startDate: null,
        endDate: null,
        solPayment: null,
        allocation: null,
        mintLimit: null,
        allowList: null,
      };

      if (phase.startDate.enabled) {
        const startDate = phase.startDate.timestamp?.getTime() ?? Date.now();
        tempPhase = {
          ...tempPhase,
          startDate: {
            timestamp: new BN(Math.floor(startDate / 1000)),
          },
        };
      }

      if (phase.endDate.enabled) {
        const endDate = phase.endDate.timestamp?.getTime() ?? Date.now();
        tempPhase = {
          ...tempPhase,
          endDate: {
            timestamp: new BN(Math.floor(endDate / 1000)),
          },
        };
      }

      if (phase.mintLimit.enabled) {
        tempPhase = {
          ...tempPhase,
          mintLimit: {
            // TODO: Check if ID is already created
            id: new BN(1),
            limit: new BN(phase.mintLimit.limit),
          },
        };
      }

      if (phase.allocation.enabled) {
        tempPhase = {
          ...tempPhase,
          allocation: {
            // TODO: Check if ID is already created
            id: new BN(1),
            limit: new BN(phase.allocation.limit),
          },
        };
      }

      if (phase.solPayment.enabled) {
        console.log("Sol Payment", Number(phase.solPayment.amount ?? 0));
        console.log(
          "Sol Payment",
          (Number(phase.solPayment.amount ?? 0) * LAMPORTS_PER_SOL).toFixed(0)
        );

        tempPhase = {
          ...tempPhase,
          solPayment: {
            user: new PublicKey(phase.solPayment.user!),
            amount: new BN(
              (Number(phase.solPayment.amount ?? 0) * LAMPORTS_PER_SOL).toFixed(
                0
              )
            ),
          },
        };
      }

      tempPhases.push(tempPhase);
    }

    if (hubCandyStore && hubCollection) {
      const candyStorePDA = findCandyStorePda(new PublicKey(hubCollection));

      console.log(candyStorePDA.toString());
      console.log(hubCandyStore.toString());

      updatePhases.mutate({
        signers: {},
        accounts: {
          candyStore: candyStorePDA,
          collection: new PublicKey(hubCollection),
        },
        args: {
          phases: [...tempPhases],
        },
      });
    }
  };
  return (
    <>
      {newChanges && (
        <div className="w-full flex items-center justify-between p-4">
          <p className={cn("ty-descriptions text-white-100 bg-transparent")}>
            You have unsave changes!
          </p>

          <div className="flex items-center gap-1">
            <Button
              className={cn("ty-title text-white-100 bg-transparent")}
              onClick={() => {
                form.setValue("phases", hubPhases);
              }}
            >
              Reset
            </Button>
            <Button
              className={cn("ty-title text-white-100 bg-pink-100")}
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
