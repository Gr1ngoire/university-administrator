<script lang="ts" setup>
import styles from "./styles.module.scss";

type Props = {
  time: string;
  classroom: string;
  disciplineName: string;
  teacherName: string;
  groupName: string;
};

defineProps<Props>();
</script>

<template>
  <p :class="styles.scheduleDiscipline">Discipline: {{ disciplineName }}</p>
  <p :class="styles.scheduleGroup">Group: {{ groupName }}</p>
  <p :class="styles.scheduleTime">Time: {{ time }}</p>
  <p :class="styles.scheduleClassroom">Classroom: {{ classroom }}</p>
  <p :class="styles.scheduleTeacher">Teacher: {{ teacherName }}</p>
</template>
