-- 교육용 예제. 전용 실습 프로젝트의 SQL Editor에서 한 번 실행합니다.
-- 같은 이름의 테이블이 이미 있으면 CREATE TABLE이 실패하며 트랜잭션이 롤백됩니다.
-- 기존 테이블을 삭제하거나 덮어쓰지 않습니다.
begin;

create table public.webinar_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  summary text not null check (char_length(summary) <= 500),
  category text not null check (category in ('기획', '리서치', '자동화')),
  published boolean not null default false
);

alter table public.webinar_projects enable row level security;
revoke all on table public.webinar_projects from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on table public.webinar_projects to anon, authenticated;

create policy "Visitors read published webinar projects"
on public.webinar_projects for select to anon, authenticated
using (published = true);

insert into public.webinar_projects (id, title, summary, category, published) values
('11111111-1111-4111-8111-111111111111', '행사 안내 페이지', '교육용 예시: 흩어진 행사 정보를 한 페이지로 구성했습니다.', '기획', true),
('22222222-2222-4222-8222-222222222222', '공개 자료 큐레이션', '교육용 예시: 자료를 주제별로 탐색할 수 있게 정리했습니다.', '리서치', true),
('33333333-3333-4333-8333-333333333333', '포트폴리오 검수 스킬', '교육용 예시: 반복 점검 절차를 재사용할 수 있게 만들었습니다.', '자동화', true),
('44444444-4444-4444-8444-444444444444', '비공개 QA 예시', '접근 검사 전용 가상 행. 방문자 응답에는 없어야 합니다.', '기획', false);

commit;

-- SQL Editor의 관리자 조회와 방문자 API 요청은 다릅니다.
-- 공개 publishable key로 demo-supabase/verify-access.html을 실행해 확인하세요.
