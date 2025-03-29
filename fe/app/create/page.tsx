"use client";

import React from "react";

import Navbar from "@/components/navbar";
import CollectionInformationForm from "@/views/create/collection-information-form";
import UploadForm from "@/views/create/upload-form";
import Footer from "@/components/footer";
import FormStepper from "@/views/create/form-stepper";
import { useStore } from "@/store/store";
import {
  CollectionInformationSchema,
  CollectionInformationSchemaDefaults,
} from "@/lib/schemas/create_launchpad.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import CollectionOverview from "@/views/create/collection-overview";

const ANY = z.object({});

type ANY = z.infer<typeof ANY>;

const resolvers = [
  {
    schema: zodResolver(CollectionInformationSchema),
    default: CollectionInformationSchemaDefaults,
  },
  {
    schema: zodResolver(ANY),
    default: {},
  },
  {
    schema: zodResolver(ANY),
    default: {},
  },
];

export default function Create() {
  const { createPage } = useStore();

  const methods = useForm({
    mode: "all",
    resolver: resolvers[createPage].schema,
    defaultValues: {
      ...CollectionInformationSchemaDefaults,
    },
  });

  return (
    <>
      <Navbar />
      <div className="w-full flex items-start justify-center min-h-dvh">
        <div className="max-w-[1280px] w-full flex flex-col gap-8">
          <div className="w-full gap-4 flex justify-between">
            <div className="w-full max-w-[330px]">
              <FormStepper />
            </div>

            <FormProvider {...methods}>
              {createPage === 0 && <CollectionInformationForm />}
              {createPage === 1 && <UploadForm />}
              {createPage === 2 && <CollectionOverview />}
            </FormProvider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
