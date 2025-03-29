// createCandyStoreEvent
// initializeSettingsEvent
// updatePhasesEvent

import { PrismaClient, UserTransactionType } from "@prisma/client";
import { prisma } from "../database";
import { findSettingsPda } from "../helpers";
import * as runtime from "@prisma/client/runtime/library.js";
import {
  CreateCandyStoreEventArgs,
  InitializeSettingsEventArgs,
  MintAssetEventArgs,
  PrismaTransaction,
  UpdatePhasesEventArgs,
} from "./types";

const POINTS_PER_ONCHAIN = 1000;

export async function handleCreateCandyStoreEvent({
  params,
  tx,
}: CreateCandyStoreEventArgs) {
  await tx.candyStore.upsert({
    where: {
      address: params.candyStore,
    },
    update: {
      address: params.candyStore,
      owner: params.owner,
      collection: params.collection,
      name: params.name,
      url: params.url,
      manifestId: params.manifestId,
      numberOfItems: parseInt(params.numberOfItems, 16),
      deleted: false,
    },
    create: {
      address: params.candyStore,
      owner: params.owner,
      collection: params.collection,
      name: params.name,
      url: params.url,
      manifestId: params.manifestId,
      numberOfItems: parseInt(params.numberOfItems, 16),
      deleted: false,
    },
  });

  await tx.user.upsert({
    where: { address: params.owner },
    update: { onChainPoints: { increment: POINTS_PER_ONCHAIN } },
    create: { address: params.owner, onChainPoints: POINTS_PER_ONCHAIN },
  });

  await tx.userTransaction.create({
    data: {
      description: `Created Candy Store`,
      userAddress: params.owner,
      points: POINTS_PER_ONCHAIN,
      type: UserTransactionType.ONCHAIN,
    },
  });
}

export async function handleInitializeSettingsEvent({
  params,
  tx,
}: InitializeSettingsEventArgs) {
  await tx.setting.upsert({
    where: {
      address: findSettingsPda().toString(),
    },
    update: {
      admin: params.admin,
      treasury: params.treasury,
      transactionFee: parseInt(params.transactionFee, 16),
      collection: params.collection,
    },
    create: {
      address: findSettingsPda().toString(),
      collection: params.collection,
      admin: params.admin,
      treasury: params.treasury,
      transactionFee: parseInt(params.transactionFee, 16),
    },
  });
}

