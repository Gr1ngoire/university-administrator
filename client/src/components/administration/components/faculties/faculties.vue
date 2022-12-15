<script lang="ts" setup>
import { CreateFacultyForm, FacultiesCardsList } from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const faculties = computed(() => store.state.administration.faculties);

const facultyCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  facultyCreationFormShowState.value = !facultyCreationFormShowState.value;
};
</script>

<template>
  <div :class="styles.facultiesDashboard">
    <div :class="styles.createFacultyForm">
      <CreateFacultyForm
        v-if="facultyCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleFacultyFormButtonWrapper">
        <Button
          v-if="!facultyCreationFormShowState"
          type="click"
          name="Add faculty"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
    <hr
      v-if="facultyCreationFormShowState"
      :class="styles.facultiesSectionsSeparator"
    />
    <FacultiesCardsList :cards="faculties" />
  </div>
</template>
