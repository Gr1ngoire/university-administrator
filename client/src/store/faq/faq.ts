import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { faqMessage as faqMessagesService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  CreateFaqMessageRequestDto,
  FaqMessagesGetAllItemResponseDto,
} from "@/common/types/types";

enum Actions {
  GET_ALL_FAQ_MESSAGES = "getAllFaqMessages",
  CREATE_FAQ_MESSAGE = "createFaqMessage",
}

enum Mutations {
  ADD_FAQ_MESSAGES = "addFaqMessages",
  ADD_FAQ_MESSAGE = "addFaqMessage",
  CLEAR_FAQ_MESSAGES = "clearFaqMessages",
}

const state: State = {
  faqMessages: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_FAQ_MESSAGES](
    state: State,
    faqMessages: FaqMessagesGetAllItemResponseDto[]
  ) {
    state.faqMessages = [...state.faqMessages, ...faqMessages];
  },

  [Mutations.ADD_FAQ_MESSAGE](
    state: State,
    faqMessage: FaqMessagesGetAllItemResponseDto
  ) {
    state.faqMessages.push(faqMessage);
  },

  [Mutations.CLEAR_FAQ_MESSAGES](state: State) {
    state.faqMessages = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_FAQ_MESSAGES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await faqMessagesService.getAll();

    commit(Mutations.CLEAR_FAQ_MESSAGES);
    commit(Mutations.ADD_FAQ_MESSAGES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_FAQ_MESSAGE](
    { commit }: ActionContext<State, RootState>,
    faqMessage: CreateFaqMessageRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newFaqMessage = await faqMessagesService.create(faqMessage);

    commit(Mutations.ADD_FAQ_MESSAGE, newFaqMessage);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const faq: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { faq };
