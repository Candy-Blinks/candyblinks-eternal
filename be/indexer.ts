import { EventParser } from "@coral-xyz/anchor";
import { prisma } from "./database.js";
import { CONNECTION } from "./helpers.js";
import {
  handleCreateCandyStoreEvent,
  handleInitializeSettingsEvent,
  handleMintAssetEvent,
  handleUpdatePhasesEvent,
} from "./handlers/index.js";
import { UserTransactionType } from "@prisma/client";
import { PROGRAMS } from "./programs";
import { Event } from "@prisma/client"; // Direct import

export async function resetOnchain() {
  await prisma.event.updateMany({
    where: {},
    data: {
      // synced: false,
      parsed: false,
    },
  });
  await prisma.userTransaction.deleteMany({
    where: {
      type: UserTransactionType.ONCHAIN,
    },
  });
  prisma.candyStore.updateMany({
    where: {},
    data: {
      deleted: true,
    },
  });

  await prisma.user.updateMany({
    data: {
      onChainPoints: 0,
    },
  });
}

export async function fetchTransactions() {
  // TODO: Use UNTIL PARAMS
  // Should not be fetching old transactions

  for (const program of PROGRAMS) {
    const currentProgram = program.program;
    const currentProgramId = currentProgram.programId;
    const eventParser = new EventParser(currentProgramId, currentProgram.coder);

    const lastSyncedEvent = await prisma.event.findMany({
      where: {
        program: currentProgramId.toString(),
        synced: false,
      },
      take: 1,
      orderBy: {
        slot: "desc",
      },
    });

    const signatureInfos = await CONNECTION.getSignaturesForAddress(
      currentProgramId,
      {
        until:
          lastSyncedEvent.length !== 0
            ? lastSyncedEvent[0].signature
            : undefined,
        minContextSlot:
          lastSyncedEvent.length !== 0 ? lastSyncedEvent[0].slot : undefined,
      }
    );

    console.log(signatureInfos);

    for (const signatureInfo of signatureInfos) {
      const signature = signatureInfo.signature;
      const transaction = await CONNECTION.getTransaction(signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });

      if (!transaction) {
        continue;
      }

      const logs = transaction?.meta?.logMessages ?? [];

      for (const event of eventParser.parseLogs(logs)) {
        console.log("Syncing Signature: ", signature);
        console.log("Syncing Event: ", event.name);

        await prisma.event.upsert({
          where: {
            signature,
            program: currentProgramId.toString(),
          },
          update: {
            name: event.name,
            signature,
            params: JSON.stringify(event.data),
            slot: transaction?.slot,
            synced: true,
          },
          create: {
            name: event.name,
            program: currentProgramId.toString(),
            signature,
            params: JSON.stringify(event.data),
            slot: transaction?.slot,
            synced: true,
          },
        });
      }
    }
  }
}

export async function syncEvents(events: Event[]) {
  // TODO: Make it start from last unprocessed events

  for (const event of events) {
    const eventData = JSON.parse(event.params);

    if (event.name === "createCandyStoreEvent") {
      await prisma.$transaction(async (tx) => {
        await tx.event.update({
          where: {
            signature: event.signature,
          },
          data: {
            parsed: true,
            synced: true,
          },
        });
        await handleCreateCandyStoreEvent({
          tx,
          params: {
            candyStore: eventData.candyStore,
            owner: eventData.owner,
            collection: eventData.collection,
            name: eventData.name,
            url: eventData.url,
            manifestId: eventData.manifestId,
            numberOfItems: eventData.numberOfItems,
          },
        });
      });

      continue;
    }

    // TODO: Add default address of setting Account
    if (event.name === "initializeSettingsEvent") {
      await prisma.$transaction(async (tx) => {
        await tx.event.update({
          where: {
            signature: event.signature,
          },
          data: {
            parsed: true,
            synced: true,
          },
        });
        await handleInitializeSettingsEvent({
          tx,
          params: {
            admin: eventData.admin,
            treasury: eventData.treasury,
            transactionFee: eventData.transactionFee,
            collection: eventData.collection,
          },
        });
      });

      continue;
    }

    if (event.name === "updatePhasesEvent") {
      await prisma.$transaction(async (tx) => {
        await tx.event.update({
          where: {
            signature: event.signature,
          },
          data: {
            parsed: true,
            synced: true,
          },
        });
        await handleUpdatePhasesEvent({
          tx,
          params: {
            candyStore: eventData.candyStore,
            phases: eventData.phases,
          },
        });
      });

      continue;
    }

    if (event.name === "mintAssetEvent") {
      await prisma.$transaction(async (tx) => {
        await tx.event.update({
          where: {
            signature: event.signature,
          },
          data: {
            parsed: true,
            synced: true,
          },
        });

        await handleMintAssetEvent({
          tx,
          params: {
            metadata: eventData.metadata,
            candyStore: eventData.candyStore,
            phase: eventData.phase,
            currentMints: eventData.currentMints,
            asset: eventData.asset,
            minter: eventData.minter,
            collection: eventData.collection,
          },
        });
      });

      continue;
    }
  }

  // TODO: Add message que
}

export async function initializeListeners() {
  for (const program of PROGRAMS) {
    const currentProgram = program.program;
    const programEvents = currentProgram.idl.events!;
    const programId = currentProgram.programId.toString();

    console.log("Initializing Program", programId);

    for (const event of programEvents) {
      const eventName = event.name;

      console.log(`Initializing event listener ${eventName} on ${programId}`);

      currentProgram.addEventListener(
        eventName,
        async (event, slot, signature) => {
          await prisma.event.upsert({
            where: {
              signature,
            },
            update: {
              name: eventName,
              params: JSON.stringify(event),
              slot: slot,
            },
            create: {
              program: programId,
              name: eventName,
              signature,
              params: JSON.stringify(event),
              slot: slot,
            },
          });
        }
      );
    }
  }
}
