<script lang="ts" setup>
import { AppRoutes } from "@/common/enums/enums";
import { SignInForm } from "./components/components";

import styles from "./styles.module.scss";
</script>

<template>
  <div :class="styles.formWrapper">
    <SignInForm />
    <p>
      Do not you have an account?
      <RouterLink :to="AppRoutes.SIGN_UP">Sign up</RouterLink>
    </p>
  </div>
</template>
