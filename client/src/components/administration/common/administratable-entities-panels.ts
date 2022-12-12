import type { Component } from "vue";
import { Disciplines } from "../components/components";

type AdministratableOption = {
  id: number;
  component: Component;
};

const defaultAdministratableOptions: AdministratableOption[] = [
  { id: 1, component: Disciplines },
];

export { defaultAdministratableOptions };
