import { StateCreator } from "zustand";

interface IState {
  // hubCollection: string | null | undefined;
  // hubCandyStore: string | null | undefined;
  // // TODO: Add types to phases
  // hubPhases: any[];
  mintPhases: any[];
  mintCurrentPhase: string | null | undefined;
}

const initialState: IState = {
  // hubCollection: undefined,
  // hubCandyStore: undefined,
  // hubPhases: [],
  mintPhases: [],
  mintCurrentPhase: undefined,
};

interface IActions {
  // setHubCollection: (value: string) => void;
  // setHubCandyStore: (value: string) => void;
  // setHubPhases: (value: any[]) => void;
  setMintPhases: (value: any[]) => void;
  setMintCurrentPhase: (value: string | null | undefined) => void;
}

export type IMintStore = IState & IActions;

export const mintStore: StateCreator<IMintStore> = (set) => ({
  setMintPhases: (value) => set(() => ({ mintPhases: value })),
  setMintCurrentPhase: (value) => set(() => ({ mintCurrentPhase: value })),
  // setHubPhases: (value) => set(() => ({ hubPhases: value })),
  // setHubCollection: (value) => set(() => ({ hubCollection: value })),
  // setHubCandyStore: (value) => set(() => ({ hubCandyStore: value })),
  ...initialState,
});
