<script setup lang="ts">
import { AppRoutes } from "@/common/enums/enums";
import { HeaderOption } from "./components/components";
import styles from "./styles.module.scss";
</script>

<template>
  <div :class="styles.header">
    <HeaderOption :link="AppRoutes.DEPARTMENTS" description="Departments" />
    <HeaderOption :link="AppRoutes.DISCIPLINES" description="Disciplines" />
    <HeaderOption :link="AppRoutes.FACULTIES" description="Faculties" />
    <HeaderOption :link="AppRoutes.GROUPS" description="Groups" />
    <HeaderOption :link="AppRoutes.NEWS" description="Disciplines" />
    <HeaderOption :link="AppRoutes.SCHEDULES" description="Schedules" />
    <HeaderOption :link="AppRoutes.STUDENTS" description="Students" />
    <HeaderOption :link="AppRoutes.TEACHERS" description="Teachers" />
  </div>
</template>
