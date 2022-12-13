import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { faculty as facultiesService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateFacultyRequestDto,
  FacultiesGetAllItemResponseDto,
  UpdateFacultyRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_FACULTIES = "getAllFaculties",
  CREATE_FACULTY = "createFaculty",
  UPDATE_FACULTY = "updateFaculty",
  DELETE_FACULTY = "deleteFaculty",
}

enum Mutations {
  ADD_FACULTIES = "addFaculties",
  ADD_FACULTY = "addFaculty",
  UPDATE_FACULTY = "updateFaculty",
  REMOVE_FACULTY = "removeFaculty",
  CLEAR_FACULTIES = "clearFaculties",
}

const state: State = {
  faculties: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_FACULTIES](
    state: State,
    newFaculties: FacultiesGetAllItemResponseDto[]
  ) {
    state.faculties = [...state.faculties, ...newFaculties];
  },

  [Mutations.ADD_FACULTY](
    state: State,
    newFaculty: FacultiesGetAllItemResponseDto
  ) {
    state.faculties.push(newFaculty);
  },

  [Mutations.UPDATE_FACULTY](
    state: State,
    facultyToUpdate: FacultiesGetAllItemResponseDto
  ) {
    state.faculties = state.faculties.map((faculty) => {
      if (faculty.id === facultyToUpdate.id) {
        return facultyToUpdate;
      }
      return faculty;
    });
  },

  [Mutations.REMOVE_FACULTY](state: State, facultyId: number) {
    state.faculties = state.faculties.filter(
      (faculty) => faculty.id !== facultyId
    );
  },

  [Mutations.CLEAR_FACULTIES](state: State) {
    state.faculties = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_FACULTIES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await facultiesService.getAll();

    commit(Mutations.CLEAR_FACULTIES);
    commit(Mutations.ADD_FACULTIES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_FACULTY](
    { commit }: ActionContext<State, RootState>,
    faculty: CreateFacultyRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newFaculty = await facultiesService.create(faculty);

    commit(Mutations.ADD_FACULTY, newFaculty);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_FACULTY](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateFacultyRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedFaculty = await facultiesService.update(id, payload);

    commit(Mutations.UPDATE_FACULTY, updatedFaculty);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_FACULTY](
    { commit }: ActionContext<State, RootState>,
    facultyId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await facultiesService.delete(facultyId);

    commit(Mutations.REMOVE_FACULTY, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const faculties: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { faculties };
