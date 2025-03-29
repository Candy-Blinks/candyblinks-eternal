import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Keypair, PublicKey } from "@solana/web3.js";
import { SIGNING_MESSAGE } from "./constants";
import nacl from "tweetnacl";
import { Wallet } from "@coral-xyz/anchor";
import { CandyblinksProgramIdl } from "./idls/candyblinks_program";
import { format } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  return format(date, "MMMM dd, yyyy HH:mm:ss"); // Example: December 20, 2024 10:15:24
}

export function findSettingsPda() {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("settings")],
    new PublicKey(CandyblinksProgramIdl.address)
  )[0];
}
export function findCandyStorePda(collection: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("candystore"), collection.toBuffer()],
    new PublicKey(CandyblinksProgramIdl.address)
  )[0];
}

export function bytesToBase64(bytes: Uint8Array) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

export function base64ToBytes(base64: string) {
  const binString = atob(base64);
  const bytes = new Uint8Array(binString.length);
  for (let i = 0; i < binString.length; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

export function verifyMessage(user: string, signedMessage: string) {
  const userPubKey = new PublicKey(user);
  const messageBytes = new TextEncoder().encode(SIGNING_MESSAGE);

  return nacl.sign.detached.verify(
    messageBytes,
    base64ToBytes(signedMessage),
    userPubKey.toBytes()
  );
}

export function jsonToFile(data: unknown, name: string) {
  const jsonString = JSON.stringify({
    ...(data as any),
  });

  const blob = new Blob([jsonString], { type: "application/json" });

  return new File([blob], name, {
    type: "application/json",
  });
}

export function fileToBlob(file: File, type: string) {
  return new Blob([file], {
    type: type,
  });
}

export function blobToFile(blob: Blob, name: string, type: string) {
  return new File([blob], name, {
    type: type,
  });
}

export function resetFileName(file: File, name: string, type: string) {
  const blob = fileToBlob(file, type);
  return blobToFile(blob, name, type);
}

export function isValidPublicKey(key: string) {
  try {
    new PublicKey(key);
    return true;
  } catch {
    return false;
  }
}

export function truncateAddress(address: string, length = 5): string {
  if (!address) return "";
  return `${address.slice(0, length)}.....${address.slice(-length)}`;
}

export class NoOpWallet implements Wallet {
  payer: Keypair;

  constructor() {
    this.payer = Keypair.generate();
  }

  get publicKey(): PublicKey {
    return this.payer.publicKey;
  }

  async signTransaction(transaction: any) {
    console.log("NoOpWallet: signTransaction called");
    return transaction;
  }

  async signAllTransactions(transactions: any) {
    console.log("NoOpWallet: signAllTransactions called");
    return transactions;
  }
}
