<template>
  <div class="person-card" :class="{ away }">
    <div class="head">
      <span class="name">{{ name }}</span>
      <span class="lamp" :class="lamp_class"></span>
      <span class="lamp-label">{{ info.NSFW }}</span>
    </div>
    <div class="identity">{{ info.身份 }}</div>
    <div class="meter">
      <div class="meter-fill" :style="{ width: info.接受度 + '%' }"></div>
    </div>
    <div class="meta">
      <span class="accept">{{ info.接受度 }}</span>
      <span class="accept-label">{{ accept_label }}</span>
      <span class="stamp" :class="stamp_class">{{ info.夺取进度 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SchemaType } from '../../schema';

type PersonInfo = SchemaType['人物'][string];

const props = defineProps<{ name: string; info: PersonInfo; away?: boolean }>();

const accept_label = computed(() => {
  const v = props.info.接受度;
  if (v >= 80) return '形影不离';
  if (v >= 60) return '沉溺依从';
  if (v >= 40) return '亲近暧昧';
  if (v >= 20) return '熟络自在';
  return '陌生礼貌';
});

const stamp_class = computed(() => 'stamp-' + props.info.夺取进度);
const lamp_class = computed(() => 'lamp-' + props.info.NSFW);
</script>

<style lang="scss" scoped>
.person-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 10px 12px;
  animation: card-in 0.3s ease;
}

.person-card.away {
  opacity: 0.65;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.name {
  font-weight: 600;
  font-size: 14px;
}

.lamp {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-grey);
}

.lamp-已发生 {
  background: var(--c-accent);
  box-shadow: 0 0 6px var(--c-accent);
}

.lamp-常态 {
  background: var(--c-accent-deep);
  box-shadow: 0 0 6px var(--c-accent-deep);
}

.lamp-label {
  font-size: 11px;
  color: var(--c-text-muted);
}

.identity {
  font-size: 12px;
  color: var(--c-text-muted);
  margin-bottom: 8px;
}

.meter {
  height: 6px;
  background: var(--c-primary-soft);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-warm), var(--c-accent));
  border-radius: 3px;
  transition: width 0.4s ease;
}

.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.accept {
  font-weight: 600;
  color: var(--c-accent-deep);
}

.accept-label {
  color: var(--c-text-muted);
  flex: 1;
}

.stamp {
  border-radius: 999px;
  padding: 1px 10px;
  font-size: 11px;
  border: 1px solid transparent;
}

.stamp-未接触 {
  color: var(--c-text-muted);
  border-color: var(--c-grey);
}

.stamp-日常 {
  color: var(--c-primary);
  border-color: var(--c-primary);
}

.stamp-暧昧 {
  color: var(--c-warm);
  border-color: var(--c-warm);
}

.stamp-得手 {
  color: #fff;
  background: var(--c-accent);
  border-color: var(--c-accent);
}

.stamp-稳固 {
  color: #fff;
  background: var(--c-steady);
  border-color: var(--c-steady);
}
</style>