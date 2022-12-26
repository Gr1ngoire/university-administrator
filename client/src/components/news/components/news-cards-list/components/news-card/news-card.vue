<script setup lang="ts">
import type {
  NewsGetAllItemResponseDto,
  ToggleState,
} from "@/common/types/types";
import { Button, Image } from "@/common/components/components";
import { isAdmin } from "@/common/helpers/helpers";
import { reactive, useStore } from "@/hooks/hooks";
import { NewsActions } from "@/store/actions";
import { UpdateNewsForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  news: NewsGetAllItemResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(NewsActions.DELETE_NEWS, props.news.id);
};

const initialFormShowState: ToggleState = { state: false };
const newsUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  newsUpdateFormShowState.state = !newsUpdateFormShowState.state;
};
</script>

<template>
  <UpdateNewsForm
    v-if="newsUpdateFormShowState.state"
    :initialNews="news"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!newsUpdateFormShowState.state" :class="styles.newsCard">
    <div :class="styles.newsImageWrapper">
      <Image v-if="news.imgUrl" :imgPath="news.imgUrl" />
    </div>
    <p :class="styles.newsTitle">{{ news.title }}</p>
    <p :class="styles.newsContent">{{ news.content }}</p>
    <div v-if="isAdmin()" :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" :onClick="handleEditToggle" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
