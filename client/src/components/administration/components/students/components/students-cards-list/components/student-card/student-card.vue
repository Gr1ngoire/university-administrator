<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  GroupsGetAllItemResponseDto,
  ToggleState,
  UsersGetAllItemResponseDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateStudentForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  fullName: string;
  userId: number;
  user: UsersGetAllItemResponseDto;
  groupId: number;
  group: GroupsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_STUDENT, props.id);
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
    :id="id"
    :fullName="fullName"
    :groupId="groupId"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!studentUpdateFormShowState.state"
    :class="styles.studentCard"
  >
    <p :class="styles.studentFullName">Full name: {{ props.fullName }}</p>
    <p :class="styles.studentEmail">Email: {{ props.user.email }}</p>
    <p :class="styles.studentPhone">Phone: {{ props.user.phone }}</p>
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
