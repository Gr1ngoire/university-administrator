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
    <NewsCard
      v-for="{ id, title, content, imgUrl } in cards"
      :key="id"
      :id="id"
      :title="title"
      :content="content"
      :imgUrl="imgUrl"
    />
  </div>
</template>
