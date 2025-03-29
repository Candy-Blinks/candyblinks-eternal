import { StateCreator } from "zustand";

interface IState {
  hubCollection: string | null | undefined;
  hubCandyStore: string | null | undefined;
}

const initialState: IState = {
  hubCollection: undefined,
  hubCandyStore: undefined,
};

interface IActions {
  setHubCollection: (value: string) => void;
  setHubCandyStore: (value: string) => void;
}

export type IHubStore = IState & IActions;

export const hubStore: StateCreator<IHubStore> = (set) => ({
  setHubCollection: (value) => set(() => ({ hubCollection: value })),
  setHubCandyStore: (value) => set(() => ({ hubCandyStore: value })),
  ...initialState,
});
