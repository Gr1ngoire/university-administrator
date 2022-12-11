<script lang="ts" setup>
import {
  CreateDisciplineForm,
  DisciplinesCardList,
} from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { DisciplinesActions } from "@/store/actions.common";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const disciplines = computed(() => store.state.disciplines.disciplines);

const disciplineCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  disciplineCreationFormShowState.value =
    !disciplineCreationFormShowState.value;
};

store.dispatch(DisciplinesActions.GET_ALL_DISICPLINES);
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <div :class="styles.disciplinesDashboard">
      <div :class="styles.createDisciplineForm">
        <CreateDisciplineForm
          v-if="disciplineCreationFormShowState"
          :onToggle="handleToggle"
        />
        <div :class="styles.toggleDisciplineFormButtonWrapper">
          <Button
            v-if="!disciplineCreationFormShowState"
            type="click"
            name="Add discipline"
            action="add"
            :onClick="handleToggle"
          />
        </div>
      </div>
      <hr
        v-if="disciplineCreationFormShowState"
        :class="styles.disciplinesSectionsSeparator"
      />
      <DisciplinesCardList :cards="disciplines" />
    </div>
  </div>
</template>
