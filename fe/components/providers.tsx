"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  BitgetWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RPC_URL } from "@/lib/constants";
import "@solana/wallet-adapter-react-ui/styles.css";
import AuthProvider from "./auth-provider";

interface IProvidersProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
export default function Providers({ children }: IProvidersProps) {
  const wallets = useMemo(
    () => [new BitgetWalletAdapter(), new PhantomWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider> {children}</AuthProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
