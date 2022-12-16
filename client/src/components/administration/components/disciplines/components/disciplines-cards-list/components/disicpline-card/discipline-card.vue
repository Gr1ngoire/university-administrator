<script setup lang="ts">
import { Button } from "@/common/components/components";
import type { ToggleState } from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions
import { UpdateDisciplineForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  name: string;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_DISCIPLINE, props.id);
};

const initialFormShowState: ToggleState = { state: false };
const disciplineUpdateFormShowState =
  reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  disciplineUpdateFormShowState.state = !disciplineUpdateFormShowState.state;
};
</script>

<template>
  <UpdateDisciplineForm
    v-if="disciplineUpdateFormShowState.state"
    :initialDiscipline="{ id, name }"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!disciplineUpdateFormShowState.state"
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
