<script lang="ts" setup>
import type { SchedulesGetAllItemResponseDto } from "@/common/types/types";
import { ScheduleCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: SchedulesGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.schedulesCardsListWrapper">
    <ul :class="styles.schedulesCardsList">
      <li
        v-for="{
          id,
          time,
          classroom,
          disciplineId,
          discipline,
          teacherId,
          teacher,
          groupId,
          group,
        } in cards"
        :key="id"
        :class="styles.schedulesCardsListItem"
      >
        <ScheduleCard
          :id="id"
          :time="time"
          :classroom="classroom"
          :disciplineId="disciplineId"
          :discipline="discipline"
          :teacherId="teacherId"
          :teacher="teacher"
          :groupId="groupId"
          :group="group"
        />
      </li>
    </ul>
  </div>
</template>
