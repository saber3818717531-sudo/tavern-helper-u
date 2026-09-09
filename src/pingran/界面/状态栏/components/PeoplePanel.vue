<template>
  <div class="people-panel">
    <section class="group">
      <div class="group-title">在场</div>
      <div class="card-list">
        <PersonCard v-for="item in present_list" :key="item.name" :name="item.name" :info="item.info" />
        <div v-if="present_list.length === 0" class="empty">此刻身边没有别人</div>
      </div>
    </section>

    <section v-if="away_list.length > 0" class="group">
      <div class="group-title">曾见过</div>
      <div class="card-list">
        <PersonCard v-for="item in away_list" :key="item.name" :name="item.name" :info="item.info" :away="true" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';
import PersonCard from './PersonCard.vue';

const store = useDataStore();

const present_names = computed(() =>
  store.data.世界.在场人物.map(item => item.split('（')[0]?.trim() ?? item),
);

const present_list = computed(() =>
  _.toPairs(store.data.人物)
    .filter(([name]) => present_names.value.includes(name))
    .map(([name, info]) => ({ name, info })),
);

const away_list = computed(() =>
  _.toPairs(store.data.人物)
    .filter(([name]) => !present_names.value.includes(name))
    .map(([name, info]) => ({ name, info })),
);
</script>

<style lang="scss" scoped>
.people-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-muted);
  margin-bottom: 6px;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty {
  border: 1px dashed var(--c-border);
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  color: var(--c-text-muted);
  font-size: 12px;
  background: var(--c-surface);
}
</style>