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
        v-for="card in cards"
        :key="card.id"
        :class="styles.groupsCardsListItem"
      >
        <GroupCard :group="card" />
      </li>
    </ul>
  </div>
</template>
