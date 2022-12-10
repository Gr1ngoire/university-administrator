<script setup lang="ts">
import { Button } from "@/common/components/components";
import { useStore } from "@/hooks/hooks";
import { DisciplinesActions } from "@/store/actions.common";

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
</script>

<template>
  <div :class="styles.disciplineCard">
    <p :class="styles.disicplineName">{{ props.name }}</p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
