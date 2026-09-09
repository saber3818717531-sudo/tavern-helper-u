<template>
  <div class="card">
    <HeaderBar :expanded="expanded" @toggle="expanded = !expanded" />

    <transition name="unfold">
      <div v-show="expanded" class="content-area">
        <div class="tab-row">
          <button class="tab-btn" :class="{ active: active_tab === '人物' }" @click="active_tab = '人物'">人物</button>
          <button class="tab-btn" :class="{ active: active_tab === '记录' }" @click="active_tab = '记录'">夺取记录</button>
        </div>
        <PeoplePanel v-if="active_tab === '人物'" />
        <RecordPanel v-else />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue';
import PeoplePanel from './components/PeoplePanel.vue';
import RecordPanel from './components/RecordPanel.vue';

const expanded = ref(false);
const active_tab = useLocalStorage<string>('pingran:status-tab', '人物');
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  background-color: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(61, 61, 61, 0.08);
  font-size: 13px;
  line-height: 1.5;
}

.content-area {
  padding: 10px 12px 14px;
}

.tab-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.tab-btn {
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-muted);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    background: var(--c-primary);
    border-color: var(--c-primary);
    color: #fff;
  }
}

.unfold-enter-active,
.unfold-leave-active {
  transition: all 0.25s ease;
}

.unfold-enter-from,
.unfold-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>