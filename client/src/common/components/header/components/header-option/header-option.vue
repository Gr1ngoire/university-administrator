<script setup lang="ts">
import { computed, useStore } from "@/hooks/hooks";
import { RouterLink } from "vue-router";
import styles from "./styles.module.scss";

type Props = {
  link: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
  requiresAuth?: boolean;
};

defineProps<Props>();

const store = useStore();
const currentUser = computed(() => store.state.auth.currentUser);
</script>

<template>
  <RouterLink
    v-if="!requiresAuth || (requiresAuth && currentUser)"
    :class="`${styles.headerOption} ${isSelected ? styles.selected : ''}`"
    :to="link"
    @click="onClick"
  >
    <div :class="styles.link">{{ name }}</div>
    <hr :class="styles.underline"
  /></RouterLink>
</template>
