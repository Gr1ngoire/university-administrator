<script lang="ts" setup>
import type { UsersGetAllItemResponseDto } from "@/common/types/types";
import { UserCard } from "./components/components";
import styles from "./styles.module.scss";

type Props = {
  cards: UsersGetAllItemResponseDto[];
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
          role,
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
          :role="role"
          :phone="phone"
          :email="email"
          :password="password"
        />
      </li>
    </ul>
  </div>
</template>
