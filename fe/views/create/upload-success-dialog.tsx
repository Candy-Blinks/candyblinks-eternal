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

interface UploadSuccessProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadSuccess({
  open,
  onOpenChange,
}: UploadSuccessProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[330px]">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center gap-4 ">
            <p className={cn("ty-title text-white-80")}>Uploading Images</p>
            <Image
              src={`/gif/loading.gif`}
              alt="logo"
              width={100}
              height={100}
              className="object-cover object-center rounded-xl"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
