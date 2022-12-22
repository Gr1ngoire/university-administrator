<script lang="ts" setup>
import { Button } from "@/common/components/components";
import { computed, useStore } from "@/hooks/hooks";
import { AppRoutes } from "@/common/enums/enums";

import styles from "./styles.module.scss";
import { AuthActions } from "@/store/actions";
import { useRouter } from "@/hooks/hooks";

type Props = {
  onClick: () => void;
};

defineProps<Props>();

const router = useRouter();
const store = useStore();

const user = computed(() => store.state.auth.currentUser);

const logout = () => {
  store.dispatch(AuthActions.LOG_OUT);
  router.replace(AppRoutes.SIGN_UP);
};
</script>

<template>
  <div :class="styles.authSectionWrapper">
    <div v-if="user" :class="styles.userSection">
      <label>{{ `${user.surname} ${user.name} ${user.secondName}` }}</label>
      <div :class="styles.logoutButtonWrapper">
        <Button :onClick="logout" action="logout" name="Log out" />
      </div>
    </div>
    <RouterLink
      v-else
      :class="styles.signInUpWrapper"
      :to="AppRoutes.SIGN_UP"
      @click="onClick"
    >
      <p :class="styles.signUpParagraph">Sign In/Up</p>
    </RouterLink>
  </div>
</template>
