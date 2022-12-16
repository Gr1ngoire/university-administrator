<script lang="ts" setup>
import { computed } from "@/hooks/hooks";
import styles from "./styles.module.scss";

type Props = {
  name: string;
  errorMessage?: string;
  onInput: (event: Event) => void;
  value?: string;
  nameToDisplay?: string;
  max?: number;
  min?: number;
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
  <div :class="styles.textareaWrapper">
    <label :class="styles.textareaLabel">{{ firstLetterUppercased }}</label>
    <textarea
      :class="styles.textarea"
      :name="name"
      :value="value"
      @input="onInput"
    >
    </textarea>
    <span :class="styles.errorSpan">{{ errorMessage }}&nbsp;</span>
  </div>
</template>
