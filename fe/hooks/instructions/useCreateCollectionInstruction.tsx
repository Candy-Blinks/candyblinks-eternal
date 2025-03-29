import { useMutation } from "@tanstack/react-query";
import { Keypair } from "@solana/web3.js";
import { createCollectionV1 } from "@metaplex-foundation/mpl-core";
import {
  fromWeb3JsKeypair,
  toWeb3JsInstruction,
} from "@metaplex-foundation/umi-web3js-adapters";
import { createSignerFromKeypair, Umi } from "@metaplex-foundation/umi";

interface ICreateCollectionInstructionArgs {
  signers: {
    collection: Keypair;
  };
  args: {
    uri: string;
    name: string;
  };
}

interface IUseCreateCollectionInstructionProps {
  umi: Umi | null;
}

export default function useCreateCollectionInstruction({
  umi,
}: IUseCreateCollectionInstructionProps) {
  return useMutation({
    mutationFn: async ({ signers, args }: ICreateCollectionInstructionArgs) => {
      if (!umi) return;

      const assetSigner = createSignerFromKeypair(
        umi,
        fromWeb3JsKeypair(signers.collection)
      );
      const umiInstruction = createCollectionV1(umi!, {
        collection: assetSigner,
        name: args.name,
        // uri: `${args.uri}${args.manifestId}/collection.json`,
        uri: args.uri,
      }).getInstructions();

      return umiInstruction.map(toWeb3JsInstruction);
    },
  });
}
