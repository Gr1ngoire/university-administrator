<script lang="ts" setup>
import { Button, Input, TextArea } from "@/common/components/components";
import type { CreateNewsRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { news as newsValidator } from "@/validators/validators";
import { reactive, useStore } from "@/hooks/hooks";
import { NewsActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

let newsCreationFormState: CreateNewsRequestDto = {
  title: "",
  content: "",
  imgUrl: null,
};

const newsCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  title: "",
  content: "",
});

const handleNewsCreationValidation: (news: CreateNewsRequestDto) => void = (
  news: CreateNewsRequestDto
): void => {
  try {
    newsValidator.validate(news);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    newsCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleDepartmentPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  newsCreationFormState = {
    ...newsCreationFormState,
    [input.name]: input.value,
  } as CreateNewsRequestDto;

  newsCreationValidationState[input.name] = "";
  handleNewsCreationValidation(newsCreationFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(newsCreationValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(NewsActions.CREATE_NEWS, newsCreationFormState);
    props.onToggle();
  }
};

handleNewsCreationValidation(newsCreationFormState);
</script>

<template>
  <form :class="styles.newsCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="title"
      :onInput="handleDepartmentPropertyChange"
      :value="newsCreationFormState.title"
      :errorMessage="newsCreationValidationState.title"
    />
    <TextArea
      name="content"
      :onInput="handleDepartmentPropertyChange"
      :value="newsCreationFormState.content"
      :errorMessage="newsCreationValidationState.content"
    />
    <Input
      type="text"
      name="imgUrl"
      nameToDisplay="URL image link"
      :onInput="handleDepartmentPropertyChange"
      :value="newsCreationFormState.imgUrl ?? ''"
    />
    <div :class="styles.newsCreationFormActionSection">
      <Button type="submit" name="Post news" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>
