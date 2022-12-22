<script lang="ts" setup>
import type { TeachersGetAllItemResponseDto } from "@/common/types/types";
import { TeacherCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: TeachersGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.teachersCardsListWrapper">
    <ul :class="styles.teachersCardsList">
      <li
        v-for="{ id, userId, user, departmentId, department } in cards"
        :key="id"
        :class="styles.teachersCardsListItem"
      >
        <TeacherCard
          :id="id"
          :fullName="`${user.surname} ${user.name} ${user.secondName}`"
          :userId="userId"
          :user="user"
          :departmentId="departmentId"
          :department="department"
        />
      </li>
    </ul>
  </div>
</template>
