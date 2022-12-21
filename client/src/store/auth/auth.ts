import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { auth as authService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type {
  UserSignInRequestDto,
  UserSignUpRequestDto,
  UserWithGrantDto,
} from "@/common/types/types";

enum Actions {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
  LOG_OUT = "logOut",
}

enum Mutations {
  SET_USER = "setUser",
  CLEAR_USER = "clearUser",
}

const state: State = {
  currentUser: null,
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.SET_USER](state: State, newUser: UserWithGrantDto) {
    state.currentUser = newUser;
  },

  [Mutations.CLEAR_USER](state: State) {
    state.currentUser = null;
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.SIGN_IN](
    { commit }: ActionContext<State, RootState>,
    signinDto: UserSignInRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const { user } = await authService.signIn(signinDto);

    commit(Mutations.SET_USER, user);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.SIGN_UP](
    { commit }: ActionContext<State, RootState>,
    signUpDto: UserSignUpRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const { user } = await authService.signUp(signUpDto);

    commit(Mutations.SET_USER, user);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.LOG_OUT]({ commit }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;

    commit(Mutations.CLEAR_USER);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const auth: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { auth };
