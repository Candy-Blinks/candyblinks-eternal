import { Program } from "@coral-xyz/anchor";
import { CandyblinksProgram } from "@/lib/idls/candyblinks_program";
import { useMutation } from "@tanstack/react-query";
import { Keypair, PublicKey } from "@solana/web3.js";
import { findSettingsPda } from "@/lib/utils";

interface IMintArgs {
  signers: {
    asset: Keypair;
  };
  accounts: {
    collection: PublicKey;
    asset: PublicKey;
    candyStore: PublicKey;
    solPaymentUser?: PublicKey;
    settings?: PublicKey;
    treasuryWallet: PublicKey;
    minter: PublicKey;
  };
  args: {
    label: string;
  };
}

interface IUseMintAssetInstructionProps {
  program: Program<CandyblinksProgram> | null;
}

export default function useMintAssetInstruction({
  program,
}: IUseMintAssetInstructionProps) {
  return useMutation({
    mutationFn: async ({ accounts, args, signers }: IMintArgs) => {
      return await program!.methods
        .mint(args.label)
        .accountsPartial({
          asset: accounts.asset,
          collection: accounts.collection,
          candyStore: accounts.candyStore,
          solPaymentUser: accounts.solPaymentUser ?? null,
          settings: accounts?.settings ?? findSettingsPda(),
          treasuryWallet: accounts.treasuryWallet,
          user: accounts?.minter,
        })
        .signers([signers?.asset])
        .instruction();
    },
  });
}
