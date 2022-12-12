<script lang="ts" setup>
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

type Props = {
  name: string;
  isSelected: boolean;
  onChoose: () => void;
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.panelListOptionWrapper">
    <Button
      type="click"
      action="panelOption"
      :name="name"
      :focused="isSelected"
      :onClick="onChoose"
    />
  </div>
</template>
