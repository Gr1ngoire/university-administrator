import type { Component } from "vue";
import {
  Departments,
  Disciplines,
  Faculties,
  Groups,
  Schedules,
  Students,
  Teachers,
  Users,
} from "../components/components";

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
  {
    id: 3,
    name: "Departments",
    component: Departments,
  },
  {
    id: 4,
    name: "Teachers",
    component: Teachers,
  },
  {
    id: 5,
    name: "Groups",
    component: Groups,
  },
  {
    id: 6,
    name: "Students",
    component: Students,
  },
  {
    id: 7,
    name: "Schedules",
    component: Schedules,
  },
  {
    id: 8,
    name: "Users",
    component: Users,
  },
];

export { defaultAdministratableOptions };
