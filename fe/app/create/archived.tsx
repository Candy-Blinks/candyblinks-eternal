// "use client";
// import {
//   CreateCollectionSchema,
//   CreateCollectionSchemaDefaults,
//   ICreateCollectionSchema,
// } from "@/lib/schemas/create_collection.schema";
// // import React, { useCallback } from "react";
// import React, { useCallback, useEffect, useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// // import useCreateCollection from "@/hooks/dapp/useCreateCollection";
// import useCreateCandyMachine from "@/hooks/dapp/useCreateCandyMachine";
// import useCreateCandyStore from "@/hooks/dapp/useCreateCandyStore";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";

// import { resetFileName } from "@/lib/utils";
// import useFetchCandyStores from "@/hooks/dapp/useFetchCandyStores";
// import Navbar from "@/components/navbar";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { useStore } from "@/store/store";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import Footer from "@/components/footer";
// import ProgressStepper from "@/views/create/progress-stepper";
// import { FolderUp } from "lucide-react";

// export default function Create() {
//   const form = useForm<ICreateCollectionSchema>({
//     resolver: zodResolver(CreateCollectionSchema),
//     defaultValues: CreateCollectionSchemaDefaults,
//   });

//   const page = useStore((state) => state.page);

//   // const { mutate: createCollection } = useCreateCollection();
//   const { mutate: createCandyMachine } = useCreateCandyMachine();

//   const { data: candyStores } = useFetchCandyStores();
//   const { mutate: createCandyStore } = useCreateCandyStore();

//   const [metadata, setmetadata] = useState<any[]>([]);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setmetadata([]);

//     const tempImages = acceptedFiles.filter((e) => e.type === "image/png");

//     const tempMetadata = acceptedFiles.filter(
//       (e) => e.type === "application/json"
//     );

//     let temp: any[] = [];

//     tempMetadata.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         try {
//           const fileContent = event.target?.result;

//           if (fileContent) {
//             const parsedData = JSON.parse(fileContent as string);

//             setmetadata((state) => [
//               ...state,
//               {
//                 ...parsedData,
//                 fileImage: tempImages.find(
//                   (e) => e.name == `${file.name.split(".")[0]}.png`
//                 ),
//               },
//             ]);
//           }
//         } catch (error) {
//           console.error("Error parsing JSON file:", error);
//         }
//       };

//       reader.onerror = (error) => {
//         console.error("Error reading file:", error);
//       };

//       reader.readAsText(file);
//     });

//     console.log(temp);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//   });

//   function onSubmit(values: ICreateCollectionSchema) {
//     const resetted = metadata.map((e: any) => {
//       return resetFileName(
//         e.fileImage as File,
//         e.fileImage.name,
//         e.fileImage.type
//       );
//     }) as File[];

//     createCandyStore({
//       name: values.collectionName,
//       images: resetted,
//       metadata: metadata,
//     });
//   }

//   useEffect(() => {
//     console.log(form.formState);
//   }, [form.formState]);

//   const {
//     fields: royaltyFields,
//     append: appendRoyalty,
//     remove: removeRoyalty,
//   } = useFieldArray({
//     control: form.control,
//     name: "royalties",
//   });

//   const {
//     fields: mintSplitFields,
//     append: appendMintSplit,
//     remove: removeMintSplit,
//   } = useFieldArray({
//     control: form.control,
//     name: "mintSplits",
//   });

//   const setPage = useStore((state) => state.setPage);

//   const onNext = async () => {
//     const fieldsToValidate =
//       page === 0
//         ? ["collectionName", "collectionSymbol", "collectionDescription"]
//         : page === 1
//         ? ["royalties", "mintSplits"]
//         : [];

//     const stepValid = await form.trigger(
//       fieldsToValidate as (
//         | "collectionName"
//         | "collectionSymbol"
//         | "collectionDescription"
//         | "isFreezeCollection"
//         | "isAutoPostX"
//         | "isAutoPostDiscord"
//         | "royalties"
//         | "mintSplits"
//         | `royalties.${number}`
//         | `royalties.${number}.shares`
//         | `royalties.${number}.wallet`
//         | `mintSplits.${number}`
//         | `mintSplits.${number}.shares`
//       )[]
//     );

//     console.log("Validation result:", stepValid);
//     if (!stepValid) {
//       console.error("Form validation failed:", form.getValues());
//       console.error("Errors:", form.formState.errors);
//     } else {
//       setPage(page + 1);
//     }
//   };

