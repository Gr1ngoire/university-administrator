<script lang="ts" setup>
import type { StudentsGetAllItemResponseDto } from "@/common/types/types";
import { StudentCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: StudentsGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.studentsCardsListWrapper">
    <ul :class="styles.studentsCardsList">
      <li
        v-for="card in cards"
        :key="card.id"
        :class="styles.studentsCardsListItem"
      >
        <StudentCard :student="card" />
      </li>
    </ul>
  </div>
</template>
