const list = { theme: { layout: 'raw', breadcrumb: false, sidebar: false, toc: false, pagination: false } }
export default {
  index: { title: '인사이트', ...list },
  'agents-build': { title: '에이전트 직접 만들기', ...list },
  'agents-ops': { title: 'AI 코딩 에이전트 운용', ...list },
  models: { title: '모델 전쟁', ...list },
  infra: { title: '인프라·빌드로그', ...list },
  retrospective: { title: '엔지니어링 회고', ...list },
}
