<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type {
  DepartmentsGetAllItemResponseDto,
  UpdateDepartmentRequestDto,
} from "@/common/types/types";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { department as departmentValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { DepartmentsActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  initialDepartment: DepartmentsGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();
const faculties = computed(() => store.state.faculties.faculties);
const facultySelectOptions = faculties.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

let departmentUpdateFormState: UpdateDepartmentRequestDto = {
  name: props.initialDepartment.name,
  shortName: props.initialDepartment.shortName,
  facultyId: props.initialDepartment.facultyId,
};

const departmentUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  shortName: "",
});

const handleDepartmentUpdateValidation: (
  department: UpdateDepartmentRequestDto
) => void = (department: UpdateDepartmentRequestDto): void => {
  try {
    departmentValidator.validate(department);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    departmentUpdateValidationState[validationError.field] =
      validationError.message;
  }
};

const handleDepartmentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  departmentUpdateFormState = {
    ...departmentUpdateFormState,
    [input.name]:
      input.name === "facultyId" ? parseInt(input.value) : input.value,
  } as UpdateDepartmentRequestDto;

  departmentUpdateValidationState[input.name] = "";
  handleDepartmentUpdateValidation(departmentUpdateFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(departmentUpdateValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(DepartmentsActions.UPDATE_DEPARTMENT, {
      id: props.initialDepartment.id,
      payload: departmentUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.departmentUpdateForm" @submit="handleSubmit">
    <div :class="styles.departmentUpdateActionSectionWrapper">
      <div :class="styles.departmentEditFieldsWrapper">
        <div :class="styles.departmentEditInputWrapper">
          <Input
            type="text"
            name="name"
            :value="departmentUpdateFormState.name"
            :onInput="handleDepartmentPropertyChange"
            :errorMessage="departmentUpdateValidationState.name"
          />
        </div>
        <div :class="styles.departmentEditInputWrapper">
          <Input
            type="text"
            name="shortName"
            :value="departmentUpdateFormState.shortName"
            :onInput="handleDepartmentPropertyChange"
            :errorMessage="departmentUpdateValidationState.shortName"
          />
        </div>
        <div :class="styles.departmentEditSelectWrapper">
          <Select
            name="facultyId"
            :options="facultySelectOptions"
            :onSelect="handleDepartmentPropertyChange"
            :defaultOptionId="initialDepartment.facultyId"
          />
        </div>
      </div>
      <div :class="styles.departmentActionButtonsWrapper">
        <Button type="submit" name="Update" action="submit" />
        <Button
          type="click"
          name="Cancel"
          action="cancel"
          :onClick="onToggle"
        />
      </div>
    </div>
  </form>
</template>
