인물ㅇ# Notion 연동 설정 가이드

## 1단계: Notion 데이터베이스 생성

1. Notion에 로그인 (https://notion.so)
2. 새 페이지 생성
3. `/database` 입력 → "Table - Inline" 선택
4. 데이터베이스 이름: **"성공사례"**

## 2단계: 데이터베이스 속성 설정

아래 속성들을 추가하세요:

| 속성 이름 | 타입 | 설명 |
|----------|------|------|
| **제목** | Title | 케이스 제목 (기본 속성) |
| **slug** | Text | URL용 (예: alimony-case-01) |
| **카테고리** | Select | 옵션: 상간, 위자료, 재산분할, 양육권 |
| **결과** | Text | "위자료 5억원 확보" 등 |
| **배경색** | Select | 옵션: pink, purple, green, amber, red |
| **공개** | Checkbox | 체크하면 홈페이지에 노출 | 
| **작성일** | Date | 자동 생성 |

## 3단계: Notion Integration 생성

1. https://www.notion.so/my-integrations 접속
2. **"+ New integration"** 클릭
3. 설정:
   - Name: `더율 웹사이트`
   - Associated workspace: (당신의 워크스페이스)
   - Capabilities: **Read content** 체크
4. **Submit** 클릭
5. **Internal Integration Token** 복사 → 안전한 곳에 보관

## 4단계: 데이터베이스에 Integration 연결

1. 생성한 "성공사례" 데이터베이스 페이지 열기
2. 우측 상단 **"..."** 클릭
3. **"Add connections"** 클릭
4. **"더율 웹사이트"** 선택

## 5단계: 데이터베이스 ID 복사

1. 데이터베이스 페이지 URL 확인:
   ```
   https://notion.so/username/xxxxxxxxxxxxx?v=yyyyyyyy
                              ↑↑↑↑↑↑↑↑↑↑↑↑↑
                          이 부분이 Database ID
   ```
2. `xxxxxxxxxxxxx` 부분 복사 (32자)

## 6단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성 (없으면) 후 추가:

```bash
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**주의:** `.env.local`은 절대 Git에 커밋하지 마세요!

## 7단계: 테스트 데이터 입력

데이터베이스에 첫 번째 케이스 입력:

| 속성 | 값 |
|------|-----|
| 제목 | 위자료 5억원 확보 - 20년 결혼의 정당한 보상 |
| slug | alimony-case-01 |
| 카테고리 | 위자료 |
| 결과 | 위자료 5억원 확보 |
| 배경색 | pink |
| 공개 | ✅ |

**본문 작성:**
- 제목 클릭 → 페이지 열림
- 자유롭게 작성:
  ```
  ## 사건 배경

  20년을 함께한 결혼 생활이 끝났지만, A씨는 포기하지 않았습니다.

  ## 법률 전략

  ### 증거 수집
  - 불륜 증거 확보
  - 정신적 학대 기록

  ### 소송 전략
  ...

  ## 결과

  위자료 5억원을 확보하여 새로운 시작의 기반을 마련했습니다.
  ```

---

## ✅ 완료!

위 단계를 완료하면 Claude에게 알려주세요.
그러면 코드 연동을 진행하겠습니다.

## 📞 문제 발생 시

- Integration Token을 못 찾겠다 → https://www.notion.so/my-integrations
- Database ID를 못 찾겠다 → 데이터베이스 URL 전체를 복사해서 보내주세요
- 속성 추가를 못하겠다 → 스크린샷 찍어서 보내주세요
