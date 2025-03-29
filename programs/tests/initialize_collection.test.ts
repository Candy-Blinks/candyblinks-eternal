import { beforeAll } from "@jest/globals";
import { BN } from "bn.js";
import { setupEnv } from "./setup";
import { IContextAccounts } from "./types";
import { findCandyStorePda, findSettingsPda } from "./helpers";
import { Keypair } from "@solana/web3.js";

describe("Initialize Collection", () => {
  let adminAccount: IContextAccounts;
  let treasuryAccount: IContextAccounts;
  let cmbAccount: IContextAccounts;
  let deployerAccount: IContextAccounts;
  let deployerCollectionAccount: IContextAccounts;
  let minter1Account: IContextAccounts;

  const platformFee = 100000;

  beforeAll(async () => {
    const {
      admin,
      treasury,
      cmb,
      deployer,
      client,
      deployerCollection,
      minter1,
    } = await setupEnv();

    adminAccount = admin;
    minter1Account = minter1;
    treasuryAccount = treasury;
    cmbAccount = cmb;
    deployerAccount = deployer;
    deployerCollectionAccount = deployerCollection;

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

  test("Create Collection", async () => {
    const collectionKeypair = Keypair.generate();

    await deployerAccount.program.methods
      .initializeCollection("asd", "test")
      .accountsPartial({
        collection: collectionKeypair.publicKey,
        payer: deployerAccount.keypair.publicKey,
        updateAuthority: null,
      })
      .signers([collectionKeypair])
      .rpc();
  });
});
