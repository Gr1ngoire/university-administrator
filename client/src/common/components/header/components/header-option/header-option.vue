<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed, useStore } from "@/hooks/hooks";
import { Grants } from "@/common/enums/enums";
import styles from "./styles.module.scss";

type Props = {
  link: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
};

defineProps<Props>();

const store = useStore();
const currentUser = computed(() => store.state.auth.currentUser);
</script>

<template>
  <RouterLink
    v-if="
      (!requiresAuth || (requiresAuth && currentUser)) &&
      (!requiresAdmin || (requiresAdmin && currentUser?.grant === Grants.ADMIN))
    "
    :class="`${styles.headerOption} ${isSelected ? styles.selected : ''}`"
    :to="link"
    @click="onClick"
  >
    <div :class="styles.link">{{ name }}</div>
    <hr :class="styles.underline"
  /></RouterLink>
</template>
