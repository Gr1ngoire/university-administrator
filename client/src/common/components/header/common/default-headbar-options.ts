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
    link: AppRoutes.SCHEDULE,
    name: "Schedule",
    isSelected: false,
  },
  {
    id: 2,
    link: AppRoutes.FAQ,
    name: "Faq",
    isSelected: false,
  },
  {
    id: 3,
    link: AppRoutes.ADMINISTRATION,
    name: "Administration",
    isSelected: false,
  },
];

export { defaultSelectOptions };
