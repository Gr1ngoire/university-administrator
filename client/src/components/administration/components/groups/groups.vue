<script lang="ts" setup>
import { CreateGroupForm, GroupsCardsList } from "./components/components";
import { computed, ref, useStore } from "@/hooks/hooks";
import { Button } from "@/common/components/components";

import styles from "./styles.module.scss";

const store = useStore();
const groups = computed(() => store.state.administration.groups);
const isGroupCrеationPossible = computed(
  () => store.state.administration.departments.length > 0
);

const groupCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  groupCreationFormShowState.value = !groupCreationFormShowState.value;
};
</script>

<template>
  <div :class="styles.groupsDashboard">
    <div v-if="isGroupCrеationPossible" :class="styles.createGroupForm">
      <CreateGroupForm
        v-if="groupCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleGroupFormButtonWrapper">
        <Button
          v-if="!groupCreationFormShowState"
          type="click"
          name="Add department"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
    <div
      v-else-if="!isGroupCrеationPossible"
      :class="styles.unableToCreateGroupInfoBlock"
    >
      There are no departemnts, you can not create any groups
    </div>
    <hr
      v-if="groupCreationFormShowState"
      :class="styles.groupsSectionsSeparator"
    />
    <GroupsCardsList :cards="groups" />
  </div>
</template>
