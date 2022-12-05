<script setup lang="ts">
import { RouterLink } from "vue-router";
import styles from "./styles.module.scss";

type HeaderOptionProps = {
  link: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

defineProps<HeaderOptionProps>();
</script>

<template>
  <!--isSelected is a temporary decision, it will be replaced with
  intercative element (button) -->
  <RouterLink
    :class="`${styles.headerOption} ${isSelected ? styles.selected : ''}`"
    :to="link"
    @click="onClick"
  >
    <div :class="styles.link">{{ name }}</div>
    <hr :class="styles.underline"
  /></RouterLink>
</template>
