<script lang="ts" setup>
import { DisciplinesCardList } from "./components/components";
import { useStore } from "@/hooks/hooks";

import styles from "./styles.module.scss";
import { DisciplinesActions } from "@/store/actions.common";
import { computed } from "vue";

const store = useStore();

console.log(store.state.disciplines.disciplines);

const disciplines = computed(() => store.state.disciplines.disciplines);

console.log(disciplines);

console.log(
  store.dispatch(`disciplines/${DisciplinesActions.GET_ALL_DISICPLINES}`)
);
</script>

<template>
  <div :class="styles.disciplinesDashboard">
    <div :class="styles.disciplinesList">
      <DisciplinesCardList :cards="disciplines" />
    </div>
  </div>
</template>
