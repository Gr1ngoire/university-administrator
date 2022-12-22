<script lang="ts" setup>
import type { ValidationError } from "@/exceptions/exceptions";
import type { UserSignUpRequestDto } from "src/common/types/types";
import { reactive, useRouter, useStore } from "@/hooks/hooks";
import { AuthActions } from "@/store/actions";
import { signUp as signUpValidator } from "@/validators/validators";
import { Input, Button } from "@/common/components/components";

import styles from "./styles.module.scss";
import { AppRoutes } from "@/common/enums/enums";

const router = useRouter();
const store = useStore();

let signUpFormState: UserSignUpRequestDto = {
  name: "",
  surname: "",
  secondName: "",
  role: "",
  phone: "",
  email: "",
  password: "",
};

const signUpValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  surname: "",
  secondName: "",
  role: "",
  phone: "",
  email: "",
  password: "",
});

const handleSignUpValidation: (signUpDto: UserSignUpRequestDto) => void = (
  signUpDto: UserSignUpRequestDto
): void => {
  try {
    signUpValidator.validate(signUpDto);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    signUpValidationState[validationError.field] = validationError.message;
  }
};

const handleSignUpPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  signUpFormState = {
    ...signUpFormState,
    [input.name]: input.value,
  } as UserSignUpRequestDto;

  signUpValidationState[input.name] = "";
  handleSignUpValidation(signUpFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (Object.values(signUpValidationState).every((el) => el.length === 0)) {
    store.dispatch(AuthActions.SIGN_UP, signUpFormState);
    router.push(AppRoutes.SCHEDULE);
  }
};

handleSignUpValidation(signUpFormState);
</script>

<template>
  <form :class="styles.signUpForm" @submit="handleSubmit">
    <div :class="styles.signUpActionSectionWrapper">
      <div :class="styles.signUpInputWrapper">
        <Input
          type="text"
          name="name"
          :value="signUpFormState.name"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.name"
        />
      </div>
      <div :class="styles.signUpInputWrapper">
        <Input
          type="text"
          name="surname"
          :value="signUpFormState.surname"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.surname"
        />
      </div>
      <div :class="styles.signUpInputWrapper">
        <Input
          type="text"
          name="secondName"
          nameToDisplay="Second name"
          :value="signUpFormState.secondName"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.secondName"
        />
      </div>
      <div :class="styles.signUpInputWrapper">
        <Input
          type="text"
          name="role"
          :value="signUpFormState.role"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.role"
        />
      </div>
      <div :class="styles.signUpInputWrapper">
        <Input
          type="text"
          name="phone"
          :value="signUpFormState.phone"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.phone"
        />
      </div>
      <div :class="styles.signUpInputWrapper">
        <Input
          type="text"
          name="email"
          :value="signUpFormState.email"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.email"
        />
      </div>
      <div :class="styles.signUpInputWrapper">
        <Input
          type="password"
          name="password"
          :value="signUpFormState.password"
          :onInput="handleSignUpPropertyChange"
          :errorMessage="signUpValidationState.password"
        />
      </div>
      <div :class="styles.signUpActionButtonsWrapper">
        <Button type="submit" name="Sign Up" action="submit" />
      </div>
    </div>
  </form>
</template>
