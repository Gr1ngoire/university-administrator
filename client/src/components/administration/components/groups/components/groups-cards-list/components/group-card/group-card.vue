<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  GroupsGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateGroupForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  group: GroupsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_GROUP, props.group.id);
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
    :initialGroup="group"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!groupUpdateFormShowState.state" :class="styles.groupCard">
    <p :class="styles.groupName">Name: {{ group.name }}</p>
    <p :class="styles.groupCourse">Course: {{ group.course }}</p>
    <p :class="styles.groupDepartmentName">
      Department: {{ group.department.name }}
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
