<script lang="ts" setup>
import { Button, TextArea } from "@/common/components/components";
import type {
  CreateFaqMessageRequestDto,
  UserWithGrantDto,
} from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { FaqActions } from "@/store/actions";
import { faqMessage as faqMessageValidator } from "@/validators/validators";

import styles from "./styles.module.scss";

const store = useStore();

const currentUser = computed(
  () => store.state.auth.currentUser as UserWithGrantDto
);

let faqMessageCreationFormState: CreateFaqMessageRequestDto = {
  message: "",
  authorId: currentUser.value.id,
};

const faqMessageCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  message: "",
});

const handleFaqMessagesCreationValidation: (
  faqMessage: CreateFaqMessageRequestDto
) => void = (faqMessage: CreateFaqMessageRequestDto): void => {
  try {
    faqMessageValidator.validate(faqMessage);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    faqMessageCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleFaqMessagePropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  faqMessageCreationFormState = {
    ...faqMessageCreationFormState,
    [input.name]: input.value,
  } as CreateFaqMessageRequestDto;

  faqMessageCreationValidationState[input.name] = "";
  handleFaqMessagesCreationValidation(faqMessageCreationFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(faqMessageCreationValidationState).every(
      (el) => el.length === 0
    )
  ) {
    store.dispatch(FaqActions.CREATE_FAQ_MESSAGE, faqMessageCreationFormState);
    faqMessageCreationFormState = {
      message: "",
      authorId: currentUser.value.id,
    };
  }
};

handleFaqMessagesCreationValidation(faqMessageCreationFormState);
</script>

<template>
  <form :class="styles.faqMessageForm" @submit="handleSubmit">
    <div :class="styles.faqMessageTextAreaWrapper">
      <TextArea
        name="message"
        nameToDisplay=""
        placeholder="Your question here"
        :onInput="handleFaqMessagePropertyChange"
        :value="faqMessageCreationFormState.message"
        :errorMessage="faqMessageCreationValidationState.message"
      />
    </div>
    <Button name="Ask" type="submit" action="submit" />
  </form>
</template>
