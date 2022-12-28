import { AppRoutes } from "@/common/enums/enums";
import {
  isAdmin as isAdministrator,
  isAuthenticated,
} from "@/common/helpers/helpers";
import { ref } from "@/hooks/hooks";
import { createRouter, createWebHistory } from "vue-router";
import {
  Administration,
  Faq,
  News,
  PublicSchedule,
  SignIn,
  SignUp,
} from "../components/components";
import { pathSlashStripper } from "./helpers/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.SIGN_IN,
      name: pathSlashStripper(AppRoutes.SIGN_IN),
      component: SignIn,
    },
    {
      path: AppRoutes.SIGN_UP,
      name: pathSlashStripper(AppRoutes.SIGN_UP),
      component: SignUp,
    },
    {
      path: AppRoutes.SCHEDULE,
      name: pathSlashStripper(AppRoutes.SCHEDULE),
      component: PublicSchedule,
    },
    {
      path: AppRoutes.NEWS,
      name: pathSlashStripper(AppRoutes.NEWS),
      component: News,
    },
    {
      path: AppRoutes.FAQ,
      name: pathSlashStripper(AppRoutes.FAQ),
      component: Faq,
    },
    {
      path: AppRoutes.ADMINISTRATION,
      name: pathSlashStripper(AppRoutes.ADMINISTRATION),
      component: Administration,
    },
    {
      path: AppRoutes.ALL,
      redirect: AppRoutes.SCHEDULE,
    },
  ],
});

router.beforeEach((to) => {
  const isAuth = ref(isAuthenticated());
  const isAdmin = ref(isAdministrator());
  if (!isAuth) {
    switch (to.path) {
      case AppRoutes.ADMINISTRATION:
        return { path: AppRoutes.SIGN_UP };

      case AppRoutes.FAQ:
        return { path: AppRoutes.SIGN_UP };

      default:
        break;
    }
  }

  if (isAuth && !isAdmin) {
    switch (to.path) {
      case AppRoutes.ADMINISTRATION:
        return { path: AppRoutes.SIGN_UP };

      default:
        break;
    }
  }
});

export default router;
