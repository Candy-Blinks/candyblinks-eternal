import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  CandyblinksProgram,
  CandyblinksProgramIdl,
} from "./idls/candyblinks_program";
export const CONNECTION = new Connection(process.env.RPC_URL ?? "");

const keypair = Keypair.generate();
const wallet = new Wallet(keypair);

const provder = new AnchorProvider(CONNECTION, wallet);

export const PROGRAM = new Program<CandyblinksProgram>(
  CandyblinksProgramIdl,
  provder
);

export function findSettingsPda() {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("settings")],
    new PublicKey(CandyblinksProgramIdl.address)
  )[0];
}
