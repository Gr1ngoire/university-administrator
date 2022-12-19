<script lang="ts" setup>
import { Button, Select } from "@/common/components/components";
import type { UpdateStudentRequestDto } from "@/common/types/types";
import { computed, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  fullName: string;
  groupId: number;
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
  groupId: props.groupId,
};

const handleStudentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  studentUpdateFormState = {
    ...studentUpdateFormState,
    [input.name]: parseInt(input.value),
  } as UpdateStudentRequestDto;
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  store.dispatch(AdministrationActions.UPDATE_STUDENT, {
    id: props.id,
    payload: studentUpdateFormState,
  });
  props.onToggle();
};
</script>

<template>
  <form :class="styles.studentUpdateForm" @submit="handleSubmit">
    <div :class="styles.studentUpdateActionSectionWrapper">
      <div :class="styles.studentEditFieldsWrapper">
        <h1>{{ fullName }}</h1>
        <div :class="styles.studentEditSelectWrapper">
          <Select
            name="groupId"
            nameToDisplay="Group"
            :options="groupSelectOptions"
            :onSelect="handleStudentPropertyChange"
            :defaultOptionId="groupId"
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
