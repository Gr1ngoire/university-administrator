import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { news as newsService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateNewsRequestDto,
  NewsGetAllItemResponseDto,
  UpdateNewsRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_NEWS = "getAllNews",
  CREATE_NEWS = "createNews",
  UPDATE_NEWS = "updateNews",
  DELETE_NEWS = "deleteNews",
}

enum Mutations {
  ADD_NEWS = "addNews",
  ADD_ONE_NEWS = "addOneNews",
  UPDATE_NEWS = "updateNews",
  REMOVE_NEWS = "removeNews",
  CLEAR_NEWS = "clearNews",
}

const state: State = {
  news: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_NEWS](state: State, news: NewsGetAllItemResponseDto[]) {
    state.news = [...state.news, ...news];
  },

  [Mutations.ADD_ONE_NEWS](state: State, news: NewsGetAllItemResponseDto) {
    state.news.push(news);
  },

  [Mutations.UPDATE_NEWS](
    state: State,
    newsToUpdate: NewsGetAllItemResponseDto
  ) {
    state.news = state.news.map((news) => {
      if (news.id === newsToUpdate.id) {
        return newsToUpdate;
      }
      return news;
    });
  },

  [Mutations.REMOVE_NEWS](state: State, newsId: number) {
    state.news = state.news.filter((news) => news.id !== newsId);
  },

  [Mutations.CLEAR_NEWS](state: State) {
    state.news = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_NEWS](
    { commit }: ActionContext<State, RootState>,
    searchTitle?: string
  ) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await newsService.getAll(searchTitle);

    commit(Mutations.CLEAR_NEWS);
    commit(Mutations.ADD_NEWS, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_NEWS](
    { commit }: ActionContext<State, RootState>,
    department: CreateNewsRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newDepartment = await newsService.create(department);

    commit(Mutations.ADD_ONE_NEWS, newDepartment);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_NEWS](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateNewsRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedDepartment = await newsService.update(id, payload);

    commit(Mutations.UPDATE_NEWS, updatedDepartment);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_NEWS](
    { commit }: ActionContext<State, RootState>,
    departmentId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await newsService.delete(departmentId);

    commit(Mutations.REMOVE_NEWS, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const news: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { news };
