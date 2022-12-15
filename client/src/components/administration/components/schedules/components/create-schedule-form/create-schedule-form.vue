<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type { CreateScheduleRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { schedule as scheduleValidator } from "@/validators/validators";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

const disciplines = computed(() => store.state.administration.disciplines);
const disciplineSelectOptions = disciplines.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const teachers = computed(() => store.state.administration.teachers);
const teacherSelectOptions = teachers.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const groups = computed(() => store.state.administration.groups);
const groupSelectOptions = groups.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const [DEFAULT_DISCIPLINE] = disciplines.value;
const [DEFAULT_TEACHER] = teachers.value;
const [DEFAULT_GROUP] = groups.value;

let scheduleCreationFormState: CreateScheduleRequestDto = {
  time: "",
  classroom: "",
  disciplineId: DEFAULT_DISCIPLINE.id,
  teacherId: DEFAULT_TEACHER.id,
  groupId: DEFAULT_GROUP.id,
};

const scheduleCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  time: "",
  classroom: "",
});

const handleScheduleCreationValidation: (
  schedule: CreateScheduleRequestDto
) => void = (schedule: CreateScheduleRequestDto): void => {
  try {
    scheduleValidator.validate(schedule);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    scheduleCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleSchedulePropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  scheduleCreationFormState = {
    ...scheduleCreationFormState,
    [input.name]:
      input.name === "disciplineId" ||
      input.name === "teacherId" ||
      input.name === "groupId"
        ? parseInt(input.value)
        : input.value,
  } as CreateScheduleRequestDto;

  scheduleCreationValidationState[input.name] = "";
  handleScheduleCreationValidation(scheduleCreationFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(scheduleCreationValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(
      AdministrationActions.CREATE_SCHEDULE,
      scheduleCreationFormState
    );
    props.onToggle();
  }
};

handleScheduleCreationValidation(scheduleCreationFormState);
</script>

<template>
  <form :class="styles.scheduleCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="time"
      :onInput="handleSchedulePropertyChange"
      :value="scheduleCreationFormState.time"
      :errorMessage="scheduleCreationValidationState.time"
    />
    <Input
      type="text"
      name="classroom"
      :onInput="handleSchedulePropertyChange"
      :value="scheduleCreationFormState.classroom"
      :errorMessage="scheduleCreationValidationState.classroom"
    />
    <div :class="styles.selectWrapper">
      <Select
        name="disciplineId"
        nameToDisplay="Discipline"
        :options="disciplineSelectOptions"
        :onSelect="handleSchedulePropertyChange"
      />
    </div>
    <div :class="styles.selectWrapper">
      <Select
        name="teacherId"
        nameToDisplay="Teacher"
        :options="teacherSelectOptions"
        :onSelect="handleSchedulePropertyChange"
      />
    </div>
    <div :class="styles.selectWrapper">
      <Select
        name="groupId"
        nameToDisplay="Group"
        :options="groupSelectOptions"
        :onSelect="handleSchedulePropertyChange"
      />
    </div>
    <div :class="styles.scheduleCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
