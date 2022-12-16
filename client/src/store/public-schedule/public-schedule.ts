import type {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { DataStatus } from "@/common/enums/enums";
import { schedule as schedulesService } from "@/services/services";
import type { RootState } from "../root-state";
import type { State } from "./state";
import type { SchedulesGetAllItemResponseDto } from "@/common/types/types";

enum Actions {
  GET_ALL_SCHEDULES = "getAllSchedules",
}

enum Mutations {
  ADD_SCHEDULES = "addSchedules",
}

enum Getters {
  DAY_OF_WEEK_SCHEDULE_MATRIX = "dayOfWeekSchedulesMatrix",
}

const state: State = {
  schedules: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {
  [Getters.DAY_OF_WEEK_SCHEDULE_MATRIX]() {},
};

const mutations: MutationTree<State> = {
  [Mutations.ADD_SCHEDULES](
    state: State,
    schedules: SchedulesGetAllItemResponseDto[]
  ) {
    state.schedules = [...state.schedules, ...schedules];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_SCHEDULES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await schedulesService.getAll();

    commit(Mutations.ADD_SCHEDULES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const publicSchedule: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { publicSchedule };
