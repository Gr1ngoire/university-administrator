<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  DepartmentsGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { GroupsActions } from "@/store/actions.common";
import { UpdateGroupForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  name: string;
  course: number;
  departmentId: number;
  department: DepartmentsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(GroupsActions.DELETE_GROUPS, props.id);
};

const initialFormShowState: ToggleState = { state: false };
const groupUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  groupUpdateFormShowState.state = !groupUpdateFormShowState.state;
};
</script>

<template>
  <UpdateGroupForm
    v-if="groupUpdateFormShowState.state"
    :initialGroup="{ id, name, course, departmentId, department }"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!groupUpdateFormShowState.state" :class="styles.groupCard">
    <p :class="styles.groupName">Name: {{ props.name }}</p>
    <p :class="styles.groupShortName">Course: {{ props.course }}</p>
    <p :class="styles.groupFacultyName">
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
