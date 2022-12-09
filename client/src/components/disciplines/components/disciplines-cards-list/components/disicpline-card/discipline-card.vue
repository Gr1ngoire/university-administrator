<script setup lang="ts">
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

type Props = {
  name: string;
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.disciplineCard">
    <p :class="styles.disicplineName">{{ name }}</p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" />
      </div>
    </div>
  </div>
</template>
