import { AppRoutes } from "@/common/enums/enums";
import { createRouter, createWebHistory } from "vue-router";
import { AuthorizationWrapper } from "@/common/components/components";
import {
  Administration,
  News,
  PublicSchedule,
  SignIn,
  SignUp,
} from "../components/components";
import { pathSlashStripper } from "./helpers/path-slash-stripper.helper";

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
      path: AppRoutes.ADMINISTRATION,
      name: pathSlashStripper(AppRoutes.ADMINISTRATION),
      component: AuthorizationWrapper,
      props: {
        children: Administration,
      },
    },
    {
      path: AppRoutes.NEWS,
      name: pathSlashStripper(AppRoutes.NEWS),
      component: News,
    },
    {
      path: AppRoutes.ALL,
      redirect: AppRoutes.SCHEDULE,
    },
  ],
});

export default router;
