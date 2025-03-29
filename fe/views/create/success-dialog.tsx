"use client";
import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";

interface SuccessDialogProps {
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  onContinue?: () => void;
}

export default function SuccessDialog({
  open,
  title,
  onOpenChange,
  onContinue,
}: SuccessDialogProps) {
  const { setCreatePage, createPage } = useStore();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[330px]">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center gap-4 ">
            <Image
              src={`/gif/success.gif`}
              alt="logo"
              width={100}
              height={100}
              className="object-cover object-center rounded-xl"
            />

            <p className={cn("ty-descriptions text-white-100")}>{title}</p>

            <Button
              onClick={
                onContinue ??
                (() => {
                  setCreatePage(createPage + 1);
                })
              }
              className="ty-title bg-pink-32 hover:bg-red-500 text-white-100 dm-sans font-bold h-[30px] w-full rounded-[4px]"
            >
              Continue
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
