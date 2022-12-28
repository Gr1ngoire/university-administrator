<script lang="ts" setup>
import { computed, useStore } from "@/hooks/hooks";
import { PublicScheduleActions } from "@/store/actions";
import { PublicScheduleGetters } from "@/store/getters";
import type {
  GroupsGetAllItemResponseDto,
  SchedulesGetAllItemResponseDto,
} from "@/common/types/types";
import { Select } from "@/common/components/components";
import { PublicScheduleColumn } from "./components/components";
import { DAYS_OF_WEEK } from "./common/common";

import styles from "./styles.module.scss";

const store = useStore();
store.dispatch(PublicScheduleActions.GET_ALL_GROUPS);
store.dispatch(PublicScheduleActions.GET_ALL_SCHEDULES);

const groups = computed<GroupsGetAllItemResponseDto[]>(
  () => store.state.publicSchedule.groups
);

const FREE_ID = 0;
const groupSelectOptions = computed(() => [
  { id: FREE_ID, name: "All", value: "" },
  ...groups.value.map(({ id, name }) => ({
    id,
    name,
    value: String(id),
  })),
]);

const [DEFAULT_GROUP] = groupSelectOptions.value;

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

const handleGroupSwitch: (event: Event) => void = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  store.dispatch(PublicScheduleActions.GET_ALL_SCHEDULES, input.value);
};
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <div :class="styles.selectWrapper">
      <Select
        name="groupId"
        nameToDisplay=""
        :options="groupSelectOptions"
        :onSelect="handleGroupSwitch"
        :defaultOptionId="DEFAULT_GROUP.id"
      />
    </div>
    <div :class="styles.dashboard">
      <PublicScheduleColumn
        v-for="(column, index) in scheduleRecordsWithSundayRecordAsTheLastDay"
        :key="index"
        :items="column"
        :dayOfWeek="DAYS_OF_WEEK[index]"
        :parentColumnId="index"
      />
    </div>
  </div>
</template>
