<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  FacultiesGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions.common";
import { UpdateDepartmentForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  name: string;
  shortName: string;
  facultyId: number;
  faculty: FacultiesGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_DEPARTMENT, props.id);
};

const initialFormShowState: ToggleState = { state: false };
const departmentUpdateFormShowState =
  reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  departmentUpdateFormShowState.state = !departmentUpdateFormShowState.state;
};
</script>

<template>
  <UpdateDepartmentForm
    v-if="departmentUpdateFormShowState.state"
    :initialDepartment="{ id, name, shortName, facultyId, faculty }"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!departmentUpdateFormShowState.state"
    :class="styles.departmentCard"
  >
    <p :class="styles.departmentName">Name: {{ props.name }}</p>
    <p :class="styles.departmentShortName">Short name: {{ props.shortName }}</p>
    <p :class="styles.departmentFacultyName">
      Faculty: {{ props.faculty.name }}
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
