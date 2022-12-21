<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { AppRoutes } from "@/common/enums/enums";
import { SignUpForm } from "./components/components";

import styles from "./styles.module.scss";
</script>

<template>
  <div :class="styles.formWrapper">
    <div :class="styles.formSectionWrapper">
      <SignUpForm />
      <p :class="styles.signUpToSignUnSwitchParagraph">
        Do you already have an account?
        <RouterLink :to="AppRoutes.SIGN_IN"
          ><span :class="styles.switchLink">Sign in</span></RouterLink
        >
      </p>
    </div>
  </div>
</template>
