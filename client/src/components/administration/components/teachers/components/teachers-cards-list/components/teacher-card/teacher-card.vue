<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  TeachersGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateTeacherForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  teacher: TeachersGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_TEACHER, props.teacher.id);
};

const initialFormShowState: ToggleState = { state: false };
const teacherUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  teacherUpdateFormShowState.state = !teacherUpdateFormShowState.state;
};
</script>

<template>
  <UpdateTeacherForm
    v-if="teacherUpdateFormShowState.state"
    :initialTeacher="teacher"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!teacherUpdateFormShowState.state"
    :class="styles.teacherCard"
  >
    <p :class="styles.teacherFullName">
      Full name:
      {{
        `${teacher.user.surname} ${teacher.user.name} ${teacher.user.secondName}`
      }}
    </p>
    <p :class="styles.teacherEmail">Email: {{ teacher.user.email }}</p>
    <p :class="styles.teacherPhone">Phone: {{ teacher.user.phone }}</p>
    <p :class="styles.teacherDepartmentName">
      Department: {{ teacher.department.name }}
    </p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" :onClick="handleEditToggle" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
