import { AnchorWallet } from "@solana/wallet-adapter-react";
import { BN, Program } from "@coral-xyz/anchor";
import { CandyblinksProgram } from "@/lib/idls/candyblinks_program";
import { useMutation } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";

interface IStartDate {
  timestamp: number | string;
}

interface IEndDate {
  timestamp: number | string;
}

interface ISolPayment {
  user: PublicKey;
  amount: BN;
}
interface IAllocation {
  id: number;
  limit: BN;
}

interface IMintLimit {
  id: number;
  limit: BN;
}

interface IAllowList {
  merkleRoot: number[];
}
export interface IPhases {
  label: string;
  startDate?: IStartDate | null;
  endDate?: IEndDate | null;
  solPayment?: ISolPayment | null;
  allocation?: IAllocation | null;
  mintLimit?: IMintLimit | null;
  allowList?: IAllowList | null;
}

interface IUpdatePhasesArgs {
  signers?: {};
  accounts: {
    collection: PublicKey;
    candyStore: PublicKey;
    owner?: PublicKey;
  };
  args: {
    phases: IPhases[];
  };
}

interface IUseUpdatePhasesInstructionProps {
  program: Program<CandyblinksProgram> | null;
  wallet: AnchorWallet | undefined;
}

export default function useUpdatePhasesInstruction({
  program,
  wallet,
}: IUseUpdatePhasesInstructionProps) {
  return useMutation({
    mutationFn: async ({ accounts, args }: IUpdatePhasesArgs) => {
      return await program!.methods
        .updatePhases([...args.phases])
        .accountsPartial({
          collection: accounts.collection,
          candyStore: accounts.candyStore,
          owner: accounts.owner ?? wallet?.publicKey!,
        })
        .instruction();
    },
  });
}
