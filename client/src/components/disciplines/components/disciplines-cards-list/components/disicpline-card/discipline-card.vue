<script setup lang="ts">
import styles from "./styles.module.scss";

type Props = {
  name: string;
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.disciplineCard">
    <p :class="styles.disicplineName">{{ name }}</p>
    <div :class="styles.actionsSection"></div>
  </div>
</template>
