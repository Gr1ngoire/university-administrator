<script lang="ts" setup>
import type { ValidationError } from "@/exceptions/exceptions";
import type {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from "src/common/types/types";
import { reactive, useRouter, useStore } from "@/hooks/hooks";
import { AuthActions } from "@/store/actions";
import { signIn as signInValidator } from "@/validators/validators";

import styles from "./styles.module.scss";
import { AppRoutes } from "@/common/enums/enums";

const router = useRouter();
const store = useStore();

let signInFormState: UserSignInRequestDto = {
  email: "",
  password: "",
};

const signInValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  email: "",
  password: "",
});

const handleSignInValidation: (signInDto: UserSignInRequestDto) => void = (
  signInDto: UserSignInRequestDto
): void => {
  try {
    signInValidator.validate(signInDto);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    signInValidationState[validationError.field] = validationError.message;
  }
};

const handleSignInPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  signInFormState = {
    ...signInFormState,
    [input.name]: input.value,
  } as UserSignUpRequestDto;

  signInValidationState[input.name] = "";
  handleSignInValidation(signInFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (Object.values(signInValidationState).every((el) => el.length === 0)) {
    store.dispatch(AuthActions.SIGN_UP, signInFormState);
    router.push(AppRoutes.SCHEDULE);
  }
};
</script>

<template>
  <form :class="styles.signInForm" @submit="handleSubmit">
    <div :class="styles.signInInputWrapper">
      <Input
        type="text"
        name="email"
        :value="signInFormState.email"
        :onInput="handleSignInPropertyChange"
        :errorMessage="signInValidationState.email"
      />
    </div>
    <div :class="styles.signInInputWrapper">
      <Input
        type="text"
        name="password"
        :value="signInFormState.password"
        :onInput="handleSignInPropertyChange"
        :errorMessage="signInValidationState.password"
      />
    </div>
    <div :class="styles.userActionButtonsWrapper">
      <Button type="submit" name="Sign Up" action="submit" />
    </div>
  </form>
</template>
