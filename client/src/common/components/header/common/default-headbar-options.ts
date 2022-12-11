import { AppRoutes } from "@/common/enums/enums";

type HeaderSelectOption = {
  id: number;
  link: string;
  name: string;
  isSelected: boolean;
};

const defaultSelectOptions: HeaderSelectOption[] = [
  {
    id: 1,
    link: AppRoutes.DEPARTMENTS,
    name: "Departments",
    isSelected: false,
  },
  {
    id: 2,
    link: AppRoutes.DISCIPLINES,
    name: "Disciplines",
    isSelected: false,
  },
  {
    id: 3,
    link: AppRoutes.FACULTIES,
    name: "Faculties",
    isSelected: false,
  },
  {
    id: 4,
    link: AppRoutes.GROUPS,
    name: "Groups",
    isSelected: false,
  },
  {
    id: 5,
    link: AppRoutes.NEWS,
    name: "News",
    isSelected: false,
  },
  {
    id: 6,
    link: AppRoutes.SCHEDULES,
    name: "Schedules",
    isSelected: false,
  },
  {
    id: 7,
    link: AppRoutes.STUDENTS,
    name: "Students",
    isSelected: false,
  },
  {
    id: 8,
    link: AppRoutes.TEACHERS,
    name: "Teachers",
    isSelected: false,
  },
];

export { defaultSelectOptions };
