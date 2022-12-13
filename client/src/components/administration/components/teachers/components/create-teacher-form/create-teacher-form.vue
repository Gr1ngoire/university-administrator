<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type { CreateTeacherRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { teacher as teacherValidator } from "@/validators/validators";
import { reactive, useStore } from "@/hooks/hooks";
import { TeachersActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

let teacherCreationFormState: CreateTeacherRequestDto =
  reactive<CreateTeacherRequestDto>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

const teacherCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  surname: "",
  email: "",
  phone: "",
});

const handleTeacherCreationValidation: (
  teacher: CreateTeacherRequestDto
) => void = (teacher: CreateTeacherRequestDto): void => {
  try {
    teacherValidator.validate(teacher);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    teacherCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleTeacherPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  teacherCreationFormState = {
    ...teacherCreationFormState,
    [input.name]: input.value,
  } as CreateTeacherRequestDto;

  teacherCreationValidationState[input.name] = "";
  handleTeacherCreationValidation(teacherCreationFormState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(teacherCreationValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(TeachersActions.CREATE_TEACHER, teacherCreationFormState);
    props.onToggle();
  }
};

handleTeacherCreationValidation(teacherCreationFormState);
</script>

<template>
  <form :class="styles.teacherCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="email"
      :onInput="handleTeacherPropertyChange"
      :errorMessage="teacherCreationValidationState.email"
    />
    <Input
      type="text"
      name="phone"
      :onInput="handleTeacherPropertyChange"
      :errorMessage="teacherCreationValidationState.phone"
    />
    <Input
      type="text"
      name="name"
      :onInput="handleTeacherPropertyChange"
      :errorMessage="teacherCreationValidationState.name"
    />
    <Input
      type="text"
      name="surname"
      :onInput="handleTeacherPropertyChange"
      :errorMessage="teacherCreationValidationState.surname"
    />
    <div :class="styles.teacherCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
