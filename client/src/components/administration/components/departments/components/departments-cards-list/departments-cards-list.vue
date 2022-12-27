<script lang="ts" setup>
import type { DepartmentsGetAllItemResponseDto } from "@/common/types/types";
import { DepartmentCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: DepartmentsGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.departmentsCardsListWrapper">
    <ul :class="styles.departmentsCardsList">
      <li
        v-for="card in cards"
        :key="card.id"
        :class="styles.departmentsCardsListItem"
      >
        <DepartmentCard :department="card" />
      </li>
    </ul>
  </div>
</template>
