<script lang="ts" setup>
import { computed } from "@/hooks/hooks";
import styles from "./styles.module.scss";

type InputType = "text" | "number" | "password" | "email";

type Props = {
  type: InputType;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  nameToDisplay?: string;
  max?: number;
  min?: number;
  onInput: (event: Event) => void;
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
</script>

<template>
  <div :class="styles.inputWrapper">
    <label :class="styles.inputLabel">{{ firstLetterUppercased }}</label>
    <input
      :class="styles.input"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :value="value"
      :max="max"
      :min="min"
      @input="onInput"
    />
    <span :class="styles.errorSpan">{{ errorMessage }}&nbsp;</span>
  </div>
</template>
