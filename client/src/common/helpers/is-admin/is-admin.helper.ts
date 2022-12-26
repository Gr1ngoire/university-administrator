import { Grants } from "@/common/enums/enums";
import { store } from "@/store/store";

const isAdmin = () => {
  const user = store.state.auth.currentUser;

  if (!user) {
    return false;
  }

  return user.grant === Grants.ADMIN;
};

export { isAdmin };
