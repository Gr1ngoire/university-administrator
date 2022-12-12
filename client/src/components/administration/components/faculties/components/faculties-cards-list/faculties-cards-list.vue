<script lang="ts" setup>
import type { FacultiesGetAllItemResponseDto } from "@/common/types/types";
import { FacultyCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: FacultiesGetAllItemResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.facultiesCardsListWrapper">
    <ul :class="styles.facultiesCardsList">
      <li
        v-for="{ id, name, shortName } in cards"
        :key="id"
        :class="styles.facultiesCardsListItem"
      >
        <FacultyCard :name="name" :shortName="shortName" :id="id" />
      </li>
    </ul>
  </div>
</template>
