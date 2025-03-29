import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
import { beforeAll, expect } from "@jest/globals";
import { BN } from "bn.js";
import { Program } from "@coral-xyz/anchor";
import { LaunchpadProgram } from "../target/types/launchpad_program";
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const IDL = require("../target/idl/launchpad_program.json");

export function findSettingsPda(program: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("settings")],
    program
  )[0];
}

export function findCandyStorePda(program: PublicKey, collection: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("candystore"), collection.toBuffer()],
    program
  )[0];
}
