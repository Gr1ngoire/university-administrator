<script lang="ts" setup>
import type { FaqMessagesGetAllItemResponseDto } from "@/common/types/types";
import { FaqMessageCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  messages: FaqMessagesGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.faqMessagesCardsListWrapper">
    <FaqMessageCard
      v-for="message in messages"
      :key="message.id"
      :faqMessage="message"
    />
  </div>
</template>
