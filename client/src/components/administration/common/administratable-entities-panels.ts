import type { Component } from "vue";
import { Disciplines } from "../components/components";

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
];

export { defaultAdministratableOptions };
