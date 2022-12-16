<script lang="ts" setup>
import { Button, Input, TextArea } from "@/common/components/components";
import type {
  NewsGetAllItemResponseDto,
  UpdateNewsRequestDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { news as newsValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { NewsActions } from "@/store/actions

import styles from "./styles.module.scss";

type Props = {
  initialNews: NewsGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

let newsUpdateFormState: UpdateNewsRequestDto = {
  title: props.initialNews.title,
  content: props.initialNews.content,
  imgUrl: props.initialNews.imgUrl,
};

const newsUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  title: "",
  content: "",
});

const handleNewsUpdateValidation: (news: UpdateNewsRequestDto) => void = (
  news: UpdateNewsRequestDto
): void => {
  try {
    newsValidator.validate(news);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    newsUpdateValidationState[validationError.field] = validationError.message;
  }
};

const handleNewsPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  newsUpdateFormState = {
    ...newsUpdateFormState,
    [input.name]: input.value,
  } as UpdateNewsRequestDto;

  newsUpdateValidationState[input.name] = "";
  handleNewsUpdateValidation(newsUpdateFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (Object.values(newsUpdateValidationState).every((el) => el.length === 0)) {
    store.dispatch(NewsActions.UPDATE_NEWS, {
      id: props.initialNews.id,
      payload: newsUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.newsUpdateForm" @submit="handleSubmit">
    <div :class="styles.newsUpdateActionSectionWrapper">
      <div :class="styles.newsEditFieldsWrapper">
        <div :class="styles.newsEditInputWrapper">
          <Input
            type="text"
            name="title"
            :value="newsUpdateFormState.title"
            :onInput="handleNewsPropertyChange"
            :errorMessage="newsUpdateValidationState.title"
          />
        </div>
        <div :class="styles.newsEditTextAreaWrapper">
          <TextArea
            type="text"
            name="content"
            :value="newsUpdateFormState.content"
            :onInput="handleNewsPropertyChange"
            :errorMessage="newsUpdateValidationState.content"
          />
        </div>
        <div :class="styles.newsEditInputWrapper">
          <Input
            type="text"
            name="imgUrl"
            nameToDisplay="URL image link"
            :value="newsUpdateFormState.imgUrl ?? ''"
            :onInput="handleNewsPropertyChange"
          />
        </div>
      </div>
      <div :class="styles.newsActionButtonsWrapper">
        <Button type="submit" name="Update" action="submit" />
        <Button
          type="click"
          name="Cancel"
          action="cancel"
          :onClick="onToggle"
        />
      </div>
    </div>
  </form>
</template>
