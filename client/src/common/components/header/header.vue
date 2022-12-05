<script setup lang="ts">
import { HeaderOption } from "./components/components";
import { defaultSelectOptions } from "./common/common";

import styles from "./styles.module.scss";
import { ref } from "vue";

const selectOptions = ref(defaultSelectOptions);

const handleSelectionSwitch = (idToFind: number): void => {
  const option = selectOptions.value.find(({ id }) => {
    return id === idToFind;
  });

  if (option) {
    option.isSelected = true;
    selectOptions.value.forEach((optionToClear) => {
      if (optionToClear.id !== option.id) {
        optionToClear.isSelected = false;
      }
    });
  }
};
</script>

<template>
  <div :class="styles.header">
    <HeaderOption
      v-for="{ id, link, isSelected, name } in selectOptions"
      :key="id"
      :link="link"
      :isSelected="isSelected"
      :name="name"
      :onClick="() => handleSelectionSwitch(id)"
    />
  </div>
</template>
