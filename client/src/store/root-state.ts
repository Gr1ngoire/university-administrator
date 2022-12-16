import type { State as AdministrationState } from "./administration/state";
import type { State as NewsState } from "./news/state";
import type { State as PublicScheduleState } from "./public-schedule/state";

type RootState = {
  administration: AdministrationState;
  news: NewsState;
  publicSchedule: PublicScheduleState;
};

export { type RootState };
