import { useEffect, useState } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Umi } from "@metaplex-foundation/umi";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { mplCandyMachine as mplCoreCandyMachine } from "@metaplex-foundation/mpl-core-candy-machine";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";

export default function useUmi() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [umi, setUmi] = useState<Umi | null>(null);

  useEffect(() => {
    if (wallet?.connected) {
      setUmi(
        createUmi(connection)
          .use(irysUploader())
          .use(walletAdapterIdentity(wallet))
          .use(mplToolbox())
          .use(mplCore())
          .use(mplCoreCandyMachine())
          .use(dasApi())
      );
    } else {
      console.log("Wallet is not connected.");
    }
  }, [connection, wallet?.connected]);

  return umi;
}
