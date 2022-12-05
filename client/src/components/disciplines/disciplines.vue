<script lang="ts" setup>
import type { DisciplinesGetAllItemRequestDto } from "shared/common/types/types";
import {} from "./components/components";
import styles from "./styles.module.scss";

const mock: DisciplinesGetAllItemRequestDto[] = [];
</script>

<template>
  <div :class="styles.disciplinesDashboard">
    <div :class="styles.disciplinesList">
      <DisciplinesCardsList :cards="mock" />
    </div>
  </div>
</template>
