<script lang="ts" setup>
import { Button, Select } from "@/common/components/components";
import type {
  TeachersGetAllItemResponseDto,
  UpdateTeacherRequestDto,
} from "@/common/types/types";
import { computed, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  initialTeacher: TeachersGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();
const departments = computed(() => store.state.administration.departments);
const departmentSelectOptions = departments.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

let teacherUpdateFormState: UpdateTeacherRequestDto = {
  departmentId: props.initialTeacher.departmentId,
};

const handleTeacherPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  teacherUpdateFormState = {
    ...teacherUpdateFormState,
    [input.name]: parseInt(input.value),
  } as UpdateTeacherRequestDto;
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  store.dispatch(AdministrationActions.UPDATE_TEACHER, {
    id: props.initialTeacher.id,
    payload: teacherUpdateFormState,
  });
  props.onToggle();
};
</script>

<template>
  <form :class="styles.teacherUpdateForm" @submit="handleSubmit">
    <div :class="styles.teacherUpdateActionSectionWrapper">
      <div :class="styles.teacherEditFieldsWrapper">
        <h1 :class="styles.teacherFullName">
          {{
            `${initialTeacher.user.surname} ${initialTeacher.user.name} ${initialTeacher.user.secondName}`
          }}
        </h1>
        <div :class="styles.teacherEditSelectWrapper">
          <Select
            name="departmentId"
            nameToDisplay="Group"
            :options="departmentSelectOptions"
            :onSelect="handleTeacherPropertyChange"
            :defaultOptionId="initialTeacher.departmentId"
          />
        </div>
      </div>
      <div :class="styles.teacherActionButtonsWrapper">
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
