<script setup lang="ts">
import type { FaqMessagesGetAllItemResponseDto } from "@/common/types/types";
import { Grants } from "@/common/enums/enums";
import { computed, useStore } from "@/hooks/hooks";

import styles from "./styles.module.scss";

type Props = {
  faqMessage: FaqMessagesGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const currentUser = computed(() => store.state.auth.currentUser);

const faqMessagePostDate = new Date(props.faqMessage.createdAt);
const dateToDisplay = `${faqMessagePostDate.getHours()}:${faqMessagePostDate.getMinutes()} ${faqMessagePostDate.getUTCMonth()}.${faqMessagePostDate.getDate()}.${faqMessagePostDate.getFullYear()}`;
const nameToDisplay =
  props.faqMessage.author.grant === Grants.ADMIN
    ? "Admin"
    : `${props.faqMessage.author.surname} ${props.faqMessage.author.name} ${props.faqMessage.author.secondName}`;
</script>

<template>
  <div
    :class="`${styles.faqMessageCardWrapper} ${
      nameToDisplay === 'Admin' ? styles.adminWrapper : styles.userWrapper
    }`"
  >
    <div
      :class="`${styles.faqMessageCard} ${
        nameToDisplay === 'Admin' ? styles.adminCard : styles.userCard
      }`"
    >
      <p :class="styles.faqMessageContent">{{ faqMessage.message }}</p>
      <div :class="styles.faqMessageMessageInfoWrapper">
        <label :class="styles.messageAuthor">{{
          currentUser?.id === faqMessage.authorId ? "You" : nameToDisplay
        }}</label>
        <label>{{ dateToDisplay }}</label>
      </div>
    </div>
  </div>
</template>
