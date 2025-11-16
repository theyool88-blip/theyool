# Git 워크플로우 가이드

**법무법인 더율 웹사이트 프로젝트**

마지막 업데이트: 2025-11-16

---

## 브랜치 전략

### 주요 브랜치

#### 1. `main` - 프로덕션 브랜치
- 공개된 최종 결과물
- 항상 배포 가능한 상태 유지
- 직접 커밋 금지, dev에서 병합만 허용
- 태그를 통한 버전 관리

#### 2. `dev` - 개발 브랜치
- 개발 중인 결과물 통합
- 모든 feature 브랜치의 base
- QA/테스트 완료 후 main으로 병합

#### 3. Feature 브랜치
- `dev`에서 분기
- 개별 기능/페이지 개발
- 완료 후 `dev`로 PR 생성

---

## 브랜치 명명 규칙

### Feature 브랜치
```
feature/[기능명]
```
**예시:**
- `feature/the-plan-page` - The Plan 페이지 개발
- `feature/contact-page` - 오시는길 페이지
- `feature/team-page` - 구성원소개 페이지
- `feature/services-alimony` - 위자료 서비스 페이지
- `feature/consultation-system` - 상담 신청 시스템

### Bugfix 브랜치
```
bugfix/[버그명]
```
**예시:**
- `bugfix/mobile-menu-overlap` - 모바일 메뉴 겹침 수정
- `bugfix/image-loading-error` - 이미지 로딩 오류 수정

### Hotfix 브랜치
```
hotfix/[긴급수정명]
```
- `main`에서 직접 분기 (긴급한 경우만)
- 수정 후 `main`과 `dev` 모두에 병합

### 기타 브랜치
```
refactor/[리팩토링명]   # 코드 개선
docs/[문서명]           # 문서 작업
chore/[작업명]          # 빌드, 설정 등
```

---

## 프로젝트 매니저 사용법

### `/pm` 커맨드

#### 1. 현재 상태 확인
```
/pm
```
또는
```
/pm status
```

출력 내용:
- 현재 브랜치
- 진행 중인 작업
- 다음 우선순위 작업
- Git 상태 요약

#### 2. 새 기능 시작
```
/pm [작업명]
```

**예시:**
```
/pm the-plan          # feature/the-plan-page 브랜치 생성
/pm contact           # feature/contact-page 브랜치 생성
/pm services-alimony  # feature/services-alimony 브랜치 생성
```

자동 실행:
1. `dev` 브랜치로 전환
2. 최신 코드 pull
3. `feature/[작업명]` 브랜치 생성
4. TodoWrite로 작업 계획 수립

#### 3. 브랜치 병합
```
/pm merge [브랜치명]
```

예시:
```
/pm merge feature/the-plan-page
```

자동 실행:
1. `dev`로 전환
2. 지정된 브랜치 병합
3. 충돌 확인 및 해결 가이드
4. 병합 후 브랜치 삭제 제안

#### 4. 배포 (dev → main)
```
/pm deploy
```

자동 실행:
1. `dev` 브랜치 테스트 상태 확인
2. `main`으로 전환
3. `dev` 병합
4. 버전 태그 생성 제안
5. `origin/main`으로 푸시

---

## 작업 플로우

### 1. 새 기능 개발 시작

```bash
# 방법 1: /pm 커맨드 사용 (권장)
/pm the-plan

# 방법 2: 수동
git checkout dev
git pull origin dev
git checkout -b feature/the-plan-page
```

### 2. 개발 진행

```bash
# 코드 작성
# 파일 수정...

# 상태 확인
git status

# 변경사항 스테이징
git add .

# 커밋
git commit -m "feat: Add The Plan page hero section"
```

### 3. 커밋 전 체크리스트

- [ ] TypeScript 에러 확인: `npm run build`
- [ ] ESLint 경고 확인: `npm run lint`
- [ ] 로컬 테스트: `npm run dev`
- [ ] 모바일 반응형 확인
- [ ] 관련 문서 업데이트 (CLAUDE.md 등)

### 4. 원격 저장소에 푸시

```bash
# 첫 푸시
git push -u origin feature/the-plan-page

# 이후 푸시
git push
```

### 5. Pull Request 생성

```bash
# GitHub CLI 사용
gh pr create --base dev --title "feat: Add The Plan page" --body "$(cat <<'EOF'
## Summary
- The Plan 페이지 구현
- 히어로 섹션 + 승소전략 소개
- 모바일 반응형 지원

## Test plan
- [ ] 데스크톱 레이아웃 확인
- [ ] 모바일 레이아웃 확인
- [ ] 스크롤 애니메이션 동작
- [ ] 빌드 성공

🤖 Generated with Claude Code
EOF
)"
```

### 6. 코드 리뷰 및 병합

1. PR 검토
2. 피드백 반영
3. Approve 받으면 `dev`로 병합
4. 로컬 브랜치 정리:
   ```bash
   git checkout dev
   git pull origin dev
   git branch -d feature/the-plan-page
   ```

### 7. 배포 (dev → main)

여러 기능이 `dev`에 통합되고 테스트 완료 후:

```bash
/pm deploy
```

또는 수동:
```bash
git checkout main
git merge dev
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin main --tags
```

---

## 커밋 메시지 컨벤션

### 형식
```
<type>: <subject>

<body> (선택)

<footer> (선택)
```

