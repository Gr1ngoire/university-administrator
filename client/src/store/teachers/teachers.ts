import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { teacher as teachersService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateTeacherRequestDto,
  TeachersGetAllItemResponseDto,
  UpdateTeacherRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_TEACHERS = "getAllTeachers",
  CREATE_TEACHER = "createTeacher",
  UPDATE_TEACHER = "updateTeacher",
  DELETE_TEACHER = "deleteTeacher",
}

enum Mutations {
  ADD_TEACHERS = "addTeachers",
  ADD_TEACHER = "addTeacher",
  UPDATE_TEACHER = "updateTeacher",
  REMOVE_TEACHER = "removeTeacher",
  CLEAR_TEACHERS = "clearTeachers",
}

const state: State = {
  teachers: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_TEACHERS](
    state: State,
    newTeachers: TeachersGetAllItemResponseDto[]
  ) {
    state.teachers = [...state.teachers, ...newTeachers];
  },

  [Mutations.ADD_TEACHER](
    state: State,
    newTeacher: TeachersGetAllItemResponseDto
  ) {
    state.teachers.push(newTeacher);
  },

  [Mutations.UPDATE_TEACHER](
    state: State,
    teacherToUpdate: TeachersGetAllItemResponseDto
  ) {
    state.teachers = state.teachers.map((teacher) => {
      if (teacher.id === teacherToUpdate.id) {
        return teacherToUpdate;
      }
      return teacher;
    });
  },

  [Mutations.REMOVE_TEACHER](state: State, teacherId: number) {
    state.teachers = state.teachers.filter(
      (teacher) => teacher.id !== teacherId
    );
  },

  [Mutations.CLEAR_TEACHERS](state: State) {
    state.teachers = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_TEACHERS]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await teachersService.getAll();

    commit(Mutations.CLEAR_TEACHERS);
    commit(Mutations.ADD_TEACHERS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_TEACHER](
    { commit }: ActionContext<State, RootState>,
    teacher: CreateTeacherRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newTeacher = await teachersService.create(teacher);

    commit(Mutations.ADD_TEACHER, newTeacher);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_TEACHER](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateTeacherRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedTeacher = await teachersService.update(id, payload);

    commit(Mutations.UPDATE_TEACHER, updatedTeacher);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_TEACHER](
    { commit }: ActionContext<State, RootState>,
    teacherId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await teachersService.delete(teacherId);

    commit(Mutations.REMOVE_TEACHER, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const teachers: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { teachers };
