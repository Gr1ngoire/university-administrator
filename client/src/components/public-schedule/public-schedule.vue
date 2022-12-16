<script lang="ts" setup>
import { computed, useStore } from "@/hooks/hooks";
import { PublicScheduleActions } from "@/store/actions";
import { PublicScheduleGetters } from "@/store/getters";
import type { SchedulesGetAllItemResponseDto } from "shared/common/types/types";
import { PublicScheduleColumn } from "./components/components";
import { DAYS_OF_WEEK } from "./common/common";

import styles from "./styles.module.scss";

const store = useStore();
store.dispatch(PublicScheduleActions.GET_ALL_SCHEDULES);

const scheduleRecordsWithSundayRecordAsTheLastDay = computed<
  SchedulesGetAllItemResponseDto[][]
>(() => {
  const scheduleRecords: SchedulesGetAllItemResponseDto[][] =
    store.getters[PublicScheduleGetters.DAY_OF_WEEK_SCHEDULE_MATRIX];

  if (!scheduleRecords) {
    return [];
  }

  scheduleRecords.push(
    scheduleRecords.shift() as SchedulesGetAllItemResponseDto[]
  );
  return scheduleRecords;
});
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <PublicScheduleColumn
      v-for="(column, index) in scheduleRecordsWithSundayRecordAsTheLastDay"
      :key="index"
      :items="column"
      :dayOfWeek="DAYS_OF_WEEK[index]"
      :parentColumnId="index"
    />
  </div>
</template>
