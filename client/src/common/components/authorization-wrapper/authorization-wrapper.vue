<script lang="ts" setup>
import { AppRoutes } from "@/common/enums/enums";
import type { Component } from "@/common/types/types";
import { computed, useRouter, useStore } from "@/hooks/hooks";
import type { UserWithGrantDto } from "shared/common/types/types";

type Props = {
  children: Component | Component[];
};

defineProps<Props>();

const router = useRouter();
const store = useStore();

const currentUser = computed<UserWithGrantDto | null>(
  () => store.state.auth.currentUser
);

if (!currentUser) {
  router.push(AppRoutes.SCHEDULE);
}
</script>

<template>
  <children v-if="currentUser" />
  <slot v-if="currentUser" />
</template>
