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
  CLEAR_SCHEDULES = "clearSchedules",
}

enum Getters {
  DAY_OF_WEEK_SCHEDULE_MATRIX = "dayOfWeekSchedulesMatrix",
}

const state: State = {
  schedules: [],
  dataStatus: DataStatus.IDLE,
};

const getters: GetterTree<State, RootState> = {
  [Getters.DAY_OF_WEEK_SCHEDULE_MATRIX](
    state: State
  ): SchedulesGetAllItemResponseDto[][] {
    const TIME_SPLITTER = " ";

    const sortedSchedulesByDayOfWeek = [...state.schedules].sort(
      (
        a: SchedulesGetAllItemResponseDto,
        b: SchedulesGetAllItemResponseDto
      ) => {
        const [aDate] = a.time.split(TIME_SPLITTER);
        const [bDate] = b.time.split(TIME_SPLITTER);
        return new Date(aDate).getDay() - new Date(bDate).getDay();
      }
    );
    const result: SchedulesGetAllItemResponseDto[][] = [];
    let dayOfWeekIndex = 0;
    const DAY_OF_WEEK_INDEX_LIMIT = 7;
    while (dayOfWeekIndex < DAY_OF_WEEK_INDEX_LIMIT) {
      const scheduleRecordsForParticularDayOfWeek =
        sortedSchedulesByDayOfWeek.filter(({ time }) => {
          const [date] = time.split(TIME_SPLITTER);
          return new Date(date).getDay() === dayOfWeekIndex;
        });
      result.push(scheduleRecordsForParticularDayOfWeek);
      dayOfWeekIndex++;
    }

    return result;
  },
};

const mutations: MutationTree<State> = {
  [Mutations.ADD_SCHEDULES](
    state: State,
    schedules: SchedulesGetAllItemResponseDto[]
  ) {
    state.schedules = [...state.schedules, ...schedules];
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
};

const publicSchedule: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { publicSchedule };
