<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { AppRoutes } from "@/common/enums/enums";
import { SignInForm } from "./components/components";

import styles from "./styles.module.scss";
</script>

<template>
  <div :class="styles.formWrapper">
    <div :class="styles.formSectionWrapper">
      <SignInForm />
      <p :class="styles.signInToSignUpSwitchParagraph">
        Do not you have an account?
        <RouterLink :to="AppRoutes.SIGN_UP"
          ><span :class="styles.switchLink">Sign up</span></RouterLink
        >
      </p>
    </div>
  </div>
</template>
