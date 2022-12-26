<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  StudentsGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateStudentForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  student: StudentsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_STUDENT, props.student.id);
};

const initialFormShowState: ToggleState = { state: false };
const studentUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  studentUpdateFormShowState.state = !studentUpdateFormShowState.state;
};
</script>

<template>
  <UpdateStudentForm
    v-if="studentUpdateFormShowState.state"
    :initialStudent="student"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!studentUpdateFormShowState.state"
    :class="styles.studentCard"
  >
    <p :class="styles.studentFullName">
      Full name:
      {{
        `${student.user.surname} ${student.user.name} ${student.user.secondName}`
      }}
    </p>
    <p :class="styles.studentEmail">Email: {{ student.user.email }}</p>
    <p :class="styles.studentPhone">Phone: {{ student.user.phone }}</p>
    <p :class="styles.studentGroupName">Group: {{ student.group.name }}</p>
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
