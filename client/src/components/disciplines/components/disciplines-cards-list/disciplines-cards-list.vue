<script lang="ts" setup>
import type { DisciplinesGetAllItemResponseDto } from "@/common/types/types";
import { DisciplineCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: DisciplinesGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.disciplinesCardsListWrapper">
    <ul :class="styles.disciplinesCardsList">
      <li
        v-for="{ id, name } in cards"
        :key="id"
        :class="styles.disciplinesCardsListItem"
      >
        <DisciplineCard :name="name" />
      </li>
    </ul>
  </div>
</template>
