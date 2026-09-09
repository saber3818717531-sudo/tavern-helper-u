import { z } from 'zod';
import _ from 'lodash';

(globalThis as any).z = z;
(globalThis as any)._ = _;

const { Schema } = await import('./src/pingran/schema.ts');

const input = {
  世界: { 当前时间: '2026/05/23 10:15', 当前场合: '居民小区邻里', 在场人物: [] },
  人物: {
    周敏: {
      身份: '小区街角周记生煎店老板的女儿兼店员',
      年龄: 23,
      身高: '164cm',
      体重: '51kg',
      三围: { 胸围: '86', 罩杯: 'C', 腰围: '63', 臀围: '89' },
      外貌: '清秀干练，扎着马尾辫，鼻尖微翘',
      服饰: '浅蓝碎花围裙罩着短袖白T恤，水洗牛仔短裤',
      内心: '小陆今天起得挺早。',
      接受度: 20,
      夺取进度: '日常',
      NSFW: '无',
    },
  },
  夺取记录: {},
};

const out = Schema.parse(input as any);
console.log(JSON.stringify(out.人物.周敏, null, 2));
console.log('---');
console.log('外貌幸存:', '外貌' in out.人物.周敏, '| 值:', JSON.stringify(out.人物.周敏.外貌));
console.log('服饰幸存:', '服饰' in out.人物.周敏, '| 值:', JSON.stringify(out.人物.周敏.服饰));
console.log('幂等:', JSON.stringify(Schema.parse(out)) === JSON.stringify(out));