<script setup lang="ts">
import { Button } from "@/common/components/components";
import { ref, useStore } from "@/hooks/hooks";
import { DisciplinesActions } from "@/store/actions.common";
import { UpdateDisciplineForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  name: string;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(DisciplinesActions.DELETE_DISCIPLINE, props.id);
};

const disciplineUpdateFormShowState = ref<boolean>(false);
const handleEditToggle: () => void = (): void => {
  disciplineUpdateFormShowState.value = !disciplineUpdateFormShowState.value;
};
</script>

<template>
  <UpdateDisciplineForm
    v-if="disciplineUpdateFormShowState"
    :initialDiscipline="{ id, name }"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!disciplineUpdateFormShowState"
    :class="styles.disciplineCard"
  >
    <p :class="styles.disicplineName">{{ props.name }}</p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" :onClick="handleEditToggle" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
