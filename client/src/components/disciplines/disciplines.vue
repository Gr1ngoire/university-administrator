<script lang="ts" setup>
import { computed } from "vue";
import { DisciplinesCardList } from "./components/components";
import { useStore } from "@/hooks/hooks";
import { DisciplinesActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

const store = useStore();

const disciplines = computed(() => store.state.disciplines.disciplines);

console.log(store.dispatch(DisciplinesActions.GET_ALL_DISICPLINES));
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <div :class="styles.disciplinesDashboard">
      <DisciplinesCardList :cards="disciplines" />
    </div>
  </div>
</template>
