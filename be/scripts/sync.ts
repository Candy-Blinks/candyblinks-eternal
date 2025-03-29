// import { Connection, Keypair, PublicKey } from "@solana/web3.js";
// import { AnchorProvider, Program, utils, Wallet } from "@coral-xyz/anchor";
// import {
//   CandyblinksProgram,
//   CandyblinksProgramIdl,
// } from "../idls/candyblinks_program";
// import "dotenv/config";
// import { prisma } from "../database";

// (async () => {
//   const connection = new Connection(process.env.RPC_URL ?? "");

//   const keypair = Keypair.generate();
//   const wallet = new Wallet(keypair);

//   const provder = new AnchorProvider(connection, wallet);

//   const program = new Program<CandyblinksProgram>(
//     CandyblinksProgramIdl,
//     provder
//   );

//   const response = await connection.getSignaturesForAddress(
//     new PublicKey(program.programId)
//   );

//   for (let i: number = 0; i < response.length; i++) {
//     const tx = await connection.getTransaction(response[i].signature, {
//       commitment: "confirmed",
//     });
//     const logs = tx?.meta?.logMessages ?? [];

//     const eventData = logs.find((e) => e.startsWith("Program data:"));

//     if (!eventData) {
//       continue;
//     }

//     const PROGRAM_LOG = "Program log: ";
//     const PROGRAM_DATA = "Program data: ";
//     const PROGRAM_LOG_START_INDEX = PROGRAM_LOG.length;
//     const PROGRAM_DATA_START_INDEX = PROGRAM_DATA.length;
//     console.log();

//     const event = program.coder.events.decode(
//       eventData.slice(PROGRAM_DATA_START_INDEX)
//     );

//     console.log(event?.name);

//     if (event?.name == "createCandyStoreEvent") {
//       const data = event?.data;

//       console.log(data);

//       await prisma.candyStore.upsert({
//         where: { id: data?.candyStore?.toString() },
//         update: {
//           owner: data?.owner?.toString(),
//           collection: data?.collection?.toString(),
//           name: data?.name,
//           url: data?.url,
//           manifestId: data?.manifestId,
//           numberOfItems: data?.numberOfItems?.toNumber(),
//         },
//         create: {
//           id: data?.candyStore?.toString(),
//           owner: data?.owner?.toString(),
//           collection: data?.collection?.toString(),
//           minted: 0,
//           name: data?.name,
//           url: data?.url,
//           manifestId: data?.manifestId,
//           numberOfItems: data?.numberOfItems?.toNumber(),
//           blockTime: Number(tx?.blockTime || 0),
//           slot: Number(tx?.slot || 0),
//           signature: response[i].signature,
//         },
//       });

//       // await prisma.events.upsert({
//       //   where: { signature: response[i].signature },
//       //   update: {
//       //     name: event?.name,
//       //     blockTime: tx?.blockTime || 0,
//       //     slot: tx?.slot || 0,
//       //     params: JSON.stringify({
//       //       candyStore: data?.candyStore?.toString(),
//       //       owner: data?.owner?.toString(),
//       //       collection: data?.collection?.toString(),
//       //       name: data?.name,
//       //       url: data?.url,
//       //       manifestId: data?.manifestId,
//       //       numberOfItems: data?.numberOfItems?.toNumber(),
//       //     }),
//       //   },
//       //   create: {
//       //     signature: response[i].signature,
//       //     name: event?.name,
//       //     blockTime: tx?.blockTime || 0,
//       //     slot: tx?.slot || 0,
//       //     params: JSON.stringify({
//       //       candyStore: data?.candyStore?.toString(),
//       //       owner: data?.owner?.toString(),
//       //       collection: data?.collection?.toString(),
//       //       name: data?.name,
//       //       url: data?.url,
//       //       manifestId: data?.manifestId,
//       //       numberOfItems: data?.numberOfItems?.toNumber(),
//       //     }),
//       //   },
//       // });
//       continue;
//     }

//     if (event?.name == "initializeSettingsEvent") {
//       const data = event?.data;

//       await prisma.events.upsert({
//         where: { signature: response[i].signature },
//         update: {
//           name: event?.name,
//           blockTime: tx?.blockTime || 0,
//           slot: tx?.slot || 0,
//           params: JSON.stringify({
//             admin: data?.admin.toString(),
//             treasury: data?.treasury.toString(),
//             transactionFee: data?.transactionFee.toNumber(),
//             collection: data?.collection.toString(),
//           }),
//         },
//         create: {
//           signature: response[i].signature,
//           name: event?.name,
//           blockTime: tx?.blockTime || 0,
//           slot: tx?.slot || 0,
//           params: JSON.stringify({
//             admin: data?.admin.toString(),
//             treasury: data?.treasury.toString(),
//             transactionFee: data?.transactionFee.toNumber(),
//             collection: data?.collection.toString(),
//           }),
//         },
//       });

//       continue;
//     }
//   }
// })();
