import { defaultAdministratableOptions } from "@/components/administration/common/common";

type PanelOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

const defaultPanelOptions: PanelOption[] = defaultAdministratableOptions.map(
  ({ id, name }) => ({
    id,
    name,
    isSelected: name === "Disciplines" ? true : false,
  })
);

export { defaultPanelOptions };
