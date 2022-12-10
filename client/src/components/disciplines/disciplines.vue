<script lang="ts" setup>
import { computed, reactive } from "vue";
import { DisciplinesCardList } from "./components/components";
import { useStore } from "@/hooks/hooks";
import { DisciplinesActions } from "@/store/actions.common";
import { Input } from "@/common/components/components";
import { discipline as disciplinesValidator } from "@/validators/validators";

import styles from "./styles.module.scss";
import type { CreateDisciplineRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";

const store = useStore();
const disciplines = computed(() => store.state.disciplines.disciplines);
store.dispatch(DisciplinesActions.GET_ALL_DISICPLINES);

let disciplineCreationFormState: CreateDisciplineRequestDto =
  reactive<CreateDisciplineRequestDto>({
    name: "",
  });

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

  console.log(disciplineCreationFormState);
  console.log(disciplineCreationValidationState);
};
</script>

<template>
  <Input
    :type="'text'"
    :name="'name'"
    :onInput="handleDisciplinePropertyChange"
    :errorMessage="disciplineCreationValidationState.name"
  />
  <div :class="styles.dashboardWrapper">
    <div :class="styles.disciplinesDashboard">
      <DisciplinesCardList :cards="disciplines" />
    </div>
  </div>
</template>
