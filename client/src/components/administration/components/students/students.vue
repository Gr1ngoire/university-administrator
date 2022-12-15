<script lang="ts" setup>
import { CreateStudentForm, StudentsCardsList } from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { StudentsActions, GroupsActions } from "@/store/actions.common";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const students = computed(() => store.state.students.students);
const isStudentCrеationPossible = computed(
  () => store.state.groups.groups.length > 0
);

const studentCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  studentCreationFormShowState.value = !studentCreationFormShowState.value;
};

store.dispatch(GroupsActions.GET_ALL_GROUPS);
store.dispatch(StudentsActions.GET_ALL_STUDENTS);
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
      There are no groups, you can not create any students
    </div>
    <hr
      v-if="studentCreationFormShowState"
      :class="styles.studentsSectionsSeparator"
    />
    <StudentsCardsList :cards="students" />
  </div>
</template>
