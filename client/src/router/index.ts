import { AppRoutes } from "@/common/enums/enums";
import { createRouter, createWebHistory } from "vue-router";
import { Disciplines } from "../components/components";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.DISCIPLINES,
      name: "disciplines",
      component: Disciplines,
    },
  ],
});

export default router;
