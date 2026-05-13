# Battery Intel Portal — GitHub 세팅 가이드

## 파일 구성
```
battery-intel-portal/
├── index.html        ← 메인 허브 (여기서 시작)
├── summarizer.html   ← PDF 보고서 요약기
├── compare.html      ← 소재 사양 비교표
└── README.md         ← 이 파일
```

---

## GitHub 세팅 (최초 1회)

### 1단계 — GitHub 계정 생성
1. https://github.com 접속
2. Sign up 클릭 → 이메일/비밀번호 입력

### 2단계 — Repository 생성
1. 로그인 후 우측 상단 `+` → `New repository`
2. Repository name: `battery-intel-portal` (원하는 이름)
3. **Private** 선택 (중요: 외부 공개 안 됨)
4. `Create repository` 클릭

### 3단계 — 파일 업로드
1. 생성된 repository 페이지에서 `uploading an existing file` 클릭
2. 파일 3개 (index.html, summarizer.html, compare.html) 드래그 업로드
3. `Commit changes` 클릭

### 4단계 — GitHub Pages 활성화
1. repository 상단 `Settings` 탭
2. 왼쪽 메뉴 `Pages`
3. Source: `Deploy from a branch`
4. Branch: `main` / `/ (root)` 선택 → `Save`
5. 1~2분 후 URL 생성: `https://[계정명].github.io/battery-intel-portal`

---

## 집/회사 양쪽에서 사용하기

### 방법 A — 브라우저 북마크 (가장 단순)
생성된 GitHub Pages URL을 집 PC, 회사 PC 브라우저에 북마크.
파일 수정 시 GitHub에 업로드하면 자동 반영.

### 방법 B — GitHub Desktop (파일 동기화)
1. https://desktop.github.com 에서 GitHub Desktop 설치
2. 로그인 → `Clone repository` → `battery-intel-portal` 선택
3. 로컬 폴더에 파일이 자동 복제됨
4. 파일 수정 후 `Commit` → `Push` 하면 양쪽 동기화

---

## API 키 설정

1. https://console.anthropic.com/settings/keys 접속
2. `Create Key` 클릭 → 키 복사 (sk-ant-... 형태)
3. 포털 접속 후 우측 상단 `키 설정` 버튼 클릭
4. 키 입력 → 저장 (브라우저에만 저장, 외부 전송 없음)
5. 새 컴퓨터에서 처음 열 때 한 번만 재입력

---

## 도구 추가 방법

새 도구를 만들면:
1. `newtool.html` 파일 생성
2. `index.html`의 "COMING SOON" 섹션에 카드 추가
3. GitHub에 업로드