export async function handleUpdatePhasesEvent({
  params,
  tx,
}: UpdatePhasesEventArgs) {
  await tx.phase.deleteMany({
    where: {
      candyStoreAddress: params.candyStore,
    },
  });
  for (const phase of params.phases) {
    await tx.phase.upsert({
      where: {
        id: params.candyStore + phase.label,
      },
      update: {
        label: phase.label,
        candyStoreAddress: params.candyStore,
      },
      create: {
        id: params.candyStore + phase.label,
        label: phase.label,
        candyStoreAddress: params.candyStore,
      },
    });

    if (phase.startDate) {
      await tx.startDate.upsert({
        where: {
          id: params.candyStore + phase.label,
        },
        update: {
          timestamp: parseInt(phase.startDate.timestamp, 16),
          phaseId: params.candyStore + phase.label,
        },
        create: {
          id: params.candyStore + phase.label,
          timestamp: parseInt(phase.startDate.timestamp, 16),
          phaseId: params.candyStore + phase.label,
        },
      });
    }

    if (phase.endDate) {
      await tx.endDate.upsert({
        where: {
          id: params.candyStore + phase.label,
        },
        update: {
          timestamp: parseInt(phase.endDate.timestamp, 16),
          phaseId: params.candyStore + phase.label,
        },
        create: {
          id: params.candyStore + phase.label,
          timestamp: parseInt(phase.endDate.timestamp, 16),
          phaseId: params.candyStore + phase.label,
        },
      });
    }

    if (phase.mintLimit) {
      await tx.mintLimit.upsert({
        where: {
          id: params.candyStore + phase.label,
        },
        update: {
          id: params.candyStore + phase.label,
          limit: parseInt(phase.mintLimit.limit, 16),
          mintLimitId: phase.mintLimit.id,
          phaseId: params.candyStore + phase.label,
        },
        create: {
          id: params.candyStore + phase.label,
          limit: parseInt(phase.mintLimit.limit, 16),
          mintLimitId: phase.mintLimit.id,
          phaseId: params.candyStore + phase.label,
        },
      });
    }

    if (phase.mintLimit) {
      await tx.mintLimit.upsert({
        where: {
          id: params.candyStore + phase.label,
        },
        update: {
          id: params.candyStore + phase.label,
          limit: parseInt(phase.mintLimit.limit, 16),
          mintLimitId: phase.mintLimit.id,
          phaseId: params.candyStore + phase.label,
        },
        create: {
          id: params.candyStore + phase.label,
          limit: parseInt(phase.mintLimit.limit, 16),
          mintLimitId: phase.mintLimit.id,
          phaseId: params.candyStore + phase.label,
        },
      });
    }

    if (phase.allocation) {
      await tx.allocation.upsert({
        where: {
          id: params.candyStore + phase.label,
        },
        update: {
          id: params.candyStore + phase.label,
          limit: parseInt(phase.allocation.limit, 16),
          allocationId: phase.allocation.id,
          phaseId: params.candyStore + phase.label,
        },
        create: {
          id: params.candyStore + phase.label,
          limit: parseInt(phase.allocation.limit, 16),
          allocationId: phase.allocation.id,
          phaseId: params.candyStore + phase.label,
        },
      });
    }

    // TODO: Not Working properly

    // if (phase.solPayment) {
    //   const solPayment = phase.solPayment;

    //   console.log(parseInt(solPayment.amount, 16));

    //   await tx.solPayment.upsert({
    //     where: {
    //       id: params.candyStore + phase.label,
    //     },
    //     update: {
    //       id: params.candyStore + phase.label,
    //       amount: parseInt(solPayment.amount, 16),
    //       user: solPayment.user,
    //       phaseId: params.candyStore + phase.label,
    //     },
    //     create: {
    //       id: params.candyStore + phase.label,
    //       amount: parseInt(solPayment.amount, 16),
    //       user: solPayment.user,
    //       phaseId: params.candyStore + phase.label,
    //     },
    //   });
    // }

    // if (phase.allowList) {
    //   await tx.allowList.upsert({
    //     where: {
    //       id: params.candyStore + phase.label,
    //     },
    //     update: {
    //       id: params.candyStore + phase.label,
    //       merkleRoot: phase.allowList.merkleRoot,
    //       phaseId: params.candyStore + phase.label,
    //     },
    //     create: {
    //       id: params.candyStore + phase.label,
    //       merkleRoot: phase.allowList.merkleRoot,
    //       phaseId: params.candyStore + phase.label,
    //     },
    //   });
    // }
  }
}

// candyStore: any;
// phase: string;
// currentMints: any;
// asset: any;
// minter: any;
// collection: any;
// TODO: AddMint Transaction Hostirues
export async function handleMintAssetEvent({ params, tx }: MintAssetEventArgs) {
  await tx.candyStore.updateMany({
    where: {
      address: params.candyStore,
    },
    data: {
      minted: parseInt(params.currentMints, 16),
      collection: params.collection,
      deleted: false,
    },
  });

  await tx.user.upsert({
    where: { address: params.minter },
    update: { onChainPoints: { increment: POINTS_PER_ONCHAIN } },
    create: { address: params.minter, onChainPoints: POINTS_PER_ONCHAIN },
  });

  await tx.asset.upsert({
    where: {
      address: params.asset,
    },
    update: {
      collection: params.collection,
      metadata: params.metadata,
    },
    create: {
      address: params.asset,
      collection: params.collection,
      metadata: params.metadata,
    },
  });

  await tx.userTransaction.create({
    data: {
      description: `Minted NFT `,
      userAddress: params.minter,
      points: POINTS_PER_ONCHAIN,
      type: UserTransactionType.ONCHAIN,
    },
  });
}
