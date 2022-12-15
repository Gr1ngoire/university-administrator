<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  GroupsGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { StudentsActions } from "@/store/actions.common";
import { UpdateStudentForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  name: string;
  email: string;
  phone: string;
  groupId: number;
  group: GroupsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(StudentsActions.DELETE_STUDENT, props.id);
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
    :initialStudent="{ id, name, email, phone, groupId, group }"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!studentUpdateFormShowState.state"
    :class="styles.studentCard"
  >
    <p :class="styles.studentName">Name: {{ props.name }}</p>
    <p :class="styles.studentEmail">Email: {{ props.email }}</p>
    <p :class="styles.studentPhone">Phone: {{ props.phone }}</p>
    <p :class="styles.studentGroupName">Group: {{ props.group.name }}</p>
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
