import type { Component } from "vue";
import { Disciplines, Faculties } from "../components/components";

type AdministratableOption = {
  id: number;
  name: string;
  component: Component;
};

const defaultAdministratableOptions: AdministratableOption[] = [
  {
    id: 1,
    name: "Disciplines",
    component: Disciplines,
  },
  {
    id: 2,
    name: "Faculties",
    component: Faculties,
  },
];

export { defaultAdministratableOptions };
