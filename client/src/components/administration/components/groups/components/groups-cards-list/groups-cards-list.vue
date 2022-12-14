<script lang="ts" setup>
import type { GroupsGetAllItemResponseDto } from "@/common/types/types";
import { GroupCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: GroupsGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.groupsCardsListWrapper">
    <ul :class="styles.groupsCardsList">
      <li
        v-for="{ id, name, course, departmentId, department } in cards"
        :key="id"
        :class="styles.groupsCardsListItem"
      >
        <GroupCard
          :id="id"
          :name="name"
          :course="course"
          :departmentId="departmentId"
          :department="department"
        />
      </li>
    </ul>
  </div>
</template>
