<script lang="ts" setup>
import { Button, Input, Select } from "@/common/components/components";
import type {
  GroupsGetAllItemResponseDto,
  UpdateGroupRequestDto,
} from "@/common/types/types";
import { computed, reactive, useStore } from "@/hooks/hooks";
import { group as groupValidator } from "@/validators/validators";
import type { ValidationError } from "@/exceptions/exceptions";
import { AdministrationActions } from "@/store/actions";

import styles from "./styles.module.scss";

type Props = {
  initialGroup: GroupsGetAllItemResponseDto;
  onToggle: () => void;
};

const props = defineProps<Props>();

const store = useStore();
const departments = computed(() => store.state.administration.departments);
const departmentSelectOptions = departments.value.map(({ id, name }) => ({
  id,
  name,
  value: String(id),
}));

let groupUpdateFormState: UpdateGroupRequestDto = {
  name: props.initialGroup.name,
  course: props.initialGroup.course,
  departmentId: props.initialGroup.departmentId,
};

const groupUpdateValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  course: "",
});

const handleGroupUpdateValidation: (group: UpdateGroupRequestDto) => void = (
  group: UpdateGroupRequestDto
): void => {
  try {
    groupValidator.validate(group);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    groupUpdateValidationState[validationError.field] = validationError.message;
  }
};

const handleGroupPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  groupUpdateFormState = {
    ...groupUpdateFormState,
    [input.name]:
      input.name === "facultyId" || input.name === "course"
        ? parseInt(input.value)
        : input.value,
  } as UpdateGroupRequestDto;

  groupUpdateValidationState[input.name] = "";
  handleGroupUpdateValidation(groupUpdateFormState);
};

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(groupUpdateValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(AdministrationActions.UPDATE_GROUP, {
      id: props.initialGroup.id,
      payload: groupUpdateFormState,
    });
    props.onToggle();
  }
};
</script>

<template>
  <form :class="styles.groupUpdateForm" @submit="handleSubmit">
    <div :class="styles.groupUpdateActionSectionWrapper">
      <div :class="styles.groupEditFieldsWrapper">
        <div :class="styles.groupEditInputWrapper">
          <Input
            type="text"
            name="name"
            :value="groupUpdateFormState.name"
            :onInput="handleGroupPropertyChange"
            :errorMessage="groupUpdateValidationState.name"
          />
        </div>
        <div :class="styles.groupEditInputWrapper">
          <Input
            type="number"
            name="course"
            :value="String(groupUpdateFormState.course)"
            :onInput="handleGroupPropertyChange"
            :errorMessage="groupUpdateValidationState.course"
            :max="6"
            :min="1"
          />
        </div>
        <div :class="styles.groupEditSelectWrapper">
          <Select
            name="departmentId"
            nameToDisplay="Department"
            :options="departmentSelectOptions"
            :onSelect="handleGroupPropertyChange"
            :defaultOptionId="initialGroup.departmentId"
          />
        </div>
      </div>
      <div :class="styles.groupActionButtonsWrapper">
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
