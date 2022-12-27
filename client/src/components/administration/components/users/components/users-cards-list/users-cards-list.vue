<script lang="ts" setup>
import type { UsersGetAllItemAdminResponseDto } from "@/common/types/types";
import { UserCard } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  cards: UsersGetAllItemAdminResponseDto[];
};

defineProps<Props>();
</script>

<template>
  <div :class="styles.usersCardsListWrapper">
    <ul :class="styles.usersCardsList">
      <li
        v-for="card in cards"
        :key="card.id"
        :class="styles.usersCardsListItem"
      >
        <UserCard :user="card" />
      </li>
    </ul>
  </div>
</template>
