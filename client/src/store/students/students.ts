import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { student as studentsService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateStudentRequestDto,
  StudentsGetAllItemResponseDto,
  UpdateStudentRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_STUDENTS = "getAllStudents",
  CREATE_STUDENT = "createStudent",
  UPDATE_STUDENT = "updateStudent",
  DELETE_STUDENT = "deleteStudent",
}

enum Mutations {
  ADD_STUDENTS = "addStudents",
  ADD_STUDENT = "addStudent",
  UPDATE_STUDENT = "updateStudent",
  REMOVE_STUDENT = "removeStudent",
  CLEAR_STUDENTS = "clearStudents",
}

const state: State = {
  students: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_STUDENTS](
    state: State,
    newStudents: StudentsGetAllItemResponseDto[]
  ) {
    state.students = [...state.students, ...newStudents];
  },

  [Mutations.ADD_STUDENT](
    state: State,
    newStudent: StudentsGetAllItemResponseDto
  ) {
    state.students.push(newStudent);
  },

  [Mutations.UPDATE_STUDENT](
    state: State,
    studentToUpdate: StudentsGetAllItemResponseDto
  ) {
    state.students = state.students.map((student) => {
      if (student.id === studentToUpdate.id) {
        return studentToUpdate;
      }
      return student;
    });
  },

  [Mutations.REMOVE_STUDENT](state: State, studentId: number) {
    state.students = state.students.filter((group) => group.id !== studentId);
  },

  [Mutations.CLEAR_STUDENTS](state: State) {
    state.students = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_STUDENTS]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await studentsService.getAll();

    commit(Mutations.CLEAR_STUDENTS);
    commit(Mutations.ADD_STUDENTS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_STUDENT](
    { commit }: ActionContext<State, RootState>,
    student: CreateStudentRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newStudent = await studentsService.create(student);

    commit(Mutations.ADD_STUDENT, newStudent);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_STUDENT](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateStudentRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedStudent = await studentsService.update(id, payload);

    commit(Mutations.UPDATE_STUDENT, updatedStudent);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_STUDENT](
    { commit }: ActionContext<State, RootState>,
    groupId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await studentsService.delete(groupId);

    commit(Mutations.REMOVE_STUDENT, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const students: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { students };
