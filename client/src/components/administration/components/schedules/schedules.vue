<script lang="ts" setup>
import {
  CreateScheduleForm,
  SchedulesCardsList,
} from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const schedules = computed(() => store.state.administration.schedules);
const isScheduleCrеationPossible = computed(
  () =>
    store.state.administration.groups.length > 0 &&
    store.state.administration.disciplines.length > 0 &&
    store.state.administration.teachers.length > 0
);

const studentCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  studentCreationFormShowState.value = !studentCreationFormShowState.value;
};
</script>

<template>
  <div :class="styles.schedulesDashboard">
    <div v-if="isScheduleCrеationPossible" :class="styles.createScheduleForm">
      <CreateScheduleForm
        v-if="studentCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleScheduleFormButtonWrapper">
        <Button
          v-if="!studentCreationFormShowState"
          type="click"
          name="Add schedule"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
    <div
      v-else-if="!isScheduleCrеationPossible"
      :class="styles.unableToCreateScheduleInfoBlock"
    >
      There are not enough entities to create a group, to create a schedule
      record you need at least one discipline, at least on teacher and at least
      one student
    </div>
    <hr
      v-if="studentCreationFormShowState"
      :class="styles.schedulesSectionsSeparator"
    />
    <SchedulesCardsList :cards="schedules" />
  </div>
</template>
