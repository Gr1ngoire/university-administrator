<script lang="ts" setup>
import { computed } from "@/hooks/hooks";
import styles from "./styles.module.scss";

type InputType = "text" | "number" | "password" | "email" | "textarea";

type Props = {
  type: InputType;
  name: string;
  errorMessage: string;
  onInput: (event: Event) => void;
  value?: string;
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
  <div :class="styles.inputWrapper">
    <label :class="styles.inputLabel">{{ firstLetterUppercased }}</label>
    <input
      :class="styles.input"
      :type="type"
      :name="name"
      :value="value"
      @input="onInput"
    />
    <span :class="styles.errorLabel">{{ errorMessage }}&nbsp;</span>
  </div>
</template>
