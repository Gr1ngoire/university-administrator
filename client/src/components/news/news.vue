<script lang="ts" setup>
import { computed, ref, useStore } from "@/hooks/hooks";
import { NewsActions } from "@/store/actions";
import { Button } from "@/common/components/components";
import { CreateNewsForm, NewsCardsList } from "./components/components";
import styles from "./styles.module.scss";
import { isAdmin } from "@/common/helpers/helpers";

const store = useStore();
const news = computed(() => store.state.news.news);

const newsCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  newsCreationFormShowState.value = !newsCreationFormShowState.value;
};

store.dispatch(NewsActions.GET_ALL_NEWS);
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <NewsCardsList :cards="news" />
    <div v-if="isAdmin()" :class="styles.createNewsForm">
      <CreateNewsForm
        v-if="newsCreationFormShowState"
        :onToggle="handleToggle"
      />
      <div :class="styles.toggleNewsFormButtonWrapper">
        <Button
          v-if="!newsCreationFormShowState"
          type="click"
          name="Add news"
          action="add"
          :onClick="handleToggle"
        />
      </div>
    </div>
  </div>
</template>
