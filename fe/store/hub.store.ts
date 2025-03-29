import { StateCreator } from "zustand";

interface IState {
  hubCollection: string | null | undefined;
  hubCandyStore: string | null | undefined;
  // TODO: Add types to phases
  hubPhases: any[];
}

const initialState: IState = {
  hubCollection: undefined,
  hubCandyStore: undefined,
  hubPhases: [],
};

interface IActions {
  setHubCollection: (value: string) => void;
  setHubCandyStore: (value: string) => void;
  setHubPhases: (value: any[]) => void;
}

export type IHubStore = IState & IActions;

export const hubStore: StateCreator<IHubStore> = (set) => ({
  setHubPhases: (value) => set(() => ({ hubPhases: value })),
  setHubCollection: (value) => set(() => ({ hubCollection: value })),
  setHubCandyStore: (value) => set(() => ({ hubCandyStore: value })),
  ...initialState,
});
