<script lang="ts" setup>
import { Button, Select } from "@/common/components/components";
import type {
  GrantsGetAllItemAdminResponseDto,
  UpdateGrantRequestDto,
  UserWithGrantDto,
} from "@/common/types/types";
import { computed, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { defaultGrantSelectOptions } from "./common/common";

import styles from "./styles.module.scss";

type Props = {
  initialGrant: GrantsGetAllItemAdminResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();

const currentUser = computed(() => store.state.auth.currentUser);

let grantUpdateFormState: UpdateGrantRequestDto = {
  grant: props.initialGrant.grant,
  granterId:
    props.initialGrant.granterId ?? (currentUser.value as UserWithGrantDto).id,
};

const handleGrantPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  grantUpdateFormState = {
    ...grantUpdateFormState,
    [input.name]: input.value,
  } as UpdateGrantRequestDto;
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  store.dispatch(AdministrationActions.UPDATE_GRANT, {
    id: props.initialGrant.id,
    payload: grantUpdateFormState,
  });
  props.onToggle();
};

const defaultOptionId: number | undefined = defaultGrantSelectOptions.find(
  (option) => option.name === props.initialGrant.grant
)?.id;
</script>

<template>
  <form :class="styles.grantUpdateForm" @submit="handleSubmit">
    <div :class="styles.grantUpdateActionSectionWrapper">
      <div :class="styles.grantEditFieldsWrapper">
        <h1 :class="styles.grantedFullName">
          {{
            `${initialGrant.user.surname} ${initialGrant.user.name} ${initialGrant.user.secondName}`
          }}
        </h1>
        <div :class="styles.grantEditSelectWrapper">
          <Select
            name="grant"
            :options="defaultGrantSelectOptions"
            :onSelect="handleGrantPropertyChange"
            :defaultOptionId="defaultOptionId"
          />
        </div>
        <div :class="styles.grantActionButtonsWrapper">
          <Button type="submit" name="Update" action="submit" />
          <Button
            type="click"
            name="Cancel"
            action="cancel"
            :onClick="onToggle"
          />
        </div>
      </div>
    </div>
  </form>
</template>
