<script lang="ts" setup>
import type { TeachersGetAllItemResponseDto } from "@/common/types/types";
import { TeacherCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: TeachersGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.teachersCardsListWrapper">
    <ul :class="styles.teachersCardsList">
      <li
        v-for="card in cards"
        :key="card.id"
        :class="styles.teachersCardsListItem"
      >
        <TeacherCard :teacher="card" />
      </li>
    </ul>
  </div>
</template>
