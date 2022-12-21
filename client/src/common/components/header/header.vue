<script setup lang="ts">
import { AuthSection, HeaderOption } from "./components/components";
import { defaultSelectOptions } from "./common/common";
import { ref } from "@/hooks/hooks";

import styles from "./styles.module.scss";

const selectOptions = ref(defaultSelectOptions);

const handleSelectionSwitch = (idToFind: number): void => {
  selectOptions.value.forEach((optionToClear) => {
    optionToClear.isSelected = false;

    if (optionToClear.id === idToFind) {
      optionToClear.isSelected = true;
    }
  });
};

const handleSignUpToggle = () => {
  selectOptions.value.forEach((optionToClear) => {
    optionToClear.isSelected = false;
  });
};

selectOptions.value.forEach((option) => {
  const currentPath = window.location.pathname;

  if (option.link === currentPath) {
    option.isSelected = true;
  }
});
</script>

<template>
  <div :class="styles.header">
    <div :class="styles.headerOptionsWrapper">
      <HeaderOption
        v-for="{ id, link, isSelected, name } in selectOptions"
        :key="id"
        :link="link"
        :isSelected="isSelected"
        :name="name"
        :onClick="() => handleSelectionSwitch(id)"
      />
    </div>
    <AuthSection :onClick="handleSignUpToggle" />
  </div>
</template>
