"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import DragDropArea from "@/views/create/upload-assets";
import { useStore } from "@/store/store";
import useUseUploadMetadata from "@/hooks/useUploadMetadata";
import LoadingDialog from "./loading-dialog";
import ViewAssetsDialog from "./view-assets-dialog";
import SuccessDialog from "./success-dialog";
import { cn } from "@/lib/utils";

export default function UploadForm() {
  const {
    createUploadedJson,
    createUploadedImages,
    setImageManifestId,
    setJsonManifestId,
    setCreatePage,
    createPage,
  } = useStore();
  const {
    mutate: upload,
    data: uploadData,
    isError: uploadIsError,
    isPending: uploadIsPending,
    isSuccess: uploadIsSuccess,
  } = useUseUploadMetadata();

  useEffect(() => {
    console.log(uploadData);
  }, [uploadData]);

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

  const [openLoading, setOpenLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openViewAssets, setOpenViewAssets] = useState(false);

  useEffect(() => {
    if (!uploadIsPending || uploadIsError) {
      setOpenLoading(false);
    }
  }, [uploadIsError, uploadIsPending]);

  useEffect(() => {
    if (uploadIsSuccess) {
      setImageManifestId(uploadData.images);
      setJsonManifestId(uploadData.json);
      setOpenSuccess(true);
    }
  }, [uploadIsSuccess, uploadData]);

  const onNext = () => {
    setOpenLoading(true);
    upload({ images: createUploadedImages, json: createUploadedJson });
  };

  return (
    <>
      <LoadingDialog
        title="Uploading Images"
        open={openLoading}
        onOpenChange={setOpenLoading}
      />
      <SuccessDialog
        title="Collection successfully uploaded!"
        open={openSuccess}
        onOpenChange={setOpenSuccess}
      />

      <ViewAssetsDialog
        open={openViewAssets}
        onOpenChange={setOpenViewAssets}
      />

      <div className="w-full p-4 flex flex-col gap-8 bg-white-4 shadow-lg rounded-lg border border-white-4">
        <div className="w-ful flex items-center justify-between">
          <p className="text-white-100 ty-h6 font-extrabold">Upload</p>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row justify-between">
            <p className="ty-title pb-[10px]">Upload Assets</p>

            <div
              onClick={() => {
                setOpenViewAssets(true);
              }}
              className="flex gap-1 items-center"
            >
              <p className="ty-title cursor-pointer text-white-50 pb-[10px] underline">
                View all assets
              </p>
              <p className="ty-title text-white-50 pb-[10px]">
                ({assets.length})
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <DragDropArea />
          </div>

          <div className="w-full flex items-start justify-start pt-4 flex-col gap-[4px]">
            <p className={cn("ty-descriptions text-white-50 text-[14px]")}>
              Drag and drop your assets folder with images and a metadata folder
              containing matching JSON files.
            </p>
            {/* <p
              className={cn(
                "ty-descriptions text-white-50 pb-[10px] text-[14px]"
              )}
            >
              Metadata is optional. To include it provide JSON files with
              matching file names.
            </p> */}
            <p
              className={cn(
                "ty-descriptions text-white-50 pb-[10px] text-[14px]"
              )}
            >
              Download&nbsp;
              <a
                href="/cmb_assets.zip"
                download="cmb_assets.zip"
                className="underline"
              >
                Example Assets
              </a>
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-start"></div>

        <div className="w-full flex items-center justify-end gap-4">
          <Button
            onClick={() => {
              setCreatePage(createPage - 1);
            }}
          >
            Back
          </Button>
          <Button
            className="text-xl bg-pink-32 hover:bg-red-500 text-white dm-sans font-bold h-[30px] w-[95] rounded-[4px]"
            onClick={onNext}
          >
            <span className="text-sm">Next</span>
          </Button>
        </div>
      </div>
    </>
  );
}
