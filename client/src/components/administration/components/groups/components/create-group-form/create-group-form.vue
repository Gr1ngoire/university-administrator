<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type { CreateGroupRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { group as groupValidator } from "@/validators/validators";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

const departments = computed(() => store.state.administration.departments);
const departmentSelectOptions = departments.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const [DEFAULT_DEPARTMENT] = departments.value;
const DEFAULT_COURSE_VALUE = 1;

let groupCreationFormState: CreateGroupRequestDto = {
  departmentId: DEFAULT_DEPARTMENT.id,
  name: "",
  course: DEFAULT_COURSE_VALUE,
};

const groupCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  course: "",
});

const handleGroupCreationValidation: (group: CreateGroupRequestDto) => void = (
  group: CreateGroupRequestDto
): void => {
  try {
    groupValidator.validate(group);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    groupCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleGroupPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  groupCreationFormState = {
    ...groupCreationFormState,
    [input.name]:
      input.name === "departmentId" || input.name === "course"
        ? parseInt(input.value)
        : input.value,
  } as CreateGroupRequestDto;

  groupCreationValidationState[input.name] = "";
  handleGroupCreationValidation(groupCreationFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(groupCreationValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(AdministrationActions.CREATE_GROUP, groupCreationFormState);
    props.onToggle();
  }
};

handleGroupCreationValidation(groupCreationFormState);
</script>

<template>
  <form :class="styles.groupCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="name"
      :onInput="handleGroupPropertyChange"
      :value="groupCreationFormState.name"
      :errorMessage="groupCreationValidationState.name"
    />
    <Input
      type="number"
      name="course"
      :onInput="handleGroupPropertyChange"
      :value="String(groupCreationFormState.course)"
      :errorMessage="groupCreationValidationState.course"
      :max="6"
      :min="1"
    />
    <div :class="styles.selectWrapper">
      <Select
        name="departmentId"
        nameToDisplay="Department"
        :options="departmentSelectOptions"
        :onSelect="handleGroupPropertyChange"
      />
    </div>
    <div :class="styles.groupCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
