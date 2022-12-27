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
        v-for="card in cards"
        :key="card.id"
        :class="styles.schedulesCardsListItem"
      >
        <ScheduleCard :scheduleRecord="card" />
      </li>
    </ul>
  </div>
</template>
