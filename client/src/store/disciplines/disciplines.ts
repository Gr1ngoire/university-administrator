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
import type {
  CreateDisciplineRequestDto,
  DisciplinesGetAllItemResponseDto,
  UpdateDisciplineRequestParams,
} from "@/common/types/types";
import { Getters } from "./getters.common";

enum Actions {
  GET_ALL_DISICPLINES = "getAllDisciplines",
  CREATE_DISCIPLINE = "createDiscipline",
  UPDATE_DISCIPLINE = "updateDiscipline",
  DELETE_DISCIPLINE = "deleteDiscipline",
}

enum Mutations {
  ADD_DISCIPLINES = "addDisciplines",
  ADD_DISCIPLINE = "addDiscipline",
  UPDATE_DISCIPLINE = "updateDiscipline",
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

  [Mutations.UPDATE_DISCIPLINE](
    state: State,
    disciplineToUpdate: DisciplinesGetAllItemResponseDto
  ) {
    state.disciplines = state.disciplines.map((discipline) => {
      if (discipline.id === disciplineToUpdate.id) {
        return disciplineToUpdate;
      }
      return discipline;
    });
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
    state.dataStatus = DataStatus.PENDING;
    const { items } = await disciplinesService.getAll();

    commit(Mutations.ADD_DISCIPLINES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    discipline: CreateDisciplineRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newDiscipline = await disciplinesService.create(discipline);

    commit(Mutations.ADD_DISCIPLINE, newDiscipline);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateDisciplineRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedDiscipline = await disciplinesService.update(id, payload);

    commit(Mutations.UPDATE_DISCIPLINE, updatedDiscipline);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_DISCIPLINE](
    { commit }: ActionContext<State, RootState>,
    disciplineId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await disciplinesService.delete(disciplineId);

    commit(Mutations.REMOVE_DISCIPLINE, id);
    state.dataStatus = DataStatus.FULFILLED;
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
