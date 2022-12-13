<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type {
  DisciplinesGetAllItemResponseDto,
  UpdateDisciplineRequestDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { discipline as disciplineValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { DisciplinesActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  initialDiscipline: DisciplinesGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

let disciplineUpdateFormState: UpdateDisciplineRequestDto = {
  name: props.initialDiscipline.name,
};

const disciplineUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
});

const handleDisicplineUpdateValidation: (
  discipline: UpdateDisciplineRequestDto
) => void = (discipline: UpdateDisciplineRequestDto): void => {
  try {
    disciplineValidator.validate(discipline);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    disciplineUpdateValidationState[validationError.field] =
      validationError.message;
  }
};

const handleDisciplinePropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  disciplineUpdateFormState = {
    ...disciplineUpdateFormState,
    [input.name]: input.value,
  } as UpdateDisciplineRequestDto;

  disciplineUpdateValidationState[input.name] = "";
  handleDisicplineUpdateValidation(disciplineUpdateFormState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(disciplineUpdateValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(DisciplinesActions.UPDATE_DISCIPLINE, {
      id: props.initialDiscipline.id,
      payload: disciplineUpdateFormState,
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
          :value="disciplineUpdateFormState.name"
          :onInput="handleDisciplinePropertyChange"
          :errorMessage="disciplineUpdateValidationState.name"
        />
      </div>
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
