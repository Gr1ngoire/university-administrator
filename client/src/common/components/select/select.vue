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
  defaultOptionId?: number;
  nameToDisplay?: string;
};

const props = defineProps<Props>();

const FIRST_NAME_CHARACTER_INDEX = 0;
const SECOND_NAME_CHARACTER_INDEX = 1;
const firstLetterUppercased = computed(() => {
  return (
    props.nameToDisplay ??
    `${props.name
      .charAt(FIRST_NAME_CHARACTER_INDEX)
      .toUpperCase()}${props.name.slice(SECOND_NAME_CHARACTER_INDEX)}`
  );
});

const finalDefaultOptionId = props.defaultOptionId ?? 1;
</script>

<template>
  <label :class="styles.selectLabel">{{ firstLetterUppercased }}</label>
  <select :class="styles.select" :name="name" @change="onSelect">
    <option
      v-for="{ id, name, value } in options"
      :key="id"
      :value="value"
      :selected="id === finalDefaultOptionId"
    >
      {{ name }}
    </option>
  </select>
</template>
