<script setup lang="ts">
import { RouterView } from "vue-router";
import { Header } from "@/common/components/components";
import { AuthActions } from "@/store/actions";
import { useStore } from "@/hooks/hooks";

import "./transitions.scss";

const store = useStore();
store.dispatch(AuthActions.GET_CURRENT_USER);
</script>

<template>
  <Header />
  <Transition name="app">
    <RouterView />
  </Transition>
</template>
