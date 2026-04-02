export const demoConfig = {
  company: {
    name: '보들',
    nameEn: 'BO:DL',
    fullName: '보들코스메틱',
    industry: 'K-뷰티',
    slogan: 'Essential Softness — 보들보들한 피부를 위한 부드러움',
    employeeCount: 17,
    founded: '2024',
  },
  channels: ['쿠팡', '자사몰', '올리브영'] as const,
  teams: ['마케팅팀', '디자인팀', '콘텐츠팀', 'MD팀', '미국팀', '물류팀', '회계팀'] as const,
  sns: {
    instagram: '@bodl_official',
    tiktok: '@bodl_kr',
  },
}

export type DemoConfig = typeof demoConfig
