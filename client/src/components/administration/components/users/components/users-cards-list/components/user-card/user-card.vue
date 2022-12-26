<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  ToggleState,
  UsersGetAllItemAdminResponseDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { passwordEncoder } from "./common/common";
import { UpdateUserForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  user: UsersGetAllItemAdminResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_USER, props.user.id);
};

const initialFormShowState: ToggleState = { state: false };
const userUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  userUpdateFormShowState.state = !userUpdateFormShowState.state;
};
</script>

<template>
  <UpdateUserForm
    v-if="userUpdateFormShowState.state"
    :initialUser="user"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!userUpdateFormShowState.state" :class="styles.userCard">
    <p :class="styles.userName">Name: {{ user.name }}</p>
    <p :class="styles.userSurname">Surname: {{ user.surname }}</p>
    <p :class="styles.userSecondName">Second name: {{ user.secondName }}</p>
    <p :class="styles.userPhone">Phone: {{ user.phone }}</p>
    <p :class="styles.userEmail">Email: {{ user.email }}</p>
    <p :class="styles.userPassword">
      Password: {{ passwordEncoder(user.password) }}
    </p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" :onClick="handleEditToggle" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
