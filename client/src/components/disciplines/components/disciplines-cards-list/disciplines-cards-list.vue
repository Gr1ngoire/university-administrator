<script lang="ts" setup>
import type { DisciplinesGetAllItemRequestDto } from "shared/common/types/types";
import { DisciplineCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: DisciplinesGetAllItemRequestDto[];
};

defineProps<Props>();
</script>

<template>
  <ul :class="styles.disciplinesCardsList">
    <li
      v-for="{ id, name } in cards"
      :key="id"
      :class="styles.disciplinesCardsListItem"
    >
      <DisciplineCard :name="name" />
    </li>
  </ul>
</template>
