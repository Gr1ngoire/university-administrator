import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { group as groupsService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateGroupRequestDto,
  GroupsGetAllItemResponseDto,
  UpdateGroupRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_GROUPS = "getAllGroups",
  CREATE_GROUP = "createGroup",
  UPDATE_GROUP = "updateGroup",
  DELETE_GROUP = "deleteGroup",
}

enum Mutations {
  ADD_GROUPS = "addGroups",
  ADD_GROUP = "addGroup",
  UPDATE_GROUP = "updateGroup",
  REMOVE_GROUP = "removeGroup",
  CLEAR_GROUPS = "clearGroups",
}

const state: State = {
  groups: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_GROUPS](
    state: State,
    newGroups: GroupsGetAllItemResponseDto[]
  ) {
    state.groups = [...state.groups, ...newGroups];
  },

  [Mutations.ADD_GROUP](state: State, newGroup: GroupsGetAllItemResponseDto) {
    state.groups.push(newGroup);
  },

  [Mutations.UPDATE_GROUP](
    state: State,
    groupToUpdate: GroupsGetAllItemResponseDto
  ) {
    state.groups = state.groups.map((group) => {
      if (group.id === groupToUpdate.id) {
        return groupToUpdate;
      }
      return group;
    });
  },

  [Mutations.REMOVE_GROUP](state: State, groupId: number) {
    state.groups = state.groups.filter((group) => group.id !== groupId);
  },

  [Mutations.CLEAR_GROUPS](state: State) {
    state.groups = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_GROUPS]({ commit }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await groupsService.getAll();

    commit(Mutations.CLEAR_GROUPS);
    commit(Mutations.ADD_GROUPS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_GROUP](
    { commit }: ActionContext<State, RootState>,
    group: CreateGroupRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newGroup = await groupsService.create(group);

    commit(Mutations.ADD_GROUP, newGroup);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_GROUP](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateGroupRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedGroup = await groupsService.update(id, payload);

    commit(Mutations.UPDATE_GROUP, updatedGroup);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_GROUP](
    { commit }: ActionContext<State, RootState>,
    groupId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await groupsService.delete(groupId);

    commit(Mutations.REMOVE_GROUP, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const groups: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { groups };
