<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  DepartmentsGetAllItemResponseDto,
  ToggleState,
  UsersGetAllItemResponseDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateTeacherForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  fullName: string;
  userId: number;
  user: UsersGetAllItemResponseDto;
  departmentId: number;
  department: DepartmentsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_TEACHER, props.id);
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
    :id="id"
    :fullName="fullName"
    :departmentId="departmentId"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!teacherUpdateFormShowState.state"
    :class="styles.teacherCard"
  >
    <p :class="styles.teacherFullName">Full name: {{ props.fullName }}</p>
    <p :class="styles.teacherEmail">Email: {{ props.user.email }}</p>
    <p :class="styles.teacherPhone">Phone: {{ props.user.phone }}</p>
    <p :class="styles.studentDepartmentName">
      Department: {{ props.department.name }}
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
