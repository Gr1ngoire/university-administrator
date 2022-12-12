<script lang="ts" setup>
import type { Component } from "@/common/types/types";
import { Disciplines, PanelsList } from "./components/components";
import { defaultAdministratableOptions } from "./common/common";

import styles from "./styles.module.scss";
import { ref } from "@/hooks/hooks";

const ShownPanel: Component = ref<Component>(Disciplines);

const handlePanelChoose: (id: number) => () => void =
  (id: number) => (): void => {
    ShownPanel.value = defaultAdministratableOptions.find(
      ({ id: optionId }) => optionId === id
    )?.component as Component;
  };
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <ShownPanel />
    <PanelsList :onChoose="handlePanelChoose" />
  </div>
</template>
