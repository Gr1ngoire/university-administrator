<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  FacultiesGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateFacultyForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  faculty: FacultiesGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_FACULTY, props.faculty.id);
};

const initialFormShowState: ToggleState = { state: false };
const facultyUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  facultyUpdateFormShowState.state = !facultyUpdateFormShowState.state;
};
</script>

<template>
  <UpdateFacultyForm
    v-if="facultyUpdateFormShowState.state"
    :initialFaculty="faculty"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!facultyUpdateFormShowState.state"
    :class="styles.facultyCard"
  >
    <p :class="styles.facultyShortName">Short name: {{ faculty.shortName }}</p>
    <p :class="styles.facultyName">Name: {{ faculty.name }}</p>
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
