<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type { CreateDisciplineRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { discipline as disciplinesValidator } from "@/validators/validators";
import { reactive, useStore } from "@/hooks/hooks";
import { DisciplinesActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

let disciplineCreationFormState: CreateDisciplineRequestDto = {
  name: "",
};

const disciplineCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
});

const handleDisicplineCreationValidation: (
  discipline: CreateDisciplineRequestDto
) => void = (discipline: CreateDisciplineRequestDto): void => {
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
  } as CreateDisciplineRequestDto;

  disciplineCreationValidationState[input.name] = "";
  handleDisicplineCreationValidation(disciplineCreationFormState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(disciplineCreationValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(
      DisciplinesActions.CREATE_DISCIPLINE,
      disciplineCreationFormState
    );
    props.onToggle();
  }
};

handleDisicplineCreationValidation(disciplineCreationFormState);
</script>

<template>
  <form :class="styles.disciplineCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="name"
      :onInput="handleDisciplinePropertyChange"
      :value="disciplineCreationFormState.name"
      :errorMessage="disciplineCreationValidationState.name"
    />
    <div :class="styles.disciplineCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
