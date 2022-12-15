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
import type {
  CreateScheduleRequestDto,
  SchedulesGetAllItemResponseDto,
  UpdateScheduleRequestParams,
} from "@/common/types/types";

enum Actions {
  GET_ALL_SCHEDULES = "getAllSchedules",
  CREATE_SCHEDULE = "createSchedule",
  UPDATE_SCHEDULE = "updateSchedule",
  DELETE_SCHEDULE = "deleteSchedule",
}

enum Mutations {
  ADD_SCHEDULES = "addSchedules",
  ADD_SCHEDULE = "addSchedule",
  UPDATE_SCHEDULE = "updateSchedule",
  REMOVE_SCHEDULE = "removeSchedule",
  CLEAR_SCHEDULES = "clearSchedules",
}

const state: State = {
  schedules: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {};

const mutations: MutationTree<State> = {
  [Mutations.ADD_SCHEDULES](
    state: State,
    newSchedules: SchedulesGetAllItemResponseDto[]
  ) {
    state.schedules = [...state.schedules, ...newSchedules];
  },

  [Mutations.ADD_SCHEDULE](
    state: State,
    newSchedule: SchedulesGetAllItemResponseDto
  ) {
    state.schedules.push(newSchedule);
  },

  [Mutations.UPDATE_SCHEDULE](
    state: State,
    scheduleToUpdate: SchedulesGetAllItemResponseDto
  ) {
    state.schedules = state.schedules.map((schedule) => {
      if (schedule.id === scheduleToUpdate.id) {
        return scheduleToUpdate;
      }
      return schedule;
    });
  },

  [Mutations.REMOVE_SCHEDULE](state: State, scheduleId: number) {
    state.schedules = state.schedules.filter(
      (schedule) => schedule.id !== scheduleId
    );
  },

  [Mutations.CLEAR_SCHEDULES](state: State) {
    state.schedules = [];
  },
};

const actions: ActionTree<State, RootState> = {
  async [Actions.GET_ALL_SCHEDULES]({
    commit,
  }: ActionContext<State, RootState>) {
    state.dataStatus = DataStatus.PENDING;
    const { items } = await schedulesService.getAll();

    commit(Mutations.CLEAR_SCHEDULES);
    commit(Mutations.ADD_SCHEDULES, items);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.CREATE_SCHEDULE](
    { commit }: ActionContext<State, RootState>,
    schedule: CreateScheduleRequestDto
  ) {
    state.dataStatus = DataStatus.PENDING;
    const newSchedule = await schedulesService.create(schedule);

    commit(Mutations.ADD_SCHEDULE, newSchedule);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.UPDATE_SCHEDULE](
    { commit }: ActionContext<State, RootState>,
    { id, payload }: UpdateScheduleRequestParams
  ) {
    state.dataStatus = DataStatus.PENDING;
    const updatedSchedule = await schedulesService.update(id, payload);

    commit(Mutations.UPDATE_SCHEDULE, updatedSchedule);
    state.dataStatus = DataStatus.FULFILLED;
  },

  async [Actions.DELETE_SCHEDULE](
    { commit }: ActionContext<State, RootState>,
    scheduleId: number
  ) {
    state.dataStatus = DataStatus.PENDING;
    const id = await schedulesService.delete(scheduleId);

    commit(Mutations.REMOVE_SCHEDULE, id);
    state.dataStatus = DataStatus.FULFILLED;
  },
};

const schedules: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { schedules };
