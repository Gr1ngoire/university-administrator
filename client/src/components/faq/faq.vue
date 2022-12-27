<script lang="ts" setup>
import { computed, useStore } from "@/hooks/hooks";
import { FaqActions } from "@/store/actions";
import {
  CreateFaqMessageForm,
  FaqMessagesCardsList,
} from "./components/components";

import styles from "./styles.module.scss";

const store = useStore();
const messages = computed(() => store.state.faq.faqMessages);

store.dispatch(FaqActions.GET_ALL_FAQ_MESSAGES);
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <FaqMessagesCardsList :messages="messages" />
    <CreateFaqMessageForm />
  </div>
</template>
