<script setup lang="ts">
import { RouterView } from "vue-router";
import { Header } from "@/common/components/components";
import { AuthActions } from "@/store/actions";
import { useStore } from "@/hooks/hooks";

const store = useStore();
store.dispatch(AuthActions.GET_CURRENT_USER);
</script>

<template>
  <Header />
  <RouterView />
</template>
