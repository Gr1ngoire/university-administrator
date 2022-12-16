import type { State as AdministrationState } from "./administration/state";
import type { State as NewsState } from "./news/state";

type RootState = {
  administration: AdministrationState;
  news: NewsState;
};

export { type RootState };
