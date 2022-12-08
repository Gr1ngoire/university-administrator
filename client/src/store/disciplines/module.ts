import type { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { DataStatus } from "@/common/enums/enums";
import type { RootState } from "../root-state";
import type { State } from "./state";

const state: State = {
  disciplines: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {};

const actions: ActionTree<State, RootState> = {};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { module };
