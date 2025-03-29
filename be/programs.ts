import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PORT } from "./environment.js";
import candyStore from "./src/routes/candy-stores.js";
import settings from "./src/routes/settings.js";
import transactions from "./src/routes/transactions.js";
import { Connection, Keypair } from "@solana/web3.js";
import {
  AnchorProvider,
  EventParser,
  Program,
  Wallet,
} from "@coral-xyz/anchor";
import {
  CandyblinksProgram,
  CandyblinksProgramIdl,
} from "./idls/candyblinks_program.js";
import { prisma } from "./database.js";
import cron from "node-cron";
import { CONNECTION, PROGRAM } from "./helpers.js";
import {
  handleCreateCandyStoreEvent,
  handleInitializeSettingsEvent,
  handleMintAssetEvent,
  handleUpdatePhasesEvent,
} from "./handlers/index.js";
import { UserTransactionType } from "@prisma/client";

const connection = new Connection(process.env.RPC_URL ?? "");

const keypair = Keypair.generate();
const wallet = new Wallet(keypair);

const provder = new AnchorProvider(connection, wallet);

export const PROGRAMS = [
  {
    program: new Program<CandyblinksProgram>(CandyblinksProgramIdl, provder),
  },
];
