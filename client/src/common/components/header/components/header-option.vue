<script setup lang="ts">
import { RouterLink } from "vue-router";
import styles from "./styles.module.scss";

type Props = {
  link: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

defineProps<Props>();
</script>

<template>
  <RouterLink
    :class="`${styles.headerOption} ${isSelected ? styles.selected : ''}`"
    :to="link"
    @click="onClick"
  >
    <div :class="styles.link">{{ name }}</div>
    <hr :class="styles.underline"
  /></RouterLink>
</template>
