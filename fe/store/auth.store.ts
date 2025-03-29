import { StateCreator } from "zustand";

interface IState {
  authSignedMessage: string | null;
}

const initialState: IState = {
  authSignedMessage: null,
};

interface IActions {
  setAuthSignedMessage: (value: string) => void;
}

export type IAuthStore = IState & IActions;

export const authStore: StateCreator<IAuthStore> = (set) => ({
  setAuthSignedMessage: (value) => set(() => ({ authSignedMessage: value })),
  ...initialState,
});
