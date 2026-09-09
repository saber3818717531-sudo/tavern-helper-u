export const Schema = z.object({
  世界: z
    .object({
      当前时间: z.string().prefault('2026/09/12 09:30'),
      当前场合: z
        .enum([
          '大学校园',
          '写字楼职场',
          '地铁公交',
          '医院',
          '居民小区邻里',
          '商场餐饮咖啡',
          '健身房',
          '夜店酒吧KTV',
          '政务银行大厅',
          '警局',
          '家庭亲戚',
          '酒店旅馆',
          '会展中心',
          '移动中',
        ])
        .prefault('家庭亲戚'),
      在场人物: z.array(z.string()).prefault([]),
    })
    .prefault({}),
  人物: z
    .record(
      z.string().describe('NPC 姓名'),
      z.object({
        身份: z.string().prefault('待更新'),
        身高: z.string().prefault('未记录'),
        体重: z.string().prefault('未记录'),
        三围: z
          .object({
            胸围: z.string().prefault('未记录'),
            罩杯: z.string().prefault('未记录'),
            腰围: z.string().prefault('未记录'),
            臀围: z.string().prefault('未记录'),
          })
          .prefault({}),
        内心: z.string().prefault('尚无想法'),
        接受度: z.coerce
          .number()
          .transform(value => _.clamp(value, 0, 100))
          .prefault(0),
        夺取进度: z.enum(['未接触', '日常', '暧昧', '得手', '稳固']).prefault('未接触'),
        NSFW: z.enum(['无', '已发生', '常态']).prefault('无'),
      })
      .prefault({}),
    )
    .prefault({}),
  夺取记录: z.record(z.string(), z.string()).prefault({}),
})

export type SchemaType = z.infer<typeof Schema>