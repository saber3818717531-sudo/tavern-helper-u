<template>
  <button class="header" @click="$emit('toggle')">
    <div class="left">
      <div class="time">
        <span class="date">{{ date_part }}</span>
        <span class="weekday">{{ weekday }}</span>
        <span class="clock">{{ time_part }}</span>
      </div>
      <div class="place-tag">{{ store.data.世界.当前场合 }}</div>
    </div>
    <div class="right">
      <span class="count">{{ store.data.世界.在场人物.length }} 人在场</span>
      <span class="chevron" :class="{ open: expanded }">▾</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

defineProps<{ expanded: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();

const date_part = computed(() => store.data.世界.当前时间.split(' ')[0] ?? '');
const time_part = computed(() => {
  const m = store.data.世界.当前时间.match(/(\d{2}:\d{2})/);
  return m ? m[1] : '';
});
const weekday = computed(() => {
  const parts = date_part.value.split('/');
  if (parts.length !== 3) return '';
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (Number.isNaN(d.getTime())) return '';
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()] ?? '';
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--c-surface);
  border: none;
  border-bottom: 1px solid var(--c-border);
  cursor: pointer;
  font-family: inherit;
  text-align: left;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.time {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--c-text);
}

.weekday {
  font-size: 12px;
  color: var(--c-text-muted);
}

.place-tag {
  display: inline-block;
  width: fit-content;
  background: var(--c-primary-soft);
  color: var(--c-primary);
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 500;
}

.right {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--c-text-muted);
  font-size: 12px;
}

.chevron {
  transition: transform 0.25s ease;

  &.open {
    transform: rotate(180deg);
  }
}
</style>