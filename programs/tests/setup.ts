import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { LaunchpadProgram } from "../target/types/launchpad_program";
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ProgramTestContext } from "solana-bankrun";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import {
  createSignerFromKeypair,
  keypairIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import {
  createCollectionV1,
  MPL_CORE_PROGRAM_ID,
  mplCore,
} from "@metaplex-foundation/mpl-core";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { toWeb3JsInstruction } from "@metaplex-foundation/umi-web3js-adapters";
const IDL = require("../target/idl/launchpad_program.json");

function getAccount(keypair: Keypair, context: ProgramTestContext) {
  const provider = new BankrunProvider(context);
  provider.wallet = new NodeWallet(keypair);
  const program = new Program<LaunchpadProgram>(IDL, provider);

  return {
    keypair,
    provider,
    program,
  };
}

async function createCollection(
  payerKeypair: Keypair,
  collectionKeypair: Keypair,
  context: ProgramTestContext
) {
  const localConnection = new Connection("http://127.0.0.1:8899");

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

  const umiInstruction = createCollectionV1(umi, {
    collection: assetSigner,
    name: "My Asset",
    uri: "https://example.com/my-asset.json",
  }).getInstructions();

  const ixs = umiInstruction.map(toWeb3JsInstruction);

  const blockhash = context.lastBlockhash;
  const tx = new Transaction();
  tx.recentBlockhash = blockhash;

  tx.add(...ixs);
  tx.sign(payerKeypair, collectionKeypair);

  await context.banksClient.processTransaction(tx);
}

export async function setupEnv() {
  const deployerKeypair = Keypair.generate();
  const treasuryKeypair = Keypair.generate();
  const adminKeypair = Keypair.generate();
  const minter1Keypair = Keypair.generate();
  const minter2Keypair = Keypair.generate();
  const cmbCreatorKeypair = Keypair.generate();
  const cmbKeypair = Keypair.generate();
  const deployerCollectionKeypair = Keypair.generate();

  const context = await startAnchor(
    "",
    [
      {
        name: "mpl_core",
        programId: new PublicKey(MPL_CORE_PROGRAM_ID.toString()),
      },
    ],
    [
      {
        address: cmbCreatorKeypair.publicKey,
        info: {
          lamports: 10_000_000,
          data: Buffer.alloc(0),
          owner: SYSTEM_PROGRAM_ID,
          executable: false,
        },
      },
      {
        address: treasuryKeypair.publicKey,
        info: {
          lamports: 10_000_000,
          data: Buffer.alloc(0),
          owner: SYSTEM_PROGRAM_ID,
          executable: false,
        },
      },
      {
        address: deployerKeypair.publicKey,
        info: {
          lamports: 10_000_000_000,
          data: Buffer.alloc(0),
          owner: SYSTEM_PROGRAM_ID,
          executable: false,
        },
      },
      {
        address: minter1Keypair.publicKey,
        info: {
          lamports: 10_000_000_000,
          data: Buffer.alloc(0),
          owner: SYSTEM_PROGRAM_ID,
          executable: false,
        },
      },
      {
        address: minter2Keypair.publicKey,
        info: {
          lamports: 10_000_000_000,
          data: Buffer.alloc(0),
          owner: SYSTEM_PROGRAM_ID,
          executable: false,
        },
      },
      {
        address: adminKeypair.publicKey,
        info: {
          lamports: 10_000_000_000,
          data: Buffer.alloc(0),
          owner: SYSTEM_PROGRAM_ID,
          executable: false,
        },
      },
    ]
  );

  // Create CMB Collection
  await createCollection(cmbCreatorKeypair, cmbKeypair, context);
  await createCollection(deployerKeypair, deployerCollectionKeypair, context);

  return {
    context,
    client: context.banksClient,
    deployer: getAccount(deployerKeypair, context),
    deployerCollection: getAccount(deployerCollectionKeypair, context),
    treasury: getAccount(treasuryKeypair, context),
    admin: getAccount(adminKeypair, context),
    minter1: getAccount(minter1Keypair, context),
    minter2: getAccount(minter2Keypair, context),
    cmbCreator: getAccount(cmbCreatorKeypair, context),
    cmb: getAccount(cmbKeypair, context),
  };
}
