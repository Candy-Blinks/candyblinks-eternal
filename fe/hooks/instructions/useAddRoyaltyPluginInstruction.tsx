import { useMutation } from "@tanstack/react-query";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  addCollectionPlugin,
  createCollectionV1,
  ruleSet,
} from "@metaplex-foundation/mpl-core";
import {
  fromWeb3JsKeypair,
  toWeb3JsInstruction,
} from "@metaplex-foundation/umi-web3js-adapters";
import {
  createSignerFromKeypair,
  publicKey,
  Umi,
} from "@metaplex-foundation/umi";

interface RoyaltyPluginCreator {
  address: PublicKey;
  percentage: number;
}

interface IAddRoyaltPluginArgs {
  signers: {
    collection: Keypair;
  };
  accounts: {
    collection: PublicKey;
  };
  args: {
    creators: RoyaltyPluginCreator[];
  };
}

interface IUseAddRoyaltyPluginInstructionProps {
  umi: Umi | null;
}

export default function useAddRoyaltyPluginInstruction({
  umi,
}: IUseAddRoyaltyPluginInstructionProps) {
  return useMutation({
    mutationFn: async ({ signers, args, accounts }: IAddRoyaltPluginArgs) => {
      if (!umi) return;

      const umiInstruction = addCollectionPlugin(umi!, {
        collection: publicKey(accounts.collection.toString()),
        plugin: {
          type: "Royalties",
          basisPoints: 500,
          creators: args.creators.map((creator) => {
            return {
              address: publicKey(creator.address.toString()),
              percentage: creator.percentage,
            };
          }),
          ruleSet: ruleSet("None"),
        },
      }).getInstructions();

      return umiInstruction.map(toWeb3JsInstruction);
    },
  });
}