### Type 종류

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 | `feat: Add The Plan page` |
| `fix` | 버그 수정 | `fix: Resolve mobile menu overlap` |
| `docs` | 문서 수정 | `docs: Update README with API info` |
| `style` | 코드 포맷팅 | `style: Format consultation form` |
| `refactor` | 리팩토링 | `refactor: Improve Supabase client` |
| `test` | 테스트 추가/수정 | `test: Add cases API tests` |
| `chore` | 빌드/설정 | `chore: Update dependencies` |

### 예시

```bash
# 좋은 예
git commit -m "feat: Add contact page with Kakao Map integration"
git commit -m "fix: Resolve Instagram image loading on mobile"
git commit -m "docs: Update CLAUDE.md with completed features"

# 나쁜 예
git commit -m "update"
git commit -m "fix bug"
git commit -m "wip"
```

---

## 우선순위 프로젝트

### Phase 1 (즉시 필요)
| 순서 | 기능 | 브랜치명 | 상태 |
|------|------|----------|------|
| 1 | The Plan 페이지 | `feature/the-plan-page` | ⬜ 대기 |
| 2 | 오시는길 페이지 | `feature/contact-page` | ⬜ 대기 |
| 3 | 이용약관 페이지 | `feature/terms-page` | ⬜ 대기 |
| 4 | 인스타더율 페이지 | `feature/instagram-page` | ⬜ 대기 |

### Phase 2 (중요)
| 순서 | 기능 | 브랜치명 | 상태 |
|------|------|----------|------|
| 5 | 구성원소개 페이지 | `feature/team-page` | ⬜ 대기 |
| 6 | 위자료 서비스 | `feature/services-alimony` | ⬜ 대기 |
| 7 | 재산분할 서비스 | `feature/services-property` | ⬜ 대기 |
| 8 | 양육권 서비스 | `feature/services-custody` | ⬜ 대기 |
| 9 | 상간사건 서비스 | `feature/services-adultery` | ⬜ 대기 |

### Phase 3 (추가 기능)
| 순서 | 기능 | 브랜치명 | 상태 |
|------|------|----------|------|
| 10 | 상담 신청 시스템 | `feature/consultation-system` | ⬜ 대기 |
| 11 | SEO 최적화 | `feature/seo-optimization` | ⬜ 대기 |
| 12 | Google Analytics | `feature/analytics-integration` | ⬜ 대기 |

---

## 브랜치 관리 팁

### 정기적인 동기화
```bash
# dev 브랜치를 정기적으로 최신화
git checkout dev
git pull origin dev

# feature 브랜치에서 dev 변경사항 가져오기
git checkout feature/your-feature
git rebase dev
# 또는
git merge dev
```

### 브랜치 목록 확인
```bash
# 로컬 브랜치
git branch

# 원격 브랜치 포함
git branch -a

# 병합된 브랜치 확인
git branch --merged dev
```

### 브랜치 정리
```bash
# 로컬에서 병합된 브랜치 삭제
git branch -d feature/completed-feature

# 원격 브랜치 삭제
git push origin --delete feature/completed-feature
```

---

## 긴급 상황 대응

### Hotfix (프로덕션 긴급 수정)

```bash
# 1. main에서 hotfix 브랜치 생성
git checkout main
git checkout -b hotfix/critical-bug

# 2. 수정 작업
# ...

# 3. 커밋
git commit -m "hotfix: Fix critical production bug"

# 4. main에 병합
git checkout main
git merge hotfix/critical-bug
git push origin main

# 5. dev에도 병합 (중요!)
git checkout dev
git merge hotfix/critical-bug
git push origin dev

# 6. hotfix 브랜치 삭제
git branch -d hotfix/critical-bug
```

### 잘못된 커밋 취소

```bash
# 마지막 커밋 취소 (변경사항은 유지)
git reset --soft HEAD~1

# 마지막 커밋 완전 취소 (변경사항도 삭제)
git reset --hard HEAD~1

# 특정 커밋으로 되돌리기
git revert <commit-hash>
```

---

## 도움말

### 명령어 치트시트

```bash
# 브랜치 관련
git branch                    # 브랜치 목록
git checkout -b [branch]      # 브랜치 생성 및 전환
git checkout [branch]         # 브랜치 전환
git branch -d [branch]        # 브랜치 삭제
git merge [branch]            # 브랜치 병합

# 커밋 관련
git status                    # 상태 확인
git add .                     # 모든 변경사항 스테이징
git commit -m "message"       # 커밋
git push                      # 푸시
git pull                      # 풀

# 로그 및 히스토리
git log                       # 커밋 로그
git log --oneline --graph     # 그래프 형태 로그
git diff                      # 변경사항 확인

# 원격 저장소
git remote -v                 # 원격 저장소 확인
git fetch                     # 원격 변경사항 가져오기
git push -u origin [branch]   # 첫 푸시 (upstream 설정)
```

### 문제 해결

**문제: 병합 충돌 발생**
```bash
# 1. 충돌 파일 확인
git status

# 2. 파일 열어서 수동으로 충돌 해결
# <<<<<<<, =======, >>>>>>> 마커 확인

# 3. 해결 후 스테이징
git add .

# 4. 병합 커밋
git commit
```

**문제: dev와 너무 많이 벗어남**
```bash
# rebase로 히스토리 정리
git checkout feature/your-feature
git rebase dev

# 충돌 해결 후
git rebase --continue
```

---

## 참고 자료

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub CLI](https://cli.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**작성자**: Claude Code
**프로젝트**: 법무법인 더율 웹사이트
**최종 수정**: 2025-11-16
