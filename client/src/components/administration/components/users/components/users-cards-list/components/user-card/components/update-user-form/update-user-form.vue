<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type {
  UsersGetAllItemAdminResponseDto,
  UpdateUserRequestDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { userUpdate as userUpdateValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  initialUser: UsersGetAllItemAdminResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

let userUpdateFormState: UpdateUserRequestDto = {
  name: props.initialUser.name,
  surname: props.initialUser.surname,
  secondName: props.initialUser.secondName,
  phone: props.initialUser.phone,
  email: props.initialUser.email,
  password: props.initialUser.password,
};

const userUpdateValidationState: Record<string, string> = reactive<
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

const handleUserUpdateValidation: (user: UpdateUserRequestDto) => void = (
  user: UpdateUserRequestDto
): void => {
  try {
    userUpdateValidator.validate(user);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    userUpdateValidationState[validationError.field] = validationError.message;
  }
};

const handleUserPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  userUpdateFormState = {
    ...userUpdateFormState,
    [input.name]: input.value,
  } as UpdateUserRequestDto;

  userUpdateValidationState[input.name] = "";
  handleUserUpdateValidation(userUpdateFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (Object.values(userUpdateValidationState).every((el) => el.length === 0)) {
    store.dispatch(AdministrationActions.UPDATE_USER, {
      id: props.initialUser.id,
      payload: userUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.userUpdateForm" @submit="handleSubmit">
    <div :class="styles.userUpdateActionSectionWrapper">
      <div :class="styles.userEditFieldsWrapper">
        <div :class="styles.userEditInputWrapper">
          <Input
            type="text"
            name="name"
            :value="userUpdateFormState.name"
            :onInput="handleUserPropertyChange"
            :errorMessage="userUpdateValidationState.name"
          />
        </div>
        <div :class="styles.userEditInputWrapper">
          <Input
            type="text"
            name="surname"
            :value="userUpdateFormState.surname"
            :onInput="handleUserPropertyChange"
            :errorMessage="userUpdateValidationState.surname"
          />
        </div>
        <div :class="styles.userEditInputWrapper">
          <Input
            type="text"
            name="secondName"
            nameToDisplay="Second name"
            :value="userUpdateFormState.secondName"
            :onInput="handleUserPropertyChange"
            :errorMessage="userUpdateValidationState.secondName"
          />
        </div>
        <div :class="styles.userEditInputWrapper">
          <Input
            type="text"
            name="phone"
            :value="userUpdateFormState.phone"
            :onInput="handleUserPropertyChange"
            :errorMessage="userUpdateValidationState.phone"
          />
        </div>
        <div :class="styles.userEditInputWrapper">
          <Input
            type="text"
            name="email"
            :value="userUpdateFormState.email"
            :onInput="handleUserPropertyChange"
            :errorMessage="userUpdateValidationState.email"
          />
        </div>
        <div :class="styles.userEditInputWrapper">
          <Input
            type="text"
            name="password"
            :value="userUpdateFormState.password"
            :onInput="handleUserPropertyChange"
            :errorMessage="userUpdateValidationState.password"
          />
        </div>
      </div>
      <div :class="styles.userActionButtonsWrapper">
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
