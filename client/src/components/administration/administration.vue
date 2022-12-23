<script lang="ts" setup>
import type { Component } from "@/common/types/types";
import { Disciplines, PanelsList } from "./components/components";
import { defaultAdministratableOptions } from "./common/common";
import { shallowRef, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";

import "./transitions.scss";
import styles from "./styles.module.scss";

const ShownPanel: Component = shallowRef<Component>(Disciplines);

const handlePanelChoose: (id: number) => () => void =
  (id: number) => (): void => {
    ShownPanel.value = defaultAdministratableOptions.find(
      ({ id: optionId }) => optionId === id
    )?.component as Component;
  };

const store = useStore();

store.dispatch(AdministrationActions.GET_ALL_DISICPLINES);
store.dispatch(AdministrationActions.GET_ALL_FACULTIES);
store.dispatch(AdministrationActions.GET_ALL_TEACHERS);
store.dispatch(AdministrationActions.GET_ALL_DEPARTMENTS);
store.dispatch(AdministrationActions.GET_ALL_GROUPS);
store.dispatch(AdministrationActions.GET_ALL_STUDENTS);
store.dispatch(AdministrationActions.GET_ALL_SCHEDULES);
store.dispatch(AdministrationActions.GET_ALL_USERS);
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <Transition name="panel">
      <ShownPanel v-show="ShownPanel" />
    </Transition>
    <PanelsList :onChoose="handlePanelChoose" />
  </div>
</template>
