import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSet,
} from "@metaplex-foundation/mpl-core-candy-machine";
import { StateCreator } from "zustand";

interface IState {
  cmbGroupIndex: number;
  cmbGroupLabel: string;
  cmbMintId: number;
  cmbAllocationId: number;
  cmbCandyMachine: CandyMachine | null;
  cmbCandyGuards: CandyGuard<DefaultGuardSet> | null | undefined;
}

const initialState: IState = {
  cmbGroupIndex: -1,
  cmbGroupLabel: "",
  cmbMintId: -1,
  cmbAllocationId: -1,
  cmbCandyMachine: null,
  cmbCandyGuards: null,
};

interface IActions {
  setCmbGroupIndex: (value: number) => void;
  setCmbGroupLabel: (value: string) => void;
  setCmbMintId: (value: number) => void;
  setCmbAllocationId: (value: number) => void;
  setCmbCandyMachine: (value: CandyMachine) => void;
  setCmbCandyGuards: (value: CandyGuard<DefaultGuardSet>) => void;
}

export type ICmbStore = IState & IActions;

export const cmbStore: StateCreator<ICmbStore> = (set) => ({
  setCmbCandyGuards: (value) => set(() => ({ cmbCandyGuards: value })),
  setCmbCandyMachine: (value) => set(() => ({ cmbCandyMachine: value })),
  setCmbGroupLabel: (value) => set(() => ({ cmbGroupLabel: value })),
  setCmbGroupIndex: (value) => set(() => ({ cmbGroupIndex: value })),
  setCmbMintId: (value) => set(() => ({ cmbMintId: value })),
  setCmbAllocationId: (value) => set(() => ({ cmbAllocationId: value })),
  ...initialState,
});
