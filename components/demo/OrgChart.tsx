'use client'

const org = {
  ceo: { name: '김보들', title: '대표이사', emoji: '👔' },
  teams: [
    {
      name: '마케팅팀', emoji: '📣', head: '박서연 팀장', members: 3,
      roles: ['퍼포먼스 마케팅', '인플루언서 시딩', 'SNS 콘텐츠 기획'],
      painPoint: '인플루언서 시딩에 업무 80% 소모',
      demo: '/partner/lecture-podl-ai/demo/seeding',
    },
    {
      name: '콘텐츠팀', emoji: '🎬', head: '이하은 팀장', members: 2,
      roles: ['영상 편집', '상세페이지 제작', 'SNS 크리에이티브'],
      painPoint: '콘텐츠 제작에 시간 과다 소모',
      demo: '/partner/lecture-podl-ai/demo/content',
    },
    {
      name: '디자인팀', emoji: '🎨', head: '최민지 팀장', members: 2,
      roles: ['패키지 디자인', '브랜드 아이덴티티', '촬영 디렉팅'],
      painPoint: '디자인 기획/수정 반복',
      demo: '/partner/lecture-podl-ai/demo/label',
    },
    {
      name: 'MD팀', emoji: '🏪', head: '정우진 팀장', members: 2,
      roles: ['쿠팡/올리브영 입점 관리', '가격 전략', '재고 관리'],
      painPoint: '멀티채널 데이터 취합 수작업',
      demo: '/partner/lecture-podl-ai/demo/report',
    },
    {
      name: '미국팀', emoji: '🌏', head: 'Sarah Kim 팀장', members: 2,
      roles: ['아마존 US 운영', '중동 시장 진출', '글로벌 마케팅'],
      painPoint: '번역 외주, 문화권 뉘앙스 손실',
      demo: '/partner/lecture-podl-ai/demo/localize',
    },
    {
      name: '물류팀', emoji: '📦', head: '강태호 팀장', members: 2,
      roles: ['입출고 관리', '배송 파트너 관리', '반품 처리'],
    },
    {
      name: '회계팀', emoji: '💰', head: '윤서아 팀장', members: 2,
      roles: ['매출/매입 관리', '채널별 수수료 정산', '월 결산'],
      demo: '/partner/lecture-podl-ai/demo/report',
    },
  ],
}

export function OrgChart() {
  return (
    <div className="mt-6">
      {/* CEO */}
      <div className="flex justify-center mb-6">
        <div className="text-center px-6 py-4 rounded-xl border-2 border-purple-500/30 bg-purple-500/5">
          <div className="text-2xl mb-1">{org.ceo.emoji}</div>
          <div className="font-bold dark:text-white">{org.ceo.name}</div>
          <div className="text-xs text-purple-500">{org.ceo.title}</div>
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center mb-4">
        <div className="w-px h-6 bg-purple-500/30" />
      </div>

      {/* Teams grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {org.teams.map(team => (
          <div
            key={team.name}
            className={`rounded-lg border p-4 transition-all ${
              team.demo
                ? 'border-purple-500/20 bg-purple-500/[0.02] hover:border-purple-500/40 hover:bg-purple-500/[0.05]'
                : 'border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01]'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{team.emoji}</span>
              <div>
                <div className="font-semibold text-sm dark:text-white">{team.name}</div>
                <div className="text-xs text-gray-500">{team.head} · {team.members}명</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {team.roles.map(role => (
                <span key={role} className="text-[10px] px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                  {role}
                </span>
              ))}
            </div>
            {team.painPoint && (
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                ⚠️ {team.painPoint}
              </div>
            )}
            {team.demo && (
              <a href={team.demo} className="inline-block mt-2 text-xs text-purple-500 hover:text-purple-400 transition-colors">
                → 데모 보기
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 text-center text-xs text-gray-400">
        총 {org.teams.reduce((s, t) => s + t.members, 0) + 1}명 · {org.teams.length}개 팀 · 설립 {2024}년
      </div>
    </div>
  )
}
