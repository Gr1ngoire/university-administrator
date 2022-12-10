import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { disciplines as disciplinesService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type { DisciplinesGetAllItemResponseDto } from "shared/common/types/types";
import { Getters } from "./getters.common";

enum Actions {
  GET_ALL_DISICPLINES = "getAllDisciplines",
  DELETE_DISCIPLINE = "deleteDiscipline",
}

enum Mutations {
  ADD_DISCIPLINES = "addDisciplines",
  ADD_DISCIPLINE = "addDiscipline",
  REMOVE_DISCIPLINE = "removeDiscipline",
}

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

  [Mutations.REMOVE_DISCIPLINE](state: State, disciplineId: number) {
    state.disciplines = state.disciplines.filter(
      (discipline) => discipline.id !== disciplineId
    );
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_DISICPLINES]({
    commit,
  }: ActionContext<State, RootState>) {
    const { items } = await disciplinesService.getAll();

    commit(Mutations.ADD_DISCIPLINES, items);
  },

  async [Actions.DELETE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    disciplineId: number
  ) {
    const id = await disciplinesService.delete(disciplineId);

    commit(Mutations.REMOVE_DISCIPLINE, id);
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
