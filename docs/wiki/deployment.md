# 배포 가이드

## Vercel 배포

### 1. GitHub 저장소 생성

```bash
# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/codemon-ai/codemon-site.git
git branch -M main
git push -u origin main
```

### 2. Vercel 연결

1. [Vercel](https://vercel.com) 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 선택 (`codemon-site`)
4. 설정 확인:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. "Deploy" 클릭

### 3. 도메인 연결

1. Vercel Dashboard → Project → Settings → Domains
2. `codemon.ai` 추가
3. DNS 설정:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

### 4. 환경 변수 (필요시)

현재 환경 변수 필요 없음. 추후 필요시:
- Vercel Dashboard → Settings → Environment Variables

## 로컬 빌드 테스트

```bash
# 빌드
npm run build

# 프로덕션 모드 실행
npm run start
```

## 배포 방식 (Vercel CLI 프리빌트 전용)

> **GitHub auto-deploy 비활성화 상태.** git push만으로는 배포되지 않음.

> ⚠️ **툴체인 변경 (2026-07-21 확인).** `~/.nvm`은 더 이상 없다. node v22.23.0이 `~/.local/bin`
> (hermes/fnm)에 있고, `vercel`도 같은 경로다. 예전 `~/.nvm/...` PATH는 `npm: command not found`로 실패.

```bash
CLEAN='env -i HOME=/Users/codemon PATH=/Users/codemon/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin'

# 0. ⚠️ 어느 트리에서 배포하는지 확인 (워크트리가 여러 개다 — 화면 유실 1순위 원인)
pwd && git rev-parse --abbrev-ref HEAD && git status --short && git log --oneline -1

# 1. 로컬 빌드
$CLEAN /bin/bash -c 'npm run build'

# 2. Vercel 프리빌트
$CLEAN /bin/bash -c 'vercel build --prod'

# 3. Vercel 배포
$CLEAN /bin/bash -c 'vercel deploy --prebuilt --prod'

# 4. 검증 — 라우트 생존 확인 (필수)
./scripts/check-routes.sh

# 5. 눈으로 확인 (verify-deploy 스킬)
playwright-cli open https://codemon.ai/<path>
playwright-cli screenshot --filename=verify.png
playwright-cli close
```

관련 스킬: `publish-private-content`, `verify-deploy`

## 체크리스트

### 배포 전
- [ ] `git fetch origin && git rebase origin/main` — 뒤처진 트리에서 배포하면 다른 화면이 사라진다
- [ ] `pwd` + 브랜치 + `git status`로 배포할 트리 확인
- [ ] `npm run build` 성공 확인
- [ ] 이미지/에셋 경로 확인 (`public/partner/`는 라우트에 가려 404 — `/slides/` 사용)

### 배포 후
- [ ] **`./scripts/check-routes.sh` → fail=0** (필수)
- [ ] 프로덕션 URL 접속 확인
- [ ] 모바일 반응형 / 다크모드 확인
- [ ] `docs/wiki/route-inventory.md` 개수·날짜 갱신 (페이지 추가/삭제 시)
