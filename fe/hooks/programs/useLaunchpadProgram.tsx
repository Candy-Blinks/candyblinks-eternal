import { useMemo } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import {
  CandyblinksProgram,
  CandyblinksProgramIdl,
} from "@/lib/idls/candyblinks_program";
import { useMutation } from "@tanstack/react-query";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import useUmi from "../useUmi";
import useFindSettings from "../api/useFindSettings";
import useFetchAllCandyStores from "../api/useFetchAllCandyStores";
import useFetchMyCandyStores from "../api/useFetchMyCandyStores";
import useCreateCollectionInstruction from "../instructions/useCreateCollectionInstruction";
import useCreateCandyStoreInstruction from "../instructions/useCreateCandyStoreInstruction";
import useUpdatePhasesInstruction from "../instructions/useUpdatePhasesInstruction";
import useMintAssetInstruction from "../instructions/useMintAssetInstruction";
import { API_INSTANCE } from "@/lib/api";
import useAddRoyaltyPluginInstruction from "../instructions/useAddRoyaltyPluginInstruction";

interface RoyaltyPluginCreator {
  address: PublicKey;
  percentage: number;
}
interface ICreateCandyStoreArgs {
  signers: {
    collection: Keypair;
  };
  accounts: {
    collection: PublicKey;
    candyStore: PublicKey;
    owner?: PublicKey;
    treasuryWallet?: PublicKey;
    settingsCollection?: PublicKey;
    settingsCollectionAsset?: PublicKey;
  };
  args: {
    name: string;
    url: string;
    creators: RoyaltyPluginCreator[];
    manifestId: string;
    numberOfItems: number;
    description: string;
    website?: string;
    x?: string;
    tg?: string;
    yt?: string;
    discord?: string;
    banner: string;
  };
}
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
interface IPhases {
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
    treasuryWallet?: PublicKey;
    minter?: PublicKey;
  };
  args: {
    label: string;
  };
}

export default function useLaunchpadProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const umi = useUmi();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet);
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program<CandyblinksProgram>(CandyblinksProgramIdl, provider);
  }, [provider]);

  const fetchSettingsQuery = useFindSettings();
  const fetchAllCandyStores = useFetchAllCandyStores();
  const fetchMyCandyStores = useFetchMyCandyStores({ wallet });

  const createCollectionInstruction = useCreateCollectionInstruction({ umi });
  const addRoyaltyPluginInstruction = useAddRoyaltyPluginInstruction({ umi });

  const createCandyStoreInstruction = useCreateCandyStoreInstruction({
    program,
  });

  const updatePhasesInstruction = useUpdatePhasesInstruction({
    program,
    wallet,
  });
  const mintAssetInstruction = useMintAssetInstruction({
    program,
  });

  const createCandyStore = useMutation({
    mutationFn: async ({ accounts, signers, args }: ICreateCandyStoreArgs) => {
      const createCollectionIxs = await createCollectionInstruction.mutateAsync(
        {
          signers,
          args: {
            name: args.name,
            uri: `${args.url}${args.manifestId}/collection.json`,
          },
        }
      );

      if (!createCollectionIxs) {
        return;
      }

      const settings = fetchSettingsQuery.data;

      const createCandyStoreIxs = await createCandyStoreInstruction.mutateAsync(
        {
          args: {
            name: args.name,
            url: args.url,
            manifestId: args.manifestId,
            numberOfItems: args.numberOfItems,
          },
          accounts: {
            collection: accounts.collection,
            candyStore: accounts.candyStore,
            owner: accounts.owner ?? wallet?.publicKey!,
            treasuryWallet: accounts.treasuryWallet ?? settings?.treasury,
            settingsCollection:
              accounts.settingsCollection ?? settings?.collection,
            settingsCollectionAsset:
              accounts.settingsCollectionAsset ?? undefined,
          },
        }
      );

      const addRoyaltyPluginIxs = await addRoyaltyPluginInstruction.mutateAsync(
        {
          args: {
            creators: args.creators,
          },
          signers: {
            collection: signers.collection,
          },
          accounts: {
            collection: accounts.collection,
          },
        }
      );

      if (!addRoyaltyPluginIxs) {
        return;
      }

      // TODO: Create a hook for this
      const {
        data: { data },
      } = await API_INSTANCE.post(`candy-stores`, {
        candyStore: accounts.candyStore.toString(),
        description: args.description,
        website: args.website,
        x: args.x,
        tg: args.tg,
        yt: args.yt,
        discord: args.discord,
        banner: args.banner,
      });

      const tx = new Transaction();
      const latestBlockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;
      tx.feePayer = wallet!.publicKey;

      tx.add(
        ...createCollectionIxs,
        ...addRoyaltyPluginIxs,
        createCandyStoreIxs
      );
      tx.sign(signers.collection);
      return await provider!.sendAndConfirm(tx, [signers.collection]);
    },
    onSuccess: (signature) => {},
    onError: () => {},
  });

  const updatePhases = useMutation({
    mutationFn: async ({ accounts, args }: IUpdatePhasesArgs) => {
      const updatePhasesIxs = await updatePhasesInstruction.mutateAsync({
        args,
        accounts,
      });

      const tx = new Transaction();
      const latestBlockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;
      tx.feePayer = wallet!.publicKey;

      tx.add(updatePhasesIxs);
      return await provider!.sendAndConfirm(tx, []);
    },
    onSuccess: (signature) => {},
    onError: () => {},
  });

  const mintAsset = useMutation({
    mutationFn: async ({ accounts, args, signers }: IMintArgs) => {
      const settings = fetchSettingsQuery.data;

      const createCandyStoreIx = await mintAssetInstruction.mutateAsync({
        signers,
        args,
        accounts: {
          collection: accounts.collection,
          candyStore: accounts.candyStore,
          minter: wallet?.publicKey!,
          treasuryWallet: accounts.treasuryWallet ?? settings?.treasury,
          asset: accounts.asset,
        },
      });

      const tx = new Transaction();
      const latestBlockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;
      tx.feePayer = wallet!.publicKey;

      tx.add(createCandyStoreIx);
      return await provider!.sendAndConfirm(tx, [signers?.asset]);
    },
    onSuccess: (signature) => {},
    onError: () => {},
  });

  return {
    provider,
    program,
    wallet,
    createCandyStore,
    fetchAllCandyStores,
    fetchMyCandyStores,
    updatePhases,
    mintAsset,
    fetchSettingsQuery,
  };
}
