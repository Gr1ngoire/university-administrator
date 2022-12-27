<script lang="ts" setup>
import type { NewsGetAllItemResponseDto } from "@/common/types/types";
import { NewsCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: NewsGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.newsCardsListWrapper">
    <NewsCard v-for="card in cards" :key="card.id" :news="card" />
  </div>
</template>
