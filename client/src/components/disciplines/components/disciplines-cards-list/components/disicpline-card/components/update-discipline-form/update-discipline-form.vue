<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type {
  DisciplinesGetAllItemResponseDto,
  UpdateDisciplineRequestDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { discipline as disciplinesValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { DisciplinesActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  initialDiscipline: DisciplinesGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

let disciplineCreationFormState: UpdateDisciplineRequestDto =
  reactive<UpdateDisciplineRequestDto>({
    name: props.initialDiscipline.name,
  });

const disciplineCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
});

const handleDisicplineUpdateValidation: (
  discipline: UpdateDisciplineRequestDto
) => void = (discipline: UpdateDisciplineRequestDto): void => {
  try {
    disciplinesValidator.validate(discipline);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    disciplineCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleDisciplinePropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  disciplineCreationFormState = {
    ...disciplineCreationFormState,
    [input.name]: input.value,
  } as UpdateDisciplineRequestDto;

  disciplineCreationValidationState[input.name] = "";
  handleDisicplineUpdateValidation(disciplineCreationFormState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(disciplineCreationValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(DisciplinesActions.UPDATE_DISCIPLINE, {
      id: props.initialDiscipline.id,
      payload: disciplineCreationFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.disciplineUpdateForm" @submit="handleSubmit">
    <div :class="styles.disciplineUpdateActionSectionWrapper">
      <Button type="submit" name="Update" action="submit" />
      <div :class="styles.disciplineEditInputWrapper">
        <Input
          type="text"
          name="name"
          :value="disciplineCreationFormState.name"
          :onInput="handleDisciplinePropertyChange"
          :errorMessage="disciplineCreationValidationState.name"
        />
      </div>
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
