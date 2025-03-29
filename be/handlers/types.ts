import { PrismaClient } from "@prisma/client";
import * as runtime from "@prisma/client/runtime/library.js";

export type PrismaTransaction = Omit<PrismaClient, runtime.ITXClientDenyList>;
export interface CreateCandyStoreParams {
  candyStore: any;
  owner: any;
  collection: any;
  name: any;
  url: any;
  manifestId: any;
  numberOfItems: any;
}

export interface CreateCandyStoreEventArgs {
  params: CreateCandyStoreParams;
  tx: PrismaTransaction;
}

export interface InitializeSettingsEventParams {
  admin: any;
  treasury: any;
  transactionFee: any;
  collection: any;
}

export interface InitializeSettingsEventArgs {
  params: InitializeSettingsEventParams;
  tx: PrismaTransaction;
}

export interface UpdatePhasesEventParams {
  candyStore: any;
  phases: any[];
}

export interface UpdatePhasesEventArgs {
  params: UpdatePhasesEventParams;
  tx: PrismaTransaction;
}
// pub candy_store: Pubkey,
// pub phase: String,
// pub current_mints: u64,
// pub asset: Pubkey,
// pub minter: Pubkey,
// pub collection: Pubkey,

export interface MintAssetEventParams {
  candyStore: any;
  phase: string;
  currentMints: any;
  asset: any;
  minter: any;
  collection: any;
  metadata: any;
}

export interface MintAssetEventArgs {
  params: MintAssetEventParams;
  tx: PrismaTransaction;
}
