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
        v-for="{
          id,
          name,
          surname,
          secondName,
          phone,
          email,
          password,
        } in cards"
        :key="id"
        :class="styles.usersCardsListItem"
      >
        <UserCard
          :id="id"
          :name="name"
          :surname="surname"
          :secondName="secondName"
          :phone="phone"
          :email="email"
          :password="password"
        />
      </li>
    </ul>
  </div>
</template>
