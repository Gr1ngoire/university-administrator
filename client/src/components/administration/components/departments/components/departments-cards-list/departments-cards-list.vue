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
        v-for="{ id, name, shortName, facultyId, faculty } in cards"
        :key="id"
        :class="styles.departmentsCardsListItem"
      >
        <DepartmentCard
          :id="id"
          :name="name"
          :shortName="shortName"
          :facultyId="facultyId"
          :faculty="faculty"
        />
      </li>
    </ul>
  </div>
</template>
