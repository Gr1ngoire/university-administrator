<script lang="ts" setup>
import {
  CreateDepartmentForm,
  DepartmentsCardsList,
} from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const departments = computed(() => store.state.administration.departments);
const isDepartmentCrеationPossible = computed(
  () => store.state.administration.faculties.length > 0
);

const departmentCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  departmentCreationFormShowState.value =
    !departmentCreationFormShowState.value;
};
</script>

<template>
  <div :class="styles.departmentsDashboard">
    <div
      v-if="isDepartmentCrеationPossible"
      :class="styles.createDepartmentForm"
    >
      <CreateDepartmentForm
        v-if="departmentCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleDepartmentFormButtonWrapper">
        <Button
          v-if="!departmentCreationFormShowState"
          type="click"
          name="Add department"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
    <div
      v-else-if="!isDepartmentCrеationPossible"
      :class="styles.unableToCreateDepartmentInfoBlock"
    >
      There are no faculties, you can not create any departments
    </div>
    <hr
      v-if="departmentCreationFormShowState"
      :class="styles.departmentsSectionsSeparator"
    />
    <DepartmentsCardsList :cards="departments" />
  </div>
</template>
