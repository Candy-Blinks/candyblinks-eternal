import { Keypair } from "@solana/web3.js";

import { Program } from "@coral-xyz/anchor";
import { LaunchpadProgram } from "../target/types/launchpad_program";
import { BankrunProvider } from "anchor-bankrun";

export interface IContextAccounts {
  keypair: Keypair;
  provider: BankrunProvider;
  program: Program<LaunchpadProgram>;
}
