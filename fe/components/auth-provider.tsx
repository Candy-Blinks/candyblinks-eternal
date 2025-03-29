"use client";

import React from "react";
// import { useStore } from "@/store/store";
// import useAuthenticateUser from "@/hooks/useAuthenticateUser";
// import { Button } from "./ui/button";
// import ConnectWallet from "./connect-wallet";
// import Footer from "./footer";
// import { ASSETS_URL } from "@/lib/constants";
// import Image from "next/image";

interface IAuthProviderProps {
  children: React.ReactNode;
}
export default function AuthProvider({ children }: IAuthProviderProps) {
  // const { authSignedMessage } = useStore();
  // const { mutate: authenticateUser, publicKey } = useAuthenticateUser();

  // useEffect(() => {
  //   if (!authSignedMessage) {
  //     authenticateUser({});
  //   }
  // }, [authSignedMessage, authenticateUser]);

  // if (!authSignedMessage) {
  //   return (
  //     <div>
  //       <div
  //         className={`flex items-center fixed top-0 w-full px-5 min-h-30 justify-start transition py-5 backdrop-blur-sm shadow-lg bg-black/50 z-40`}
  //       >
  //         <div className="flex items-center justify-center">
  //           <div>
  //             <Image
  //               src={`${ASSETS_URL}logo.png`}
  //               alt="logo"
  //               width={50}
  //               height={50}
  //               className="ml-5 cursor-pointer"
  //             />
  //           </div>
  //           <span className="md:ml-5 text-3xl text-red-400 font-bold dm-sans md:block hidden">
  //             CandyBlinks
  //           </span>
  //         </div>
  //         <div className="ml-auto mr-5">
  //           <ConnectWallet />
  //         </div>
  //       </div>
  //       <div className="flex items-center justify-center min-h-dvh bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-70% to-neutral-950">
  //         <div className="flex justify-center flex-col bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2">
  //           <div className="p-4 font-semibold">
  //             {!publicKey ? (
  //               <>
  //                 <div className="text-2xl">Connect Your Wallet</div>
  //                 <div className="font-normal text-neutral-400">
  //                   Connect your wallet to login to your account
  //                 </div>
  //               </>
  //             ) : (
  //               <>
  //                 <div className="text-2xl">Sign Message</div>
  //                 <div className="font-normal text-neutral-400">
  //                   Sign a message with your wallet to authenticate
  //                 </div>
  //               </>
  //             )}
  //           </div>

  //           <div className="p-4 flex justify-center">
  //             <Button
  //               onClick={() => {
  //                 authenticateUser({});
  //               }}
  //               disabled={!publicKey}
  //               className="w-full bg-red-400 text-white font-semibold text-xl py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
  //             >
  //               {!publicKey ? "Connect Wallet" : "Authenticate"}
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return <> {children}</>;
}
