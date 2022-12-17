import { AppRoutes } from "@/common/enums/enums";
import { createRouter, createWebHistory } from "vue-router";
import { Administration, News, PublicSchedule } from "../components/components";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.SCHEDULE,
      name: "schedule",
      component: PublicSchedule,
    },
    {
      path: AppRoutes.ADMINISTRATION,
      name: "administration",
      component: Administration,
    },
    {
      path: AppRoutes.NEWS,
      name: "news",
      component: News,
    },
    {
      path: AppRoutes.ALL,
      redirect: AppRoutes.SCHEDULE,
    },
  ],
});

export default router;
