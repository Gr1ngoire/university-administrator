<script lang="ts" setup>
import { PanelListOption } from "./components/components";
import { defaultPanelOptions } from "./common/common";
import { reactive } from "@/hooks/hooks";

import styles from "./styles.module.scss";

type Props = {
  onChoose: (id: number) => () => void;
};

const props = defineProps<Props>();

const options = reactive(defaultPanelOptions);

const handlePanelOptionSwitch: (id: number) => () => void =
  (id: number) => () => {
    props.onChoose(id)();

    options.forEach((option) => {
      option.isSelected = false;
      if (option.id === id) {
        option.isSelected = true;
      }
    });
  };
</script>

<template>
  <ul :class="styles.panelsList">
    <li v-for="{ id, name, isSelected } in options" :key="id">
      <Transition name="panel-option">
        <PanelListOption
          :name="name"
          :isSelected="isSelected"
          :onChoose="handlePanelOptionSwitch(id)"
        />
      </Transition>
    </li>
  </ul>
</template>
