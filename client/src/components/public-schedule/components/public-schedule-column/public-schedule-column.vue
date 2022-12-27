<script lang="ts" setup>
import { ScheduleDisplayCard } from "@/common/components/components";
import styles from "./styles.module.scss";
import type { DayOfWeek } from "../../common/day-of-week.type";
import type { SchedulesGetAllItemResponseDto } from "@/common/types/types";

type Props = {
  parentColumnId: number;
  dayOfWeek: DayOfWeek;
  items: SchedulesGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div>
    <h1 :class="styles.columnHeading">{{ dayOfWeek }}</h1>
    <ul :class="styles.publicScheduleColumn">
      <li
        v-for="{ id, time, classroom, discipline, teacher, group } in items"
        :key="`${parentColumnId}${id}`"
        :class="styles.publicScheduleCardWrapper"
      >
        <ScheduleDisplayCard
          :time="time"
          :classroom="classroom"
          :disciplineName="discipline.name"
          :teacherName="`${teacher.user.name} ${teacher.user.name}`"
          :groupName="group.name"
        />
      </li>
    </ul>
  </div>
</template>
