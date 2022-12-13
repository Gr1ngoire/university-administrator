<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type {
  TeachersGetAllItemResponseDto,
  UpdateTeacherRequestDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { teacher as teacherValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { TeachersActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  initialTeacher: TeachersGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

let teacherUpdateFormState: UpdateTeacherRequestDto =
  reactive<UpdateTeacherRequestDto>({
    email: props.initialTeacher.email,
    phone: props.initialTeacher.phone,
    name: props.initialTeacher.name,
    surname: props.initialTeacher.surname,
  });

const teacherUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  email: "",
  phone: "",
  name: "",
  surname: "",
});

const handleTeacherUpdateValidation: (
  teacher: UpdateTeacherRequestDto
) => void = (teacher: UpdateTeacherRequestDto): void => {
  try {
    teacherValidator.validate(teacher);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    teacherUpdateValidationState[validationError.field] =
      validationError.message;
  }
};

const handleTeacherPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  teacherUpdateFormState = {
    ...teacherUpdateFormState,
    [input.name]: input.value,
  } as UpdateTeacherRequestDto;

  teacherUpdateValidationState[input.name] = "";
  handleTeacherUpdateValidation(teacherUpdateFormState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(teacherUpdateValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(TeachersActions.UPDATE_TEACHER, {
      id: props.initialTeacher.id,
      payload: teacherUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.teacherUpdateForm" @submit="handleSubmit">
    <div :class="styles.teacherUpdateActionSectionWrapper">
      <div :class="styles.teacherEditFieldsWrapper">
        <div :class="styles.teacherEditInputWrapper">
          <Input
            type="text"
            name="email"
            :value="teacherUpdateFormState.email"
            :onInput="handleTeacherPropertyChange"
            :errorMessage="teacherUpdateValidationState.email"
          />
        </div>
        <div :class="styles.teacherEditInputWrapper">
          <Input
            type="text"
            name="phone"
            :value="teacherUpdateFormState.phone"
            :onInput="handleTeacherPropertyChange"
            :errorMessage="teacherUpdateValidationState.phone"
          />
        </div>
        <div :class="styles.teacherEditInputWrapper">
          <Input
            type="text"
            name="name"
            :value="teacherUpdateFormState.name"
            :onInput="handleTeacherPropertyChange"
            :errorMessage="teacherUpdateValidationState.name"
          />
        </div>
        <div :class="styles.teacherEditInputWrapper">
          <Input
            type="text"
            name="surname"
            :value="teacherUpdateFormState.surname"
            :onInput="handleTeacherPropertyChange"
            :errorMessage="teacherUpdateValidationState.surname"
          />
        </div>
      </div>
      <div :class="styles.teacherActionButtonsWrapper">
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