//   const onPrevious = async () => {
//     setPage(page - 1);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="w-full flex items-start justify-center min-h-dvh">
//         <div className="max-w-[1280px] w-full flex flex-col gap-8">
//           <div className="text-2xl text-white">Create Candy Store</div>
//           <ProgressStepper currentPage={page} />
//           <Form {...form}>
//             {page === 0 && (
//               <div className="flex flex-col gap-8">
//                 <p className="text-xl">Store Details</p>
//                 <div className="w-full flex items-center justify-between gap-4">
//                   <FormField
//                     control={form.control}
//                     name="collectionName"
//                     render={({ field }) => (
//                       <FormItem className="basis-[50%]">
//                         <FormLabel>Collection Name</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter Collection Name"
//                             className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 h-12"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="collectionSymbol"
//                     render={({ field }) => (
//                       <FormItem className="basis-[50%]">
//                         <FormLabel>Symbol</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter Symbol"
//                             className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 h-12"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="collectionDescription"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Enter Collection Description"
//                           className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 min-h-36 max-h-36"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="flex flex-col gap-4">
//                   <p className="text-xl">Additionals</p>
//                   <div className="flex items-center gap-2">
//                     <Switch className="bg-neutral-900 text-white border-neutral-800" />
//                     <p>Freeze Collection</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Switch className="bg-neutral-900 text-white border-neutral-800" />
//                     <p>Auto post on X as Blinks</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Switch className="bg-neutral-900 text-white border-neutral-800" />
//                     <p>Auto post on Discord as Blinks</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-center">
//                   <Button
//                     onClick={onNext}
//                     className="w-full text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {page === 1 && (
//               <div className="flex flex-col gap-4">
//                 {/* Secondary Royalties */}
//                 <p className="text-xl">Secondary Royalties</p>
//                 {royaltyFields.map((field, index) => (
//                   <div key={field.id} className="flex items-end gap-4">
//                     <div className="w-[30%] flex items-center gap-2">
//                       <FormField
//                         control={form.control}
//                         name={`royalties.${index}.shares`}
//                         render={({ field }) => (
//                           <FormItem className="w-full">
//                             <FormLabel>Shares</FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Shares (%)"
//                                 className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 h-12"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="w-[70%]">
//                       <FormField
//                         control={form.control}
//                         name={`royalties.${index}.wallet`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Wallet Address</FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Enter Wallet Address"
//                                 className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 h-12"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     {index > 0 && (
//                       <Button
//                         onClick={() => removeRoyalty(index)}
//                         className="text-white bg-red-500 hover:bg-red-600 border-neutral-800 border-2 h-12"
//                       >
//                         Delete
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button
//                   onClick={() => appendRoyalty({ shares: "", wallet: "" })}
//                   className="text-white bg-red-400 hover:bg-red-500"
//                 >
//                   Add Royalty Split
//                 </Button>

//                 {/* Mint Split Funds */}
//                 <p className="text-xl mt-5">Mint Split Funds</p>
//                 {mintSplitFields.map((field, index) => (
//                   <div key={field.id} className="flex items-end gap-4">
//                     <div className="w-[30%] flex items-center gap-2">
//                       <FormField
//                         control={form.control}
//                         name={`mintSplits.${index}.shares`}
//                         render={({ field }) => (
//                           <FormItem className="w-full">
//                             <FormLabel>Shares</FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Shares (%)"
//                                 className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 h-12"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="w-[70%]">
//                       <FormField
//                         control={form.control}
//                         name={`mintSplits.${index}.wallet`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Wallet Address</FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Enter Wallet Address"
//                                 className="bg-neutral-900 text-white focus-visible:border-neutral-700 border-neutral-800 border-2 h-12"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     {index > 0 && (
//                       <Button
//                         onClick={() => removeMintSplit(index)}
//                         className="text-white bg-red-500 hover:bg-red-600 border-neutral-800 border-2 h-12"
//                       >
//                         Delete
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button
//                   onClick={() => appendMintSplit({ shares: "", wallet: "" })}
//                   className="text-white bg-red-400 hover:bg-red-500"
//                 >
//                   Add Mint Split
//                 </Button>

//                 {/* Navigation Buttons */}
//                 <div className="mt-5 flex items-center justify-center gap-4">
//                   <Button
//                     onClick={onPrevious}
//                     className="w-full text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     onClick={onNext}
//                     className="w-full text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {page === 2 && (
//               <div className="flex flex-col gap-4">
//                 <p className="text-xl">Upload Assets</p>
//                 <div
//                   {...getRootProps()}
//                   className="flex min-h-[300px] items-center p-8 gap-8 bg-neutral-800 rounded-lg shadow-lg  border-gray-600 border-2 border-dotted justify-center"
//                 >
//                   <FolderUp size={25} />
//                   <p className="text-lg">
//                     Click here or Drag and Drop your assets
//                   </p>
//                   <Input
//                     type="file"
//                     {...getInputProps()}
//                     // @ts-ignore
//                     webkitdirectory="true"
//                     directory=""
//                   />
//                 </div>
//                 <div className="mt-5 flex items-center justify-center gap-4">
//                   <Button
//                     onClick={onPrevious}
//                     className="w-full text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     className="w-full text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
//                     onClick={form.handleSubmit(onSubmit)}
//                   >
//                     Submit
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Form>

//           {page === 2 && <PaginatedComponent metadata={metadata} />}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// function PaginatedComponent({ metadata }: { metadata: any[] }) {
//   const itemsPerPage = 24;
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(metadata.length / itemsPerPage);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const paginatedData = metadata.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   if (!metadata.length) {
//     return <></>;
//   }

//   return (
//     <div>
//       <div className="">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//             </PaginationItem>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <PaginationItem key={page}>
//                 <PaginationLink
//                   href="#"
//                   onClick={() => handlePageChange(page)}
//                   className={
//                     page === currentPage ? "font-bold text-pink-500" : ""
//                   }
//                 >
//                   {page}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>

//       <div className="w-full grid grid-cols-6 gap-4 mt-5">
//         {paginatedData.map((e: any) => (
//           <div
//             key={e.name}
//             className="min-w-[150px] max-w-[200px] p-4 flex flex-col gap-2 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2"
//           >
//             <div className="w-full p-2 flex items-center justify-center">
//               {e.fileImage && (
//                 <Image
//                   src={URL.createObjectURL(e.fileImage)}
//                   alt={e.name}
//                   width={100}
//                   height={100}
//                   className="rounded-xl"
//                 />
//               )}
//             </div>
//             <p className="text-sm text-center">{e.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
