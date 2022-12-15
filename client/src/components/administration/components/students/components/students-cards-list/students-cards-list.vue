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
        v-for="{ id, name, email, phone, groupId, group } in cards"
        :key="id"
        :class="styles.studentsCardsListItem"
      >
        <StudentCard
          :id="id"
          :name="name"
          :email="email"
          :phone="phone"
          :groupId="groupId"
          :group="group"
        />
      </li>
    </ul>
  </div>
</template>
