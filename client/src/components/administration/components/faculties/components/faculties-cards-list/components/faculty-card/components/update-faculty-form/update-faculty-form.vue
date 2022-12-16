<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type {
  FacultiesGetAllItemResponseDto,
  UpdateFacultyRequestDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { faculty as facultyValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  initialFaculty: FacultiesGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

let facultyUpdateFormState: UpdateFacultyRequestDto = {
  name: props.initialFaculty.name,
  shortName: props.initialFaculty.shortName,
};

const facultyUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  shortName: "",
});

const handleFacultyUpdateValidation: (
  faculty: UpdateFacultyRequestDto
) => void = (faculty: UpdateFacultyRequestDto): void => {
  try {
    facultyValidator.validate(faculty);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    facultyUpdateValidationState[validationError.field] =
      validationError.message;
  }
};

const handleFacultyPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  facultyUpdateFormState = {
    ...facultyUpdateFormState,
    [input.name]: input.value,
  } as UpdateFacultyRequestDto;

  facultyUpdateValidationState[input.name] = "";
  handleFacultyUpdateValidation(facultyUpdateFormState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(facultyUpdateValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(AdministrationActions.UPDATE_FACULTY, {
      id: props.initialFaculty.id,
      payload: facultyUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.facultyUpdateForm" @submit="handleSubmit">
    <div :class="styles.facultyUpdateActionSectionWrapper">
      <div :class="styles.facultyEditFieldsWrapper">
        <div :class="styles.facultyEditInputWrapper">
          <Input
            type="text"
            name="name"
            :value="facultyUpdateFormState.name"
            :onInput="handleFacultyPropertyChange"
            :errorMessage="facultyUpdateValidationState.name"
          />
        </div>
        <div :class="styles.facultyEditInputWrapper">
          <Input
            type="text"
            name="shortName"
            nameToDisplay="Short name"
            :value="facultyUpdateFormState.shortName"
            :onInput="handleFacultyPropertyChange"
            :errorMessage="facultyUpdateValidationState.shortName"
          />
        </div>
      </div>
      <div :class="styles.facultyActionButtonsWrapper">
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
