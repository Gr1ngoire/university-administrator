<script lang="ts" setup>
import type { FacultiesGetAllItemResponseDto } from "@/common/types/types";
import { FacultyCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: FacultiesGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.facultiesCardsListWrapper">
    <ul :class="styles.facultiesCardsList">
      <li
        v-for="card in cards"
        :key="card.id"
        :class="styles.facultiesCardsListItem"
      >
        <FacultyCard :faculty="card" />
      </li>
    </ul>
  </div>
</template>
