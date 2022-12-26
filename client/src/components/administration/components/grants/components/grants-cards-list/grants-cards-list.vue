<script lang="ts" setup>
import type { GrantsGetAllItemAdminResponseDto } from "@/common/types/types";
import { computed, useStore } from "@/hooks/hooks";
import { GrantCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: GrantsGetAllItemAdminResponseDto[];
};

const store = useStore();
const currentUser = computed(() => store.state.auth.currentUser);

defineProps<Props>();
</script>

<template>
  <div :class="styles.grantsCardsListWrapper">
    <ul :class="styles.grantsCardsList">
      <li
        v-for="card in cards"
        :key="card.id"
        :class="styles.grantsCardsListItem"
      >
        <GrantCard
          :id="card.id"
          :fullName="
            currentUser?.id === card.userId
              ? 'You'
              : `${card.user.surname} ${card.user.name} ${card.user.secondName}`
          "
          :grantRecord="card"
        />
      </li>
    </ul>
  </div>
</template>
