<template>
  <div class="record-panel">
    <div class="timeline">
      <div v-for="(summary, name) in store.data.夺取记录" :key="name" class="record-item">
        <span class="dot"></span>
        <div class="record-body">
          <div class="record-name">{{ name }}</div>
          <div class="record-text">{{ summary }}</div>
        </div>
      </div>
    </div>
    <div v-if="_.isEmpty(store.data.夺取记录)" class="empty">还没有故事落进这里</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  flex-direction: column;
}

.record-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 3.5px;
    top: 22px;
    bottom: -8px;
    width: 1px;
    background: var(--c-border);
  }

  &:last-child::before {
    display: none;
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-accent);
  margin-top: 5px;
  flex-shrink: 0;
  box-shadow: 0 0 5px rgba(255, 138, 122, 0.5);
}

.record-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 2px;
}

.record-text {
  font-size: 12px;
  color: var(--c-text-muted);
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