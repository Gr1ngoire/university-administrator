import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { Actions } from "./actions.common";
import { Mutations } from "./mutations.common";
import { disciplines as disciplinesService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type { DisciplinesGetAllItemResponseDto } from "shared/common/types/types";
import { Getters } from "./getters.common";

const state: State = {
  disciplines: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {
  [Getters.DISCIPLINES](state: State): DisciplinesGetAllItemResponseDto[] {
    return state.disciplines;
  },
};

const mutations: MutationTree<State> = {
  [Mutations.ADD_DISCIPLINES](
    state: State,
    newDiscpiplines: DisciplinesGetAllItemResponseDto[]
  ) {
    state.disciplines = [...state.disciplines, ...newDiscpiplines];
  },

  [Mutations.ADD_DISCIPLINE](
    state: State,
    newDiscilpline: DisciplinesGetAllItemResponseDto
  ) {
    state.disciplines.push(newDiscilpline);
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_DISICPLINES]({
    commit,
  }: ActionContext<State, RootState>) {
    const disciplines = await disciplinesService.getAll();

    console.log(disciplines);

    commit(Mutations.ADD_DISCIPLINES, disciplines);
  },
};

const disciplines: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { disciplines };
