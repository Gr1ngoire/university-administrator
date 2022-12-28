<script lang="ts" setup>
import { computed, ref, useStore } from "@/hooks/hooks";
import { NewsActions } from "@/store/actions";
import { Button, Input } from "@/common/components/components";
import { CreateNewsForm, NewsCardsList } from "./components/components";
import styles from "./styles.module.scss";
import { isAdmin } from "@/common/helpers/helpers";

const store = useStore();
const news = computed(() => store.state.news.news);
store.dispatch(NewsActions.GET_ALL_NEWS);

const newsCreationFormShowState = ref<boolean>(false);
const handleToggle: () => void = (): void => {
  newsCreationFormShowState.value = !newsCreationFormShowState.value;
};

const handleNewsSearch: (event: Event) => void = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  store.dispatch(NewsActions.GET_ALL_NEWS, input.value);
};
</script>

<template>
  <div :class="styles.dashboardWrapper">
    <div :class="styles.newsSearchWrapper">
      <Input
        name="title"
        nameToDisplay=""
        type="text"
        placeholder="Find the news"
        :onInput="handleNewsSearch"
      />
    </div>
    <div :class="styles.dashboard">
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
  </div>
</template>
