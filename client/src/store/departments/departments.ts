import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { department as departmentsService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateDepartmentRequestDto,
  DepartmentsGetAllItemResponseDto,
  UpdateDepartmentRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_DEPARTMENTS = "getAllDepartments",
  CREATE_DEPARTMENT = "createDepartment",
  UPDATE_DEPARTMENT = "updateDepartment",
  DELETE_DEPARTMENT = "deleteDepartment",
}

enum Mutations {
  ADD_DEPARTMENTS = "addDepartments",
  ADD_DEPARTMENT = "addDepartment",
  UPDATE_DEPARTMENT = "updateDepartment",
  REMOVE_DEPARTMENT = "removeDepartment",
  CLEAR_DEPARTMENTS = "clearDepartments",
}

const state: State = {
  departments: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_DEPARTMENTS](
    state: State,
    newDepartments: DepartmentsGetAllItemResponseDto[]
  ) {
    state.departments = [...state.departments, ...newDepartments];
  },

  [Mutations.ADD_DEPARTMENT](
    state: State,
    newDepartment: DepartmentsGetAllItemResponseDto
  ) {
    state.departments.push(newDepartment);
  },

  [Mutations.UPDATE_DEPARTMENT](
    state: State,
    departmentToUpdate: DepartmentsGetAllItemResponseDto
  ) {
    state.departments = state.departments.map((department) => {
      if (department.id === departmentToUpdate.id) {
        return departmentToUpdate;
      }
      return department;
    });
  },

  [Mutations.REMOVE_DEPARTMENT](state: State, departmentId: number) {
    state.departments = state.departments.filter(
      (department) => department.id !== departmentId
    );
  },

  [Mutations.CLEAR_DEPARTMENTS](state: State) {
    state.departments = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_DEPARTMENTS]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await departmentsService.getAll();

    commit(Mutations.CLEAR_DEPARTMENTS);
    commit(Mutations.ADD_DEPARTMENT, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_DEPARTMENT](
    { commit }: ActionContext<State, RootState>,
    department: CreateDepartmentRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newDepartment = await departmentsService.create(department);

    commit(Mutations.ADD_DEPARTMENT, newDepartment);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_DEPARTMENT](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateDepartmentRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedDepartment = await departmentsService.update(id, payload);

    commit(Mutations.UPDATE_DEPARTMENT, updatedDepartment);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_DEPARTMENT](
    { commit }: ActionContext<State, RootState>,
    teacherId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await departmentsService.delete(teacherId);

    commit(Mutations.REMOVE_DEPARTMENT, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const departments: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { departments };
