#!/usr/bin/env bash
# 라우트 생존 점검 — pages/ 에 있는 모든 페이지가 실제 프로덕션에서 살아있는지 확인.
#
# 왜: 배포는 로컬 프리빌트(vercel deploy --prebuilt --prod) 방식이라,
#     오래된 브랜치에서 배포하면 다른 브랜치의 화면이 통째로 사라진다.
#     배포 직후 이 스크립트를 돌려 "사라진 화면"을 즉시 잡는다.
#
# 사용:
#   ./scripts/check-routes.sh                      # 프로덕션 점검
#   BASE=https://<preview>.vercel.app ./scripts/check-routes.sh
#   ./scripts/check-routes.sh --all                # /p/ 비공개 페이지 + 정적 HTML 까지
#
# 종료 코드: 200/3xx 이외 응답이 하나라도 있으면 1

set -uo pipefail
cd "$(dirname "$0")/.."

BASE="${BASE:-https://codemon.ai}"
ALL=0
[ "${1:-}" = "--all" ] && ALL=1

list_public_routes() {
  find pages -name '*.mdx' -o -name '*.tsx' \
    | grep -v '^pages/api/' \
    | grep -v '_app\|_error\|_meta\|\[' \
    | sed 's|^pages||; s|\.mdx$||; s|\.tsx$||; s|/index$||' \
    | sed 's|^$|/|' \
    | grep -v '^/p/\|^/en/p/' \
    | sort
}

list_private_routes() {
  find pages/p pages/en/p -name '*.mdx' 2>/dev/null \
    | sed 's|^pages||; s|\.mdx$||; s|/index$||' | sort
}

list_assets() {
  find public -name '*.html' -o -name '*.pdf' | sed 's|^public||' | sort
}

{
  list_public_routes
  if [ "$ALL" = "1" ]; then list_private_routes; list_assets; fi
} > /tmp/check-routes-list.txt

fail=0
total=0
while read -r r; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --retry 2 --retry-delay 1 -m 25 "$BASE$r" </dev/null)
  total=$((total + 1))
  case "$code" in
    200|301|302|307|308) ;;
    *) echo "FAIL $code $r"; fail=$((fail + 1)) ;;
  esac
done < /tmp/check-routes-list.txt

echo "checked=$total base=$BASE fail=$fail"
[ "$fail" -eq 0 ] || exit 1
