<script lang="ts" setup>
import type { Component } from "@/common/types/types";
import { Disciplines, PanelsList } from "./components/components";
import { defaultAdministratableOptions } from "./common/common";

import styles from "./styles.module.scss";

let shownPanel: Component = Disciplines;

const handlePanelChoose: (id: number) => () => void =
  (id: number) => (): void => {
    shownPanel = defaultAdministratableOptions.find(
      ({ id: optionId }) => optionId === id
    )?.component as Component;
  };
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <shownPanel />
    <PanelsList :onChoose="handlePanelChoose" />
  </div>
</template>
