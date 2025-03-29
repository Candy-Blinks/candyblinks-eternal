"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { ICollectionInformationSchema } from "@/lib/schemas/create_launchpad.schema";

interface ViewAssetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewAssetsDialog({
  open,
  onOpenChange,
}: ViewAssetsDialogProps) {
  const { createUploadedJson, createUploadedImages } = useStore();
  const { control, trigger, getValues } =
    useFormContext<ICollectionInformationSchema>();

  const assets = useMemo(() => {
    const temp: any[] = [];
    for (let i: number = 0; i < createUploadedJson.length; i++) {
      const tempJson = createUploadedJson[i];
      const jsonFileName = tempJson.fileName.split(".")[0];
      const tempImage = createUploadedImages.find((image) => {
        return image.name.split(".")[0] == jsonFileName;
      });

      if (!tempImage) {
        continue;
      }

      temp.push({
        imageFile: tempImage,
        ...tempJson.data,
      });
    }

    return temp;
  }, [createUploadedJson, createUploadedImages]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[1100px] bg-white-4 border border-white-8 rounded-[16px]">
        <DialogHeader>
          <DialogTitle className="text-white-50">Uploaded</DialogTitle>
        </DialogHeader>

        {/* TODO: Make it scrollable */}
        <DialogDescription className="grid grid-cols-5 w-full gap-4 overflow-y-auto max-h-[600px] pe-2">
          {assets.map((e) => {
            return (
              <div
                key={URL.createObjectURL(e.imageFile)}
                className="cursor-default p-4 flex flex-col gap-4 rounded-[16px] bg-white-8 items-center"
              >
                <Image
                  src={URL.createObjectURL(e.imageFile)}
                  alt="logo"
                  width={150}
                  height={150}
                  className="object-cover object-center rounded-xl"
                />

                <div className="w-full flex flex-col gap-1">
                  <p className={cn("ty-title text-white-100")}>{e.name}</p>
                  <p className={cn("ty-subtext text-white-50")}>
                    {getValues("collectionName")}
                  </p>{" "}
                  <p className={cn("ty-subtext text-white-50")}>
                    {e.attributes.length} Attributes
                  </p>
                </div>
              </div>
            );
          })}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
