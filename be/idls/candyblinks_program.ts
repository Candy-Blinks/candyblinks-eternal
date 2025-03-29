/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/candyblinks_program.json`.
 */
export type CandyblinksProgram = {
  address: "CVAFtjYiNHVxmPjRnBb9pnzuZrSR4pqeEuTyqAVEYPiU";
  metadata: {
    name: "launchpadProgram";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "initializeAllocationTracker";
      discriminator: [111, 82, 181, 64, 102, 41, 71, 81];
      accounts: [];
      args: [];
    },
    {
      name: "initializeCandyStore";
      discriminator: [17, 176, 13, 108, 249, 176, 152, 246];
      accounts: [
        {
          name: "collection";
          writable: true;
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "candyStore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 97, 110, 100, 121, 115, 116, 111, 114, 101];
              },
              {
                kind: "account";
                path: "collection";
              }
            ];
          };
        },
        {
          name: "settings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 116, 116, 105, 110, 103, 115];
              }
            ];
          };
        },
        {
          name: "treasuryWallet";
          writable: true;
        },
        {
          name: "settingsCollection";
          writable: true;
        },
        {
          name: "settingsCollectionAsset";
          writable: true;
          optional: true;
        },
        {
          name: "mplCoreProgram";
          address: "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "url";
          type: "string";
        },
        {
          name: "manifestId";
          type: "string";
        },
        {
          name: "numberOfItems";
          type: "u64";
        }
      ];
    },
    {
      name: "initializeCollection";
      discriminator: [112, 62, 53, 139, 173, 152, 98, 93];
      accounts: [
        {
          name: "collection";
          writable: true;
          signer: true;
        },
        {
          name: "updateAuthority";
          optional: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "mplCoreProgram";
          address: "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        }
      ];
    },
    {
      name: "initializeMintLimitTracker";
      discriminator: [181, 66, 49, 219, 10, 159, 1, 164];
      accounts: [];
      args: [];
    },
    {
      name: "initializeProof";
      discriminator: [165, 188, 188, 88, 25, 248, 86, 93];
      accounts: [];
      args: [];
    },
    {
      name: "initializeSettings";
      discriminator: [71, 239, 156, 98, 109, 81, 123, 78];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "settings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 116, 116, 105, 110, 103, 115];
              }
            ];
          };
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "treasury";
          type: "pubkey";
        },
        {
          name: "transactionFee";
          type: "u64";
        }
      ];
    },
    {
      name: "mint";
      discriminator: [51, 57, 225, 47, 182, 146, 137, 166];
      accounts: [
        {
          name: "asset";
          writable: true;
          signer: true;
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "candyStore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 97, 110, 100, 121, 115, 116, 111, 114, 101];
              },
              {
                kind: "account";
                path: "collection";
              }
            ];
          };
        },
        {
          name: "solPaymentUser";
          writable: true;
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "settings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 101, 116, 116, 105, 110, 103, 115];
              }
            ];
          };
        },
        {
          name: "treasuryWallet";
          writable: true;
        },
        {
          name: "mplCoreProgram";
          address: "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d";
        }
      ];
      args: [
        {
          name: "label";
          type: "string";
        }
      ];
    },
    {
      name: "updatePhases";
      discriminator: [76, 64, 239, 62, 164, 232, 165, 37];
      accounts: [
        {
          name: "collection";
          writable: true;
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "candyStore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 97, 110, 100, 121, 115, 116, 111, 114, 101];
              },
              {
                kind: "account";
                path: "collection";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "phases";
          type: {
            vec: {
              defined: {
                name: "phase";
              };
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "baseAssetV1";
      discriminator: [0, 0, 0, 0, 0, 0, 0, 0];
    },
    {
      name: "candyStore";
      discriminator: [178, 27, 125, 228, 26, 193, 183, 40];
    },
    {
      name: "settings";
      discriminator: [223, 179, 163, 190, 177, 224, 67, 173];
    }
  ];
  events: [
    {
      name: "createCandyStoreEvent";
      discriminator: [205, 43, 231, 244, 113, 132, 145, 185];
    },
    {
      name: "initializeSettingsEvent";
      discriminator: [103, 48, 40, 186, 254, 197, 122, 55];
    },
    {
      name: "mintAssetEvent";
      discriminator: [242, 55, 123, 226, 185, 32, 9, 77];
    },
    {
      name: "updatePhasesEvent";
      discriminator: [30, 30, 91, 166, 46, 63, 28, 125];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "pHaseDoesNotExist";
      msg: "Phase Does Not Exist";
    },
    {
      code: 6001;
      name: "collectionNotMplCore";
      msg: "Collection is not Metaplex Core";
    },
    {
      code: 6002;
      name: "notTheOwnerOfCollection";
      msg: "Not the owner of collection";
    },
    {
      code: 6003;
      name: "phaseNotStarted";
      msg: "Phase not started";
    },
    {
      code: 6004;
      name: "phaseEnded";
      msg: "Phase ended";
    },
    {
      code: 6005;
      name: "insufficientBalance";
      msg: "Insufficient Balance";
    },
    {
      code: 6006;
      name: "wrongSolPaymentUser";
      msg: "Wrong Sol Payment User";
    },
    {
      code: 6007;
      name: "allocationTrackerInvalid";
      msg: "Allocation Tracker Invalid";
    }
  ];
  types: [
    {
      name: "allocation";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u8";
          },
          {
            name: "limit";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "allowList";
      type: {
        kind: "struct";
        fields: [
          {
            name: "merkleRoot";
            type: {
              array: ["u8", 32];
            };
          }
        ];
      };
    },
    {
      name: "baseAssetV1";
      type: {
        kind: "struct";
        fields: [
          {
            name: "key";
            type: {
              defined: {
                name: "key";
              };
            };
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "updateAuthority";
            type: {
              defined: {
                name: "updateAuthority";
              };
            };
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "uri";
            type: "string";
          },
          {
            name: "seq";
            type: {
              option: "u64";
            };
          }
        ];
      };
    },
    {
      name: "candyStore";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "url";
            type: "string";
          },
          {
            name: "manifestId";
            type: "string";
          },
          {
            name: "numberOfItems";
            type: "u64";
          },
          {
            name: "minted";
            type: "u64";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "collection";
            type: "pubkey";
          },
          {
            name: "phases";
            type: {
              vec: {
                defined: {
                  name: "phase";
                };
              };
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "createCandyStoreEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "candyStore";
            type: "pubkey";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "collection";
            type: "pubkey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "url";
            type: "string";
          },
          {
            name: "manifestId";
            type: "string";
          },
          {
            name: "numberOfItems";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "endDate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "initializeSettingsEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "treasury";
            type: "pubkey";
          },
          {
            name: "transactionFee";
            type: "u64";
          },
          {
            name: "collection";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "key";
      type: {
        kind: "enum";
        variants: [
          {
            name: "uninitialized";
          },
          {
            name: "assetV1";
          },
          {
            name: "hashedAssetV1";
          },
          {
            name: "pluginHeaderV1";
          },
          {
            name: "pluginRegistryV1";
          },
          {
            name: "collectionV1";
          }
        ];
      };
    },
    {
      name: "mintAssetEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "candyStore";
            type: "pubkey";
          },
          {
            name: "phase";
            type: "string";
          },
          {
            name: "metadata";
            type: "string";
          },
          {
            name: "currentMints";
            type: "u64";
          },
          {
            name: "asset";
            type: "pubkey";
          },
          {
            name: "minter";
            type: "pubkey";
          },
          {
            name: "collection";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "mintLimit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u8";
          },
          {
            name: "limit";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "phase";
      type: {
        kind: "struct";
        fields: [
          {
            name: "label";
            type: "string";
          },
          {
            name: "startDate";
            type: {
              option: {
                defined: {
                  name: "startDate";
                };
              };
            };
          },
          {
            name: "endDate";
            type: {
              option: {
                defined: {
                  name: "endDate";
                };
              };
            };
          },
          {
            name: "solPayment";
            type: {
              option: {
                defined: {
                  name: "solPayment";
                };
              };
            };
          },
          {
            name: "allocation";
            type: {
              option: {
                defined: {
                  name: "allocation";
                };
              };
            };
          },
          {
            name: "mintLimit";
            type: {
              option: {
                defined: {
                  name: "mintLimit";
                };
              };
            };
          },
          {
            name: "allowList";
            type: {
              option: {
                defined: {
                  name: "allowList";
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "settings";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "treasury";
            type: "pubkey";
          },
          {
            name: "collection";
            type: "pubkey";
          },
          {
            name: "transactionFee";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "solPayment";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "startDate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "updateAuthority";
      type: {
        kind: "enum";
        variants: [
          {
            name: "none";
          },
          {
            name: "address";
            fields: ["pubkey"];
          },
          {
            name: "collection";
            fields: ["pubkey"];
          }
        ];
      };
    },
    {
      name: "updatePhasesEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "candyStore";
            type: "pubkey";
          },
          {
            name: "phases";
            type: {
              vec: {
                defined: {
                  name: "phase";
                };
              };
            };
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "allocation";
      type: "string";
      value: '"allocation"';
    },
    {
      name: "candystore";
      type: "string";
      value: '"candystore"';
    },
    {
      name: "mintLimit";
      type: "string";
      value: '"mint_limit"';
    },
    {
      name: "proof";
      type: "string";
      value: '"proof"';
    },
    {
      name: "seed";
      type: "string";
      value: '"anchor"';
    },
    {
      name: "settings";
      type: "string";
      value: '"settings"';
    }
  ];
};

export const CandyblinksProgramIdl: CandyblinksProgram = {
  address: "CVAFtjYiNHVxmPjRnBb9pnzuZrSR4pqeEuTyqAVEYPiU",
  metadata: {
    name: "launchpadProgram",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "initializeAllocationTracker",
      discriminator: [111, 82, 181, 64, 102, 41, 71, 81],
      accounts: [],
      args: [],
    },
    {
      name: "initializeCandyStore",
      discriminator: [17, 176, 13, 108, 249, 176, 152, 246],
      accounts: [
        {
          name: "collection",
          writable: true,
        },
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "candyStore",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 97, 110, 100, 121, 115, 116, 111, 114, 101],
              },
              {
                kind: "account",
                path: "collection",
              },
            ],
          },
        },
        {
          name: "settings",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [115, 101, 116, 116, 105, 110, 103, 115],
              },
            ],
          },
        },
        {
          name: "treasuryWallet",
          writable: true,
        },
        {
          name: "settingsCollection",
          writable: true,
        },
        {
          name: "settingsCollectionAsset",
          writable: true,
          optional: true,
        },
        {
          name: "mplCoreProgram",
          address: "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "url",
          type: "string",
        },
        {
          name: "manifestId",
          type: "string",
        },
        {
          name: "numberOfItems",
          type: "u64",
        },
      ],
    },
    {
      name: "initializeCollection",
      discriminator: [112, 62, 53, 139, 173, 152, 98, 93],
      accounts: [
        {
          name: "collection",
          writable: true,
          signer: true,
        },
        {
          name: "updateAuthority",
          optional: true,
        },
        {
          name: "payer",
          writable: true,
          signer: true,
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "mplCoreProgram",
          address: "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
      ],
    },
    {
      name: "initializeMintLimitTracker",
      discriminator: [181, 66, 49, 219, 10, 159, 1, 164],
      accounts: [],
      args: [],
    },
    {
      name: "initializeProof",
      discriminator: [165, 188, 188, 88, 25, 248, 86, 93],
      accounts: [],
      args: [],
    },
    {
      name: "initializeSettings",
      discriminator: [71, 239, 156, 98, 109, 81, 123, 78],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "settings",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [115, 101, 116, 116, 105, 110, 103, 115],
              },
            ],
          },
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "treasury",
          type: "pubkey",
        },
        {
          name: "transactionFee",
          type: "u64",
        },
      ],
    },
    {
      name: "mint",
      discriminator: [51, 57, 225, 47, 182, 146, 137, 166],
      accounts: [
        {
          name: "asset",
          writable: true,
          signer: true,
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "candyStore",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 97, 110, 100, 121, 115, 116, 111, 114, 101],
              },
              {
                kind: "account",
                path: "collection",
              },
            ],
          },
        },
        {
          name: "solPaymentUser",
          writable: true,
          optional: true,
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "settings",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [115, 101, 116, 116, 105, 110, 103, 115],
              },
            ],
          },
        },
        {
          name: "treasuryWallet",
          writable: true,
        },
        {
          name: "mplCoreProgram",
          address: "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d",
        },
      ],
      args: [
        {
          name: "label",
          type: "string",
        },
      ],
    },
    {
      name: "updatePhases",
      discriminator: [76, 64, 239, 62, 164, 232, 165, 37],
      accounts: [
        {
          name: "collection",
          writable: true,
        },
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "candyStore",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 97, 110, 100, 121, 115, 116, 111, 114, 101],
              },
              {
                kind: "account",
                path: "collection",
              },
            ],
          },
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "phases",
          type: {
            vec: {
              defined: {
                name: "phase",
              },
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "baseAssetV1",
      discriminator: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "candyStore",
      discriminator: [178, 27, 125, 228, 26, 193, 183, 40],
    },
    {
      name: "settings",
      discriminator: [223, 179, 163, 190, 177, 224, 67, 173],
    },
  ],
  events: [
    {
      name: "createCandyStoreEvent",
      discriminator: [205, 43, 231, 244, 113, 132, 145, 185],
    },
    {
      name: "initializeSettingsEvent",
      discriminator: [103, 48, 40, 186, 254, 197, 122, 55],
    },
    {
      name: "mintAssetEvent",
      discriminator: [242, 55, 123, 226, 185, 32, 9, 77],
    },
    {
      name: "updatePhasesEvent",
      discriminator: [30, 30, 91, 166, 46, 63, 28, 125],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "pHaseDoesNotExist",
      msg: "Phase Does Not Exist",
    },
    {
      code: 6001,
      name: "collectionNotMplCore",
      msg: "Collection is not Metaplex Core",
    },
    {
      code: 6002,
      name: "notTheOwnerOfCollection",
      msg: "Not the owner of collection",
    },
    {
      code: 6003,
      name: "phaseNotStarted",
      msg: "Phase not started",
    },
    {
      code: 6004,
      name: "phaseEnded",
      msg: "Phase ended",
    },
    {
      code: 6005,
      name: "insufficientBalance",
      msg: "Insufficient Balance",
    },
    {
      code: 6006,
      name: "wrongSolPaymentUser",
      msg: "Wrong Sol Payment User",
    },
    {
      code: 6007,
      name: "allocationTrackerInvalid",
      msg: "Allocation Tracker Invalid",
    },
  ],
  types: [
    {
      name: "allocation",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u8",
          },
          {
            name: "limit",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "allowList",
      type: {
        kind: "struct",
        fields: [
          {
            name: "merkleRoot",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "baseAssetV1",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              defined: {
                name: "key",
              },
            },
          },
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "updateAuthority",
            type: {
              defined: {
                name: "updateAuthority",
              },
            },
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
          {
            name: "seq",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
    {
      name: "candyStore",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "url",
            type: "string",
          },
          {
            name: "manifestId",
            type: "string",
          },
          {
            name: "numberOfItems",
            type: "u64",
          },
          {
            name: "minted",
            type: "u64",
          },
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "collection",
            type: "pubkey",
          },
          {
            name: "phases",
            type: {
              vec: {
                defined: {
                  name: "phase",
                },
              },
            },
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "createCandyStoreEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "candyStore",
            type: "pubkey",
          },
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "collection",
            type: "pubkey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "url",
            type: "string",
          },
          {
            name: "manifestId",
            type: "string",
          },
          {
            name: "numberOfItems",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "endDate",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "initializeSettingsEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "pubkey",
          },
          {
            name: "treasury",
            type: "pubkey",
          },
          {
            name: "transactionFee",
            type: "u64",
          },
          {
            name: "collection",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "key",
      type: {
        kind: "enum",
        variants: [
          {
            name: "uninitialized",
          },
          {
            name: "assetV1",
          },
          {
            name: "hashedAssetV1",
          },
          {
            name: "pluginHeaderV1",
          },
          {
            name: "pluginRegistryV1",
          },
          {
            name: "collectionV1",
          },
        ],
      },
    },
    {
      name: "mintAssetEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "candyStore",
            type: "pubkey",
          },
          {
            name: "phase",
            type: "string",
          },
          {
            name: "metadata",
            type: "string",
          },
          {
            name: "currentMints",
            type: "u64",
          },
          {
            name: "asset",
            type: "pubkey",
          },
          {
            name: "minter",
            type: "pubkey",
          },
          {
            name: "collection",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "mintLimit",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u8",
          },
          {
            name: "limit",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "phase",
      type: {
        kind: "struct",
        fields: [
          {
            name: "label",
            type: "string",
          },
          {
            name: "startDate",
            type: {
              option: {
                defined: {
                  name: "startDate",
                },
              },
            },
          },
          {
            name: "endDate",
            type: {
              option: {
                defined: {
                  name: "endDate",
                },
              },
            },
          },
          {
            name: "solPayment",
            type: {
              option: {
                defined: {
                  name: "solPayment",
                },
              },
            },
          },
          {
            name: "allocation",
            type: {
              option: {
                defined: {
                  name: "allocation",
                },
              },
            },
          },
          {
            name: "mintLimit",
            type: {
              option: {
                defined: {
                  name: "mintLimit",
                },
              },
            },
          },
          {
            name: "allowList",
            type: {
              option: {
                defined: {
                  name: "allowList",
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "settings",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "pubkey",
          },
          {
            name: "treasury",
            type: "pubkey",
          },
          {
            name: "collection",
            type: "pubkey",
          },
          {
            name: "transactionFee",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "solPayment",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey",
          },
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "startDate",
      type: {
        kind: "struct",
        fields: [
          {
            name: "timestamp",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "updateAuthority",
      type: {
        kind: "enum",
        variants: [
          {
            name: "none",
          },
          {
            name: "address",
            fields: ["pubkey"],
          },
          {
            name: "collection",
            fields: ["pubkey"],
          },
        ],
      },
    },
    {
      name: "updatePhasesEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "candyStore",
            type: "pubkey",
          },
          {
            name: "phases",
            type: {
              vec: {
                defined: {
                  name: "phase",
                },
              },
            },
          },
        ],
      },
    },
  ],
  constants: [
    {
      name: "allocation",
      type: "string",
      value: '"allocation"',
    },
    {
      name: "candystore",
      type: "string",
      value: '"candystore"',
    },
    {
      name: "mintLimit",
      type: "string",
      value: '"mint_limit"',
    },
    {
      name: "proof",
      type: "string",
      value: '"proof"',
    },
    {
      name: "seed",
      type: "string",
      value: '"anchor"',
    },
    {
      name: "settings",
      type: "string",
      value: '"settings"',
    },
  ],
};
