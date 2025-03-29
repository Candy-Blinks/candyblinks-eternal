import { create } from "zustand";
import { createSelectors } from "./createSelectors";
import { cmbStore, ICmbStore } from "./cmb.store";
import { authStore, IAuthStore } from "./auth.store";
import {
  createLauncpadStore,
  ICreateLaunchpadStore,
} from "./create-launchpad.store";
import { hubStore, IHubStore } from "./hub.store";
import { IMintStore, mintStore } from "./mint.store";

type IStore = ICmbStore &
  IAuthStore &
  ICreateLaunchpadStore &
  IHubStore &
  IMintStore;

export const useStoreBase = create<IStore>()((...state) => ({
  ...cmbStore(...state),
  ...authStore(...state),
  ...createLauncpadStore(...state),
  ...hubStore(...state),
  ...mintStore(...state),
}));

export const useStore = createSelectors(useStoreBase);
