<script lang="ts" setup>
import { AppRoutes } from "@/common/enums/enums";
import { SignUpForm } from "./components/components";

import styles from "./styles.module.scss";
</script>

<template>
  <div :class="styles.formWrapper">
    <SignUpForm />
    <p>
      Do you already have an account?
      <RouterLink :to="AppRoutes.SIGN_IN">Sign in</RouterLink>
    </p>
  </div>
</template>
