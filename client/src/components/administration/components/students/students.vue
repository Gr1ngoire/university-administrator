<script lang="ts" setup>
import { CreateStudentForm, StudentsCardsList } from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const students = computed(() => store.state.administration.students);
const isStudentCrеationPossible = computed(
  () =>
    store.state.administration.users.length > 0 &&
    store.state.administration.groups.length > 0
);

const studentCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  studentCreationFormShowState.value = !studentCreationFormShowState.value;
};
</script>

<template>
  <div :class="styles.studentsDashboard">
    <div v-if="isStudentCrеationPossible" :class="styles.createStudentForm">
      <CreateStudentForm
        v-if="studentCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleStudentFormButtonWrapper">
        <Button
          v-if="!studentCreationFormShowState"
          type="click"
          name="Add student"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
    <div
      v-else-if="!isStudentCrеationPossible"
      :class="styles.unableToCreateStudentInfoBlock"
    >
      There are no users or groups, you can not create any students
    </div>
    <hr
      v-if="studentCreationFormShowState"
      :class="styles.studentsSectionsSeparator"
    />
    <StudentsCardsList :cards="students" />
  </div>
</template>
