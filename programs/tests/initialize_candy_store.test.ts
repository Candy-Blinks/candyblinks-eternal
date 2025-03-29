import { beforeAll } from "@jest/globals";
import { BN } from "bn.js";
import { setupEnv } from "./setup";
import { IContextAccounts } from "./types";
import { findCandyStorePda, findSettingsPda } from "./helpers";
import { BanksClient, ProgramTestContext } from "solana-bankrun";
import { Keypair, Transaction } from "@solana/web3.js";

describe("Create Candy Store", () => {
  let adminAccount: IContextAccounts;
  let treasuryAccount: IContextAccounts;
  let cmbAccount: IContextAccounts;
  let deployerAccount: IContextAccounts;
  let deployerCollectionAccount: IContextAccounts;
  let solanaContext: ProgramTestContext;

  const platformFee = 100000;

  beforeAll(async () => {
    const { admin, treasury, cmb, deployer, deployerCollection, context } =
      await setupEnv();

    adminAccount = admin;
    treasuryAccount = treasury;
    cmbAccount = cmb;
    deployerAccount = deployer;
    deployerCollectionAccount = deployerCollection;
    solanaContext = context;

    await adminAccount.program.methods
      .initializeSettings(
        treasuryAccount.keypair.publicKey,
        new BN(platformFee)
      )
      .accountsPartial({
        admin: adminAccount.keypair.publicKey,
        collection: cmbAccount.keypair.publicKey,
      })
      .signers([adminAccount.keypair])
      .rpc();
  });

  test("Initialize Candy Store", async () => {
    const collectionKeypair = Keypair.generate();

    const createCollectionIx = await deployerAccount.program.methods
      .initializeCollection("asd", "test")
      .accountsPartial({
        collection: collectionKeypair.publicKey,
        payer: deployerAccount.keypair.publicKey,
        updateAuthority: null,
      })
      .signers([collectionKeypair])
      .instruction();

    const candyStorePda = findCandyStorePda(
      deployerAccount.program.programId,
      collectionKeypair.publicKey
    );

    const settingsPda = findSettingsPda(deployerAccount.program.programId);
    const settingsAccount =
      await deployerAccount.program.account.settings.fetch(settingsPda);

    const createCandyStoreIx = await deployerAccount.program.methods
      .initializeCandyStore("Name", "url", "manifest_id", new BN(1))
      .accountsPartial({
        collection: collectionKeypair.publicKey,
        candyStore: candyStorePda,
        owner: deployerAccount.keypair.publicKey,
        treasuryWallet: settingsAccount.treasury,
        settingsCollection: settingsAccount.collection,
        settingsCollectionAsset: null,
      })
      .instruction();

    const blockhash = solanaContext.lastBlockhash;
    const tx = new Transaction();
    tx.recentBlockhash = blockhash;

    tx.add(createCollectionIx, createCandyStoreIx);
    tx.sign(deployerAccount.keypair, collectionKeypair);

    await solanaContext.banksClient.processTransaction(tx);
  });
});
