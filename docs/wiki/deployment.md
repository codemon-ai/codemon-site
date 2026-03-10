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

## 자동 배포

- `main` 브랜치에 푸시하면 자동 배포
- PR 생성 시 Preview 환경 자동 생성

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
