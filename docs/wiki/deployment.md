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

```bash
# 1. 로컬 빌드 (nvm 재귀 우회를 위해 env -i 사용)
env -i HOME=/Users/codemon PATH="/Users/codemon/.nvm/versions/node/v22.14.0/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin" /bin/bash -c 'npm run build'

# 2. Vercel 프리빌트
env -i HOME=/Users/codemon PATH="/Users/codemon/.nvm/versions/node/v22.14.0/bin:/Users/codemon/Library/pnpm:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin" /bin/bash -c 'vercel build --prod'

# 3. Vercel 배포
env -i HOME=/Users/codemon PATH="/Users/codemon/.nvm/versions/node/v22.14.0/bin:/Users/codemon/Library/pnpm:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin" /bin/bash -c 'vercel deploy --prebuilt --prod'

# 4. 검증 (verify-deploy 스킬)
playwright-cli open https://codemon.ai/<path>
playwright-cli screenshot --filename=verify.png
playwright-cli close
```

관련 스킬: `publish-private-content`, `verify-deploy`

## 체크리스트

### 배포 전
- [ ] `npm run build` 성공 확인
- [ ] 로컬에서 모든 페이지 테스트
- [ ] 이미지/에셋 경로 확인

### 배포 후
- [ ] 프로덕션 URL 접속 확인
- [ ] SSL 인증서 확인
- [ ] 모바일 반응형 확인
- [ ] 다크모드 확인
