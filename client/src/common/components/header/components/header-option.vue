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
  <!--isSelectedick is a temporary decision, it will be replaced with
  intercative eleemnt (button) -->
  <div
    :class="`${styles.headerOption} ${isSelected ? styles.selected : ''}`"
    @click="onClick"
  >
    <RouterLink :class="styles.link" :to="link">{{ name }}</RouterLink>
    <hr :class="styles.underline" />
  </div>
</template>
