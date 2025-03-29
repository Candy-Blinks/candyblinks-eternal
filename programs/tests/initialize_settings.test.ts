import { beforeAll, expect } from "@jest/globals";
import { BN } from "bn.js";
import { setupEnv } from "./setup";
import { IContextAccounts } from "./types";
import { findSettingsPda } from "./helpers";

describe("Settings", () => {
  let adminAccount: IContextAccounts;
  let treasuryAccount: IContextAccounts;
  let cmbAccount: IContextAccounts;

  const platformFee = 100000;

  beforeAll(async () => {
    const { admin, treasury, cmb } = await setupEnv();

    adminAccount = admin;
    treasuryAccount = treasury;
    cmbAccount = cmb;
  });

  test("Initialize Settings", async () => {
    const createCandyStoreTx = await adminAccount.program.methods
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

    expect(createCandyStoreTx).toBeDefined();

    const settingsPda = findSettingsPda(adminAccount.program.programId);

    const settingsAccount = await adminAccount.program.account.settings.fetch(
      settingsPda
    );

    expect(settingsAccount.transactionFee.toNumber()).toBe(platformFee);

    expect(settingsAccount.treasury.toBase58()).toBe(
      treasuryAccount.keypair.publicKey.toBase58()
    );
    expect(settingsAccount.admin.toBase58()).toBe(
      adminAccount.keypair.publicKey.toBase58()
    );
  });
});
