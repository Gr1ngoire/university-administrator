<script setup lang="ts">
import { Button } from "@/common/components/components";
import type { ToggleState } from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { passwordEncoder } from "./common/common";
import { UpdateUserForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  name: string;
  surname: string;
  secondName: string;
  role: string;
  phone: string;
  email: string;
  password: string;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_USER, props.id);
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
    :initialUser="{
      id,
      name,
      surname,
      secondName,
      role,
      phone,
      email,
      password,
    }"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!userUpdateFormShowState.state" :class="styles.userCard">
    <p :class="styles.userName">Name: {{ props.name }}</p>
    <p :class="styles.userSurname">Surname: {{ props.surname }}</p>
    <p :class="styles.userSecondName">Second name: {{ props.secondName }}</p>
    <p :class="styles.userRole">Role: {{ props.role }}</p>
    <p :class="styles.userPhone">Phone: {{ props.phone }}</p>
    <p :class="styles.userEmail">Email: {{ props.email }}</p>
    <p :class="styles.userPassword">
      Password: {{ passwordEncoder(props.password) }}
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
