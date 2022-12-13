<script lang="ts" setup>
import { computed } from "@/hooks/hooks";
import styles from "./styles.module.scss";

type SelectOption = {
  id: number;
  name: string;
  value: string;
};

type Props = {
  name: string;
  options: SelectOption[];
  onSelect: (event: Event) => void;
};

const props = defineProps<Props>();

const FIRST_NAME_CHARACTER_INDEX = 0;
const SECOND_NAME_CHARACTER_INDEX = 1;
const firstLetterUppercased = computed(() => {
  return `${props.name
    .charAt(FIRST_NAME_CHARACTER_INDEX)
    .toUpperCase()}${props.name.slice(SECOND_NAME_CHARACTER_INDEX)}`;
});
</script>

<template>
  <select :class="styles.select" :name="name" @change="onSelect">
    <label :class="styles.selectLabel">{{ firstLetterUppercased }}</label>
    <option
      v-for="{ id, name, value } in options"
      :key="id"
      :value="value"
      :selected="id === 1 ? 'true' : 'false'"
    >
      {{ name }}
    </option>
  </select>
</template>
