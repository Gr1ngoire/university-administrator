<script lang="ts" setup>
import type { StudentsGetAllItemResponseDto } from "@/common/types/types";
import { StudentCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: StudentsGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.studentsCardsListWrapper">
    <ul :class="styles.studentsCardsList">
      <li
        v-for="{ id, userId, user, groupId, group } in cards"
        :key="id"
        :class="styles.studentsCardsListItem"
      >
        <StudentCard
          :id="id"
          :fullName="`${user.surname} ${user.name} ${user.secondName}`"
          :userId="userId"
          :user="user"
          :groupId="groupId"
          :group="group"
        />
      </li>
    </ul>
  </div>
</template>
