<script setup lang="ts">
import { Button, ScheduleDisplayCard } from "@/common/components/components";
import type {
  DisciplinesGetAllItemResponseDto,
  GroupsGetAllItemResponseDto,
  TeachersGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateScheduleForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  time: string;
  classroom: string;
  disciplineId: number;
  discipline: DisciplinesGetAllItemResponseDto;
  teacherId: number;
  teacher: TeachersGetAllItemResponseDto;
  groupId: number;
  group: GroupsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_SCHEDULE, props.id);
};

const initialFormShowState: ToggleState = { state: false };
const scheduleUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  scheduleUpdateFormShowState.state = !scheduleUpdateFormShowState.state;
};
</script>

<template>
  <UpdateScheduleForm
    v-if="scheduleUpdateFormShowState.state"
    :initialSchedule="{
      id,
      time,
      classroom,
      disciplineId,
      discipline,
      teacherId,
      teacher,
      groupId,
      group,
    }"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!scheduleUpdateFormShowState.state"
    :class="styles.scheduleCard"
  >
    <ScheduleDisplayCard
      :time="time"
      :classroom="classroom"
      :disciplineName="discipline.name"
      :teacherName="`${teacher.name} ${teacher.surname}`"
      :groupName="group.name"
    />
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
