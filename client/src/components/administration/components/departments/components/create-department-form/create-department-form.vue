<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type { CreateDepartmentRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { department as departmentValidator } from "@/validators/validators";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

const faculties = computed(() => store.state.administration.faculties);
const facultySelectOptions = faculties.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const [DEFAULT_FACULTY] = faculties.value;

let departmentCreationFormState: CreateDepartmentRequestDto = {
  facultyId: DEFAULT_FACULTY.id,
  name: "",
  shortName: "",
};

const departmentCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  shortName: "",
});

const handleDepartmentCreationValidation: (
  department: CreateDepartmentRequestDto
) => void = (department: CreateDepartmentRequestDto): void => {
  try {
    departmentValidator.validate(department);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    departmentCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleDepartmentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  departmentCreationFormState = {
    ...departmentCreationFormState,
    [input.name]:
      input.name === "facultyId" ? parseInt(input.value) : input.value,
  } as CreateDepartmentRequestDto;

  departmentCreationValidationState[input.name] = "";
  handleDepartmentCreationValidation(departmentCreationFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(departmentCreationValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(
      AdministrationActions.CREATE_DEPARTMENT,
      departmentCreationFormState
    );
    props.onToggle();
  }
};

handleDepartmentCreationValidation(departmentCreationFormState);
</script>

<template>
  <form :class="styles.departmentCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="name"
      :onInput="handleDepartmentPropertyChange"
      :value="departmentCreationFormState.name"
      :errorMessage="departmentCreationValidationState.name"
    />
    <Input
      type="text"
      name="shortName"
      nameToDisplay="Short name"
      :onInput="handleDepartmentPropertyChange"
      :value="departmentCreationFormState.shortName"
      :errorMessage="departmentCreationValidationState.shortName"
    />
    <div :class="styles.selectWrapper">
      <Select
        name="facultyId"
        nameToDisplay="Faculty"
        :options="facultySelectOptions"
        :onSelect="handleDepartmentPropertyChange"
      />
    </div>
    <div :class="styles.departmentCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
