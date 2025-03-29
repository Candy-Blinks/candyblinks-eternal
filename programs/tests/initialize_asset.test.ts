import { beforeAll } from "@jest/globals";
import { BN } from "bn.js";
import { setupEnv } from "./setup";
import { IContextAccounts } from "./types";
import { findCandyStorePda, findSettingsPda } from "./helpers";
import { Keypair, Transaction } from "@solana/web3.js";
import { ProgramTestContext } from "solana-bankrun";

describe("Initialize Asset", () => {
  let adminAccount: IContextAccounts;
  let treasuryAccount: IContextAccounts;
  let cmbAccount: IContextAccounts;
  let deployerAccount: IContextAccounts;
  let minter1Account: IContextAccounts;
  let solanaContext: ProgramTestContext;

  const platformFee = 100000;

  const collectionKeypair = Keypair.generate();

  beforeAll(async () => {
    const {
      admin,
      treasury,
      cmb,
      deployer,
      client,
      deployerCollection,
      minter1,
      context,
    } = await setupEnv();

    solanaContext = context;
    adminAccount = admin;
    minter1Account = minter1;
    treasuryAccount = treasury;
    cmbAccount = cmb;
    deployerAccount = deployer;

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
      .initializeCandyStore("Name", "url", "manifest_id", new BN(2))
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

    tx.add(createCollectionIx);
    tx.add(createCandyStoreIx);
    tx.sign(deployerAccount.keypair, collectionKeypair);

    await solanaContext.banksClient.processTransaction(tx);
  });

  test("Update Phases", async () => {
    const candyStorePda = findCandyStorePda(
      deployerAccount.program.programId,
      collectionKeypair.publicKey
    );

    await deployerAccount.program.methods
      .updatePhases([
        {
          label: "WL",
          startDate: null,
          endDate: null,
          solPayment: null,
          allocation: null,
          mintLimit: null,
          allowList: null,
        },
      ])
      .accountsPartial({
        collection: collectionKeypair.publicKey,
        candyStore: candyStorePda,
        owner: deployerAccount.keypair.publicKey,
      })
      .signers([deployerAccount.keypair])
      .rpc();
  });

  test("Mint Asset", async () => {
    const candyStorePda = findCandyStorePda(
      deployerAccount.program.programId,
      collectionKeypair.publicKey
    );

    const mintAsset = Keypair.generate();
    const settingsPda = findSettingsPda(deployerAccount.program.programId);
    const settingsAccount =
      await deployerAccount.program.account.settings.fetch(settingsPda);

    const mintAssetIx = await deployerAccount.program.methods
      .mint("WL")
      .accountsPartial({
        asset: mintAsset.publicKey,
        collection: collectionKeypair.publicKey,
        candyStore: candyStorePda,
        user: deployerAccount.keypair.publicKey,
        solPaymentUser: null,
        settings: settingsPda,
        treasuryWallet: settingsAccount.treasury,
      })
      .instruction();

    const blockhash = solanaContext.lastBlockhash;
    const tx = new Transaction();
    tx.recentBlockhash = blockhash;

    tx.add(mintAssetIx);
    tx.sign(deployerAccount.keypair, mintAsset);

    await solanaContext.banksClient.processTransaction(tx);
  });

  test("Mint Asset but not deployer", async () => {
    const candyStorePda = findCandyStorePda(
      deployerAccount.program.programId,
      collectionKeypair.publicKey
    );

    const mintAsset = Keypair.generate();
    const settingsPda = findSettingsPda(minter1Account.program.programId);
    const settingsAccount = await minter1Account.program.account.settings.fetch(
      settingsPda
    );

    const mintAssetIx = await minter1Account.program.methods
      .mint("WL")
      .accountsPartial({
        asset: mintAsset.publicKey,
        collection: collectionKeypair.publicKey,
        candyStore: candyStorePda,
        user: minter1Account.keypair.publicKey,
        solPaymentUser: null,
        settings: settingsPda,
        treasuryWallet: settingsAccount.treasury,
      })
      .instruction();

    const blockhash = solanaContext.lastBlockhash;
    const tx = new Transaction();
    tx.recentBlockhash = blockhash;

    tx.add(mintAssetIx);
    tx.sign(minter1Account.keypair, mintAsset);

    await solanaContext.banksClient.processTransaction(tx);

    console.log("It fucking worked");
  });
});
