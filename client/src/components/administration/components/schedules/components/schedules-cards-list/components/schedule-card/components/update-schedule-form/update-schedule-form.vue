<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type {
  SchedulesGetAllItemResponseDto,
  UpdateScheduleRequestDto,
} from "@/common/types/types";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { schedule as scheduleValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  initialSchedule: SchedulesGetAllItemResponseDto;
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
const teacherSelectOptions = teachers.value.map(({ id, name, surname }) => ({
  id,
  name: `${name} ${surname}`,
  value: String(id),
}));

const groups = computed(() => store.state.administration.groups);
const groupSelectOptions = groups.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

let scheduleUpdateFormState: UpdateScheduleRequestDto = {
  time: props.initialSchedule.time,
  classroom: props.initialSchedule.classroom,
  disciplineId: props.initialSchedule.disciplineId,
  teacherId: props.initialSchedule.teacherId,
  groupId: props.initialSchedule.groupId,
};

const scheduleUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  time: "",
  classroom: "",
});

const handleScheduleUpdateValidation: (
  schedule: UpdateScheduleRequestDto
) => void = (schedule: UpdateScheduleRequestDto): void => {
  try {
    scheduleValidator.validate(schedule);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    scheduleUpdateValidationState[validationError.field] =
      validationError.message;
  }
};

const handleSchedulePropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  scheduleUpdateFormState = {
    ...scheduleUpdateFormState,
    [input.name]:
      input.name === "disciplineId" ||
      input.name === "teacherId" ||
      input.name === "groupId"
        ? parseInt(input.value)
        : input.value,
  } as UpdateScheduleRequestDto;

  scheduleUpdateValidationState[input.name] = "";
  handleScheduleUpdateValidation(scheduleUpdateFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(scheduleUpdateValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(AdministrationActions.UPDATE_SCHEDULE, {
      id: props.initialSchedule.id,
      payload: scheduleUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.scheduleUpdateForm" @submit="handleSubmit">
    <div :class="styles.scheduleUpdateActionSectionWrapper">
      <div :class="styles.scheduleEditFieldsWrapper">
        <div :class="styles.scheduleEditInputWrapper">
          <Input
            type="text"
            name="time"
            :value="scheduleUpdateFormState.time"
            :onInput="handleSchedulePropertyChange"
            :errorMessage="scheduleUpdateValidationState.time"
          />
        </div>
        <div :class="styles.scheduleEditInputWrapper">
          <Input
            type="text"
            name="classroom"
            :value="scheduleUpdateFormState.classroom"
            :onInput="handleSchedulePropertyChange"
            :errorMessage="scheduleUpdateValidationState.classroom"
          />
        </div>
        <div :class="styles.scheduleEditSelectWrapper">
          <Select
            name="disciplineId"
            nameToDisplay="Discipline"
            :options="disciplineSelectOptions"
            :onSelect="handleSchedulePropertyChange"
            :defaultOptionId="initialSchedule.disciplineId"
          />
        </div>
        <div :class="styles.scheduleEditSelectWrapper">
          <Select
            name="teacherId"
            nameToDisplay="Teacher"
            :options="teacherSelectOptions"
            :onSelect="handleSchedulePropertyChange"
            :defaultOptionId="initialSchedule.teacherId"
          />
        </div>
        <div :class="styles.scheduleEditSelectWrapper">
          <Select
            name="groupId"
            nameToDisplay="Group"
            :options="groupSelectOptions"
            :onSelect="handleSchedulePropertyChange"
            :defaultOptionId="initialSchedule.groupId"
          />
        </div>
        <div :class="styles.scheduleActionButtonsWrapper">
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
