import type { State as AdministrationState } from "./administration/state";
import type { State as AuthState } from "./auth/state";
import type { State as NewsState } from "./news/state";
import type { State as PublicScheduleState } from "./public-schedule/state";

type RootState = {
  administration: AdministrationState;
  auth: AuthState;
  news: NewsState;
  publicSchedule: PublicScheduleState;
};

export { type RootState };
