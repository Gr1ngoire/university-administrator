<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type { CreateStudentRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { student as studentValidator } from "@/validators/validators";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

const groups = computed(() => store.state.administration.groups);
const groupSelectOptions = groups.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const [DEFAULT_GROUP] = groups.value;

let studentCreationFormState: CreateStudentRequestDto = {
  name: "",
  email: "",
  phone: "",
  groupId: DEFAULT_GROUP.id,
};

const studentCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  email: "",
  phone: "",
});

const handleStudentCreationValidation: (
  student: CreateStudentRequestDto
) => void = (student: CreateStudentRequestDto): void => {
  try {
    studentValidator.validate(student);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    studentCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleStudentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  studentCreationFormState = {
    ...studentCreationFormState,
    [input.name]:
      input.name === "groupId" ? parseInt(input.value) : input.value,
  } as CreateStudentRequestDto;

  studentCreationValidationState[input.name] = "";
  handleStudentCreationValidation(studentCreationFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(studentCreationValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(
      AdministrationActions.CREATE_STUDENT,
      studentCreationFormState
    );
    props.onToggle();
  }
};

handleStudentCreationValidation(studentCreationFormState);
</script>

<template>
  <form :class="styles.studentCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="name"
      :onInput="handleStudentPropertyChange"
      :value="studentCreationFormState.name"
      :errorMessage="studentCreationValidationState.name"
    />
    <Input
      type="email"
      name="email"
      :onInput="handleStudentPropertyChange"
      :value="studentCreationFormState.email"
      :errorMessage="studentCreationValidationState.email"
    />
    <Input
      type="text"
      name="phone"
      :onInput="handleStudentPropertyChange"
      :value="studentCreationFormState.phone"
      :errorMessage="studentCreationValidationState.phone"
    />
    <div :class="styles.selectWrapper">
      <Select
        name="groupId"
        nameToDisplay="Group"
        :options="groupSelectOptions"
        :onSelect="handleStudentPropertyChange"
      />
    </div>
    <div :class="styles.studentCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
