<script setup lang="ts">
import { Button, Image } from "@/common/components/components";
import type { ToggleState } from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { NewsActions } from "@/store/actions
import { UpdateNewsForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  title: string;
  content: string;
  imgUrl: string | null;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(NewsActions.DELETE_NEWS, props.id);
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
    :initialNews="{ id, title, content, imgUrl }"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!newsUpdateFormShowState.state" :class="styles.newsCard">
    <div :class="styles.newsImageWrapper">
      <Image v-if="imgUrl" :imgPath="imgUrl" />
    </div>
    <p :class="styles.newsTitle">{{ props.title }}</p>
    <p :class="styles.newsContent">{{ props.content }}</p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" :onClick="handleEditToggle" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
