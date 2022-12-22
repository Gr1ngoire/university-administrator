<script lang="ts" setup>
import { UsersCardsList } from "./components/components";
import { computed, useStore } from "@/hooks/hooks";

import styles from "./styles.module.scss";

const store = useStore();
const users = computed(() => store.state.administration.users);
</script>

<template>
  <div :class="styles.usersDashboard">
    <UsersCardsList :cards="users" />
  </div>
</template>
