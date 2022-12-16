<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type {
  StudentsGetAllItemResponseDto,
  UpdateStudentRequestDto,
} from "@/common/types/types";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { student as studentValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { AdministrationActions } from "@/store/actions

import styles from "./styles.module.scss";

type Props = {
  initialStudent: StudentsGetAllItemResponseDto;
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

let studentUpdateFormState: UpdateStudentRequestDto = {
  name: props.initialStudent.name,
  email: props.initialStudent.email,
  phone: props.initialStudent.phone,
  groupId: props.initialStudent.groupId,
};

const studentUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  email: "",
  phone: "",
});

const handleStudentUpdateValidation: (
  student: UpdateStudentRequestDto
) => void = (student: UpdateStudentRequestDto): void => {
  try {
    studentValidator.validate(student);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    studentUpdateValidationState[validationError.field] =
      validationError.message;
  }
};

const handleStudentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  studentUpdateFormState = {
    ...studentUpdateFormState,
    [input.name]:
      input.name === "groupId" ? parseInt(input.value) : input.value,
  } as UpdateStudentRequestDto;

  studentUpdateValidationState[input.name] = "";
  handleStudentUpdateValidation(studentUpdateFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(studentUpdateValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(AdministrationActions.UPDATE_STUDENT, {
      id: props.initialStudent.id,
      payload: studentUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.studentUpdateForm" @submit="handleSubmit">
    <div :class="styles.studentUpdateActionSectionWrapper">
      <div :class="styles.studentEditFieldsWrapper">
        <div :class="styles.studentEditInputWrapper">
          <Input
            type="text"
            name="name"
            :value="studentUpdateFormState.name"
            :onInput="handleStudentPropertyChange"
            :errorMessage="studentUpdateValidationState.name"
          />
        </div>
        <div :class="styles.studentEditInputWrapper">
          <Input
            type="email"
            name="email"
            :value="studentUpdateFormState.email"
            :onInput="handleStudentPropertyChange"
            :errorMessage="studentUpdateValidationState.email"
          />
        </div>
        <div :class="styles.studentEditInputWrapper">
          <Input
            type="text"
            name="phone"
            :value="studentUpdateFormState.phone"
            :onInput="handleStudentPropertyChange"
            :errorMessage="studentUpdateValidationState.phone"
          />
        </div>
        <div :class="styles.studentEditSelectWrapper">
          <Select
            name="groupId"
            nameToDisplay="Group"
            :options="groupSelectOptions"
            :onSelect="handleStudentPropertyChange"
            :defaultOptionId="initialStudent.groupId"
          />
        </div>
        <div :class="styles.studentActionButtonsWrapper">
          <Button type="submit" name="Update" action="submit" />
          <Button
            type="click"
            name="Cancel"
            action="cancel"
            :onClick="onToggle"
          />
        </div>
      </div>
    </div>
  </form>
</template>
