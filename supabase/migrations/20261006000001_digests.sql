-- 리뉴얼 P5: 다이제스트 리터칭 저장소 (Vercel FS 읽기 전용 → Supabase). 빌드 시 scripts/generate-digests.mjs 가 published 행을 data/digest/*.json 으로 내려받음
create table if not exists digests (
  week text primary key,                      -- '2026-W39'
  status text not null default 'draft' check (status in ('draft','published')),
  data jsonb not null,                        -- Digest (lib/content/digest.ts)
  published_at timestamptz,
  updated_at timestamptz default now()
);
alter table digests enable row level security;
