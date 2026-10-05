#!/usr/bin/env bash
# 주간 다이제스트 inbox 수집 — 로디(research-saas)에서 export 받아 data/digest/inbox/YYYY-WW.json 커밋
#   ./scripts/digest-pull.sh [YYYY-WW] [--since YYYY-MM-DD]
# 전제: ssh 별칭 `rody`, research-saas PR(feat/export-cli) 머지·배포. 수동 실행부터; launchd는 4회 안정 후.
set -euo pipefail
cd "$(dirname "$0")/.."
WEEK="${1:-$(date -u +%G-W%V)}"
SINCE="${3:-$(date -u -v-7d +%Y-%m-%d 2>/dev/null || date -u -d '7 days ago' +%Y-%m-%d)}"
[ "${2:-}" = "--since" ] && SINCE="$3"
OUT="data/digest/inbox/$WEEK.json"
echo "→ rody: engine export --since $SINCE → $OUT"
ssh rody "sudo -u research -H /bin/zsh -lc 'cd ~/research-saas/engine && .venv/bin/engine export --since $SINCE --json -'" > "$OUT.tmp"
node -e "const a=require('./$OUT.tmp');if(!Array.isArray(a))throw new Error('not array');console.log('items:',a.length)"
mv "$OUT.tmp" "$OUT"
git checkout -B "digest/$WEEK"
git add "$OUT" && git commit -q -m "digest(inbox): $WEEK ($(node -e "console.log(require('./$OUT').length)")건, since $SINCE)" && echo "커밋됨 — push 후 /admin/digest 에서 리터칭"
