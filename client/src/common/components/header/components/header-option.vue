<script setup lang="ts">
import { RouterLink } from "vue-router";
import styles from "./styles.module.scss";

type HeaderOptionProps = {
  link: string;
  description: string;
};

const props = defineProps<HeaderOptionProps>();
</script>

<template>
  <div :class="styles.headerOption">
    <RouterLink :to="props.link">{{ props.description }}</RouterLink>
    <hr :class="styles.underline" />
  </div>
</template>
