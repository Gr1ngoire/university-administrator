<script lang="ts" setup>
import type { Component } from "@/common/types/types";
import { Disciplines } from "./components/components";
import styles from "./styles.module.scss";

const shownPanel: Component = Disciplines;
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <shownPanel />
  </div>
</template>
