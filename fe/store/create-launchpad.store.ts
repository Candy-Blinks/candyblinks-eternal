import { StateCreator } from "zustand";

interface IState {
  createPage: number;
  createUploadedJson: any[];
  createUploadedImages: File[];
  collectionBanner: string | null | undefined;
  jsonManifestId: null | string | undefined;
  imageManifestId: null | string | undefined;
}

const initialState: IState = {
  createPage: 0,
  createUploadedJson: [],
  createUploadedImages: [],
  collectionBanner: undefined,
  jsonManifestId: undefined,
  imageManifestId: undefined,
};

interface IActions {
  setCreatePage: (value: number) => void;
  setCreateUploadedJson: (value: any[]) => void;
  setCreateUploadedImages: (value: File[]) => void;
  setCollectionBanner: (value: string) => void;
  setJsonManifestId: (value: string) => void;
  setImageManifestId: (value: string) => void;
  resetCreatePage: () => void;
}

export type ICreateLaunchpadStore = IState & IActions;

export const createLauncpadStore: StateCreator<ICreateLaunchpadStore> = (
  set
) => ({
  resetCreatePage: () => {
    set(initialState);
  },
  setCreateUploadedImages: (value) =>
    set(() => ({ createUploadedImages: value })),
  setCollectionBanner: (value) => set(() => ({ collectionBanner: value })),
  setJsonManifestId: (value) => set(() => ({ jsonManifestId: value })),
  setImageManifestId: (value) => set(() => ({ imageManifestId: value })),
  setCreateUploadedJson: (value) => set(() => ({ createUploadedJson: value })),
  setCreatePage: (value) => set(() => ({ createPage: value })),
  ...initialState,
});
