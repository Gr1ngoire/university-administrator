<script lang="ts" setup>
import { Button, Select } from "@/common/components/components";
import type { CreateTeacherRequestDto } from "@/common/types/types";
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

const departments = computed(() => store.state.administration.departments);
const departmentSelectOptions = departments.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

const [DEFAULT_USER] = users.value;
const [DEFAULT_DEPARTMENT] = departments.value;

let teacherCreationFormState: CreateTeacherRequestDto = {
  userId: DEFAULT_USER.id,
  departmentId: DEFAULT_DEPARTMENT.id,
};

const handleTeacherPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  teacherCreationFormState = {
    ...teacherCreationFormState,
    [input.name]: parseInt(input.value),
  } as CreateTeacherRequestDto;
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  store.dispatch(
    AdministrationActions.CREATE_TEACHER,
    teacherCreationFormState
  );
  props.onToggle();
};
</script>

<template>
  <form :class="styles.teacherCreationForm" @submit="handleSubmit">
    <div :class="styles.selectWrapper">
      <Select
        name="userId"
        nameToDisplay="User"
        :options="userSelectOptions"
        :onSelect="handleTeacherPropertyChange"
      />
    </div>
    <div :class="styles.selectWrapper">
      <Select
        name="departmentId"
        nameToDisplay="Department"
        :options="departmentSelectOptions"
        :onSelect="handleTeacherPropertyChange"
      />
    </div>
    <div :class="styles.teacherCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
