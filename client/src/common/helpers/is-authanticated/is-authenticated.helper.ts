import { store } from "@/store/store";

const isAuthenticated = () => {
  const user = store.state.auth.currentUser;

  return Boolean(user);
};

export { isAuthenticated };
