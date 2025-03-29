import { AnchorWallet } from "@solana/wallet-adapter-react";
import { BN, Program } from "@coral-xyz/anchor";
import { CandyblinksProgram } from "@/lib/idls/candyblinks_program";
import { useMutation } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";

interface ICreateCandyStoreArgs {
  accounts: {
    collection: PublicKey;
    candyStore: PublicKey;
    owner: PublicKey;
    treasuryWallet: PublicKey;
    settingsCollection: PublicKey;
    settingsCollectionAsset?: PublicKey;
  };
  args: {
    name: string;
    url: string;
    manifestId: string;
    numberOfItems: number;
  };
}

interface IUseCreateCandyStoreInstructionProps {
  program: Program<CandyblinksProgram> | null;
}

export default function useCreateCandyStoreInstruction({
  program,
}: IUseCreateCandyStoreInstructionProps) {
  return useMutation({
    mutationFn: async ({ accounts, args }: ICreateCandyStoreArgs) => {
      return await program!.methods
        .initializeCandyStore(
          args.name,
          args.url,
          args.manifestId,
          new BN(args.numberOfItems)
        )
        .accountsPartial({
          collection: accounts.collection,
          candyStore: accounts.candyStore,
          owner: accounts.owner,
          treasuryWallet: accounts.treasuryWallet,
          settingsCollection: accounts.settingsCollection,
          settingsCollectionAsset: accounts.settingsCollectionAsset ?? null,
        })
        .instruction();
    },
  });
}
