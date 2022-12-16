<script lang="ts" setup>
import styles from "./styles.module.scss";

type Props = {
  imgPath: string;
};

defineProps<Props>();
</script>

<template>
  <img :class="styles.image" :src="imgPath" />
</template>
