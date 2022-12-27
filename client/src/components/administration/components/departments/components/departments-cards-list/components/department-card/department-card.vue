<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  DepartmentsGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateDepartmentForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  department: DepartmentsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_DEPARTMENT, props.department.id);
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
    :initialDepartment="props.department"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!departmentUpdateFormShowState.state"
    :class="styles.departmentCard"
  >
    <p :class="styles.departmentName">Name: {{ department.name }}</p>
    <p :class="styles.departmentShortName">
      Short name: {{ department.shortName }}
    </p>
    <p :class="styles.departmentFacultyName">
      Faculty: {{ department.faculty.name }}
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
