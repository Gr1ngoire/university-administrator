<script setup lang="ts">
import { Button, ScheduleDisplayCard } from "@/common/components/components";
import type {
  SchedulesGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateScheduleForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  scheduleRecord: SchedulesGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(
    AdministrationActions.DELETE_SCHEDULE,
    props.scheduleRecord.id
  );
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
    :initialSchedule="scheduleRecord"
    :onToggle="handleEditToggle"
  />
  <div
    v-else-if="!scheduleUpdateFormShowState.state"
    :class="styles.scheduleCard"
  >
    <ScheduleDisplayCard
      :time="scheduleRecord.time"
      :classroom="scheduleRecord.classroom"
      :disciplineName="scheduleRecord.discipline.name"
      :teacherName="`${scheduleRecord.teacher.user.name} ${scheduleRecord.teacher.user.surname}`"
      :groupName="scheduleRecord.group.name"
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
