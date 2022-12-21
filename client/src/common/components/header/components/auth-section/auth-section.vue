<script lang="ts" setup>
import { Button } from "@/common/components/components";
import { computed, useStore } from "@/hooks/hooks";
import { AppRoutes } from "@/common/enums/enums";
import type { UserWithGrantDto } from "shared/common/types/types";

import styles from "./styles.module.scss";
import { AuthActions } from "@/store/actions";
import { useRouter } from "@/hooks/hooks";

type Props = {
  onClick: () => void;
};

defineProps<Props>();

const router = useRouter();
const store = useStore();

const user = computed<UserWithGrantDto | null>(
  () => store.state.auth.currentUser
);

const logout = () => {
  store.dispatch(AuthActions.LOG_OUT);
  router.replace(AppRoutes.SIGN_UP);
};
</script>

<template>
  <div :class="styles.authSectionWrapper">
    <div v-if="user">
      <p>{{ (user.surname, user.name, user.secondName) }}</p>
      <Button :onClick="logout">Log out</Button>
    </div>
    <RouterLink
      v-else
      :class="styles.signInWrapper"
      :to="AppRoutes.SIGN_UP"
      @click="onClick"
    >
      <p :class="styles.signUpParagraph">Sign In/Up</p>
    </RouterLink>
  </div>
</template>
