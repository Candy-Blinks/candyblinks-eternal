import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { LaunchpadProgram } from "../target/types/launchpad_program";
import "dotenv/config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { createCollectionV1, mplCore } from "@metaplex-foundation/mpl-core";
import {
  createSignerFromKeypair,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";

const IDL = require("../target/idl/launchpad_program.json");
const ADMIN = require("./admin.json");

async function createCollection(
  payerKeypair: Keypair,
  collectionKeypair: Keypair
) {
  const localConnection = new Connection(process.env.JSON_RPC ?? "");

  const umi = createUmi(localConnection.rpcEndpoint)
    .use(mplToolbox())
    .use(mplCore());

  const creatorKeypair = umi.eddsa.createKeypairFromSecretKey(
    payerKeypair.secretKey
  );

  umi.use(keypairIdentity(creatorKeypair));

  const assetSigner = createSignerFromKeypair(
    umi,
    fromWeb3JsKeypair(collectionKeypair)
  );

  await createCollectionV1(umi, {
    collection: assetSigner,
    name: "My Asset",
    uri: "https://example.com/my-asset.json",
  }).sendAndConfirm(umi, { send: { commitment: "finalized" } });
}
(async () => {
  const secret = new Uint8Array(ADMIN);
  const keypair = Keypair.fromSecretKey(secret);
  const wallet = new NodeWallet(keypair);
  const connection = new Connection(process.env.JSON_RPC ?? "");
  const provider = new AnchorProvider(connection, wallet);
  const program = new Program<LaunchpadProgram>(IDL, provider);

  const collectionKeypair = Keypair.generate();

  await createCollection(keypair, collectionKeypair);
  await program.methods
    .initializeSettings(
      new PublicKey("2bv5iLkeMjiwHSgYeG7pitpMFPC4idYw29wtwChdEpLp"),
      new BN(10000)
    )
    .accountsPartial({
      admin: keypair.publicKey,
      collection: collectionKeypair.publicKey,
    })
    .rpc();
})();
