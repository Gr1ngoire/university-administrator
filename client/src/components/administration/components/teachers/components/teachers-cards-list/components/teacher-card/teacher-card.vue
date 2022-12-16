<script setup lang="ts">
import { Button } from "@/common/components/components";
import type { ToggleState } from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateTeacherForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  email: string;
  phone: string;
  name: string;
  surname: string;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_TEACHER, props.id);
};

const initialFormShowState: ToggleState = { state: false };
const teacherUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  teacherUpdateFormShowState.state = !teacherUpdateFormShowState.state;
};
</script>

<template>
  <UpdateTeacherForm
    v-if="teacherUpdateFormShowState.state"
    :initialTeacher="{ id, email, phone, name, surname }"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!teacherUpdateFormShowState.state"
    :class="styles.teacherCard"
  >
    <p :class="styles.teacherEmail">Email: {{ props.email }}</p>
    <p :class="styles.teacherPhone">Phone: {{ props.phone }}</p>
    <p :class="styles.teacherName">Name: {{ props.name }}</p>
    <p :class="styles.teacherSurname">Surname: {{ props.surname }}</p>
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
