-- 리뉴얼 P3: 문의 폼 저장 테이블 (스펙 §4.5). CLI 미로그인으로 자동 적용 못 함 → Dashboard SQL Editor 또는 `supabase db query --linked -f` 로 적용
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('project','lecture')),
  org text, name text not null, contact text not null,
  body text not null, meta jsonb default '{}',
  created_at timestamptz default now()
);
alter table inquiries enable row level security;   -- service role 만 쓰므로 정책 없음 = anon 차단
