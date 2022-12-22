<script lang="ts" setup>
import { CreateTeacherForm, TeachersCardsList } from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const teachers = computed(() => store.state.administration.teachers);
const isTeacherCreationPossible = computed(
  () =>
    store.state.administration.users.length > 0 &&
    store.state.administration.departments.length > 0
);

const teacherCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  teacherCreationFormShowState.value = !teacherCreationFormShowState.value;
};
</script>

<template>
  <div :class="styles.teachersDashboard">
    <div v-if="isTeacherCreationPossible" :class="styles.createTeacherForm">
      <CreateTeacherForm
        v-if="teacherCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleTeacherFormButtonWrapper">
        <Button
          v-if="!teacherCreationFormShowState"
          type="click"
          name="Add teacher"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
    <div
      v-else-if="!isTeacherCreationPossible"
      :class="styles.unableToCreateTeacherInfoBlock"
    >
      There are no users or departments, you can not create any teachers
    </div>
    <hr
      v-if="teacherCreationFormShowState"
      :class="styles.teachersSectionsSeparator"
    />
    <TeachersCardsList :cards="teachers" />
  </div>
</template>
