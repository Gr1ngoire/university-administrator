<script lang="ts" setup>
import { GrantsCardsList } from "./components/components";
import { computed, useStore } from "@/hooks/hooks";

import styles from "./styles.module.scss";

const store = useStore();
const grants = computed(() => store.state.administration.grants);
</script>

<template>
  <div :class="styles.grantsDashboard">
    <GrantsCardsList :cards="grants" />
  </div>
</template>
