<script lang="ts" setup>
import { Button, Select } from "@/common/components/components";
import type { CreateStudentRequestDto } from "@/common/types/types";
import { computed, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

const users = computed(() => store.state.administration.users);
const userSelectOptions = users.value.map(
  ({ id, name, surname, secondName }) => ({
    id,
    name: `${surname} ${name} ${secondName}`,
    value: String(id),
  })
);

const groups = computed(() => store.state.administration.groups);
const groupSelectOptions = groups.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const [DEFAULT_USER] = users.value;
const [DEFAULT_GROUP] = groups.value;

let studentCreationFormState: CreateStudentRequestDto = {
  userId: DEFAULT_USER.id,
  groupId: DEFAULT_GROUP.id,
};

const handleStudentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  studentCreationFormState = {
    ...studentCreationFormState,
    [input.name]: parseInt(input.value),
  } as CreateStudentRequestDto;
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  store.dispatch(
    AdministrationActions.CREATE_STUDENT,
    studentCreationFormState
  );
  props.onToggle();
};
</script>

<template>
  <form :class="styles.studentCreationForm" @submit="handleSubmit">
    <div :class="styles.selectWrapper">
      <Select
        name="userId"
        nameToDisplay="User"
        :options="userSelectOptions"
        :onSelect="handleStudentPropertyChange"
      />
    </div>
    <div :class="styles.selectWrapper">
      <Select
        name="groupId"
        nameToDisplay="Group"
        :options="groupSelectOptions"
        :onSelect="handleStudentPropertyChange"
      />
    </div>
    <div :class="styles.studentCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
