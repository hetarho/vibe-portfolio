# Windows 개발 환경 자동 설치 프롬프트

나는 이 Windows PC에 **VS Code와 Claude Code까지만 직접 설치했다.**
지금부터 너는 내 개발 환경 설치 담당자다.

내게 설치 명령을 하나씩 복사해 실행하라고 하지 말고, 네가 PowerShell과 WinGet을 사용해 직접 점검하고 설치하고 검증해라. 설치 권한 팝업, 브라우저 로그인, 재부팅처럼 내가 직접 해야 하는 순간에만 짧고 정확하게 알려줘라.

## 최종 목표

이 PC에서 다음 작업을 바로 할 수 있게 만들어라.

- VS Code에서 프로젝트 폴더 열기
- Git과 GitHub로 clone, pull, commit, push 하기
- Node.js 기반 웹 프로젝트 설치·실행하기
- Python 3 기반 프로젝트를 가상환경에서 실행하기
- Claude Code가 프로젝트를 읽고 수정하고 테스트하기
- Windows 빠른 지원으로 나중에 원격 수업을 시작하기
- 나중에 다른 PC에서도 같은 프롬프트로 빠진 도구만 다시 설치하기

작업 폴더는 `C:\dev`로 통일한다.

## 진행 방식

1. 먼저 현재 상태를 읽기 전용으로 빠르게 점검해라.
2. 점검 결과를 `이미 준비됨 / 지금 설치 / 이번에는 보류` 세 칸으로 간단히 보여줘라.
3. 그다음 별도의 재확인을 기다리지 말고, 누락된 기본 도구를 바로 설치해라.
4. 각 도구를 설치한 직후 버전과 실제 실행 경로를 검증해라.
5. 새 터미널이 필요한 경우 VS Code와 터미널을 다시 여는 시점만 알려줘라.
6. 마지막에는 실제 프로젝트 하나를 실행할 준비가 되었는지 종합 점검해라.

Claude Code 자체의 명령 실행 승인 창이 뜨면 관련 설치 명령을 가능한 한 묶고, 내가 무엇을 허용하는지 한 문장으로 설명해라. 승인 절차를 우회하려고 하지는 마라.

## 먼저 점검할 항목

Windows 버전과 CPU 아키텍처, 남은 디스크 공간, WinGet 사용 가능 여부를 확인해라.

아래 명령의 설치 여부·버전·실행 경로를 확인하고, 같은 명령이 여러 경로에서 발견되는지도 확인해라.

- `code`
- `claude`
- `git`
- `gh`
- `pwsh`
- `node`
- `npm`
- `python`
- `py`
- `uv`

Windows **빠른 지원(Quick Assist)** 앱이 설치되어 있고 실행 가능한지도 확인해라.

현재 폴더가 프로젝트라면 `package.json`, lockfile, `.nvmrc`, `.node-version`, `pyproject.toml`, `.python-version`, `requirements*.txt`, `README*`를 찾아 요구 버전과 패키지 관리자를 먼저 판단해라.

## 자동으로 설치할 기본 도구

기존 설치가 정상이라면 그대로 두고, 누락된 것만 공식 배포처 또는 WinGet의 정확한 패키지 ID로 설치해라.

### Windows 기본 개발 도구

- Git for Windows — `Git.Git`
- Windows Terminal — `Microsoft.WindowsTerminal`
- PowerShell 7 — `Microsoft.PowerShell`
- GitHub CLI — `GitHub.cli`
- Windows 빠른 지원 — 설치되어 있지 않다면 WinGet의 Microsoft Store 소스에서 검색하고, 게시자가 Microsoft Corporation인 공식 앱만 설치

### JavaScript / 웹 개발

- Node.js LTS — `OpenJS.NodeJS.LTS`
- npm은 Node.js에 포함된 버전을 사용
- 현재 프로젝트의 lockfile이 있으면 npm·pnpm·Yarn 중 그 프로젝트가 쓰는 패키지 관리자를 준비해라. Corepack을 사용할 수 있으면 우선 사용하고, 요구 버전이 있으면 맞춰라
- 기존 lockfile을 다른 종류로 바꾸거나 새 lockfile을 추가하지 마라

### Python 개발

- `uv` — `astral-sh.uv`
- 프로젝트가 요구하는 Python 버전이 있으면 그 버전을 설치
- 요구 버전이 없으면 널리 호환되는 지원 중 Python 3 버전 하나만 준비
- Python 패키지는 전역에 설치하지 말고 프로젝트별 `.venv`를 사용
- `python --version` 또는 `uv run python --version`으로 최종 확인

### VS Code 확장

`code --install-extension`으로 누락된 확장을 설치해라.

- `anthropic.claude-code`
- `ms-vscode.powershell`
- `ms-python.python`
- `ms-python.vscode-pylance`
- `github.vscode-pull-request-github`
- JavaScript/TypeScript 프로젝트라면 `dbaeumer.vscode-eslint`
- JavaScript/TypeScript 프로젝트라면 `esbenp.prettier-vscode`

확장 설치 뒤 VS Code를 다시 열어야 하면 알려줘라.

## 기본 설정

- `C:\dev` 폴더가 없으면 생성해라.
- 새 Git 저장소의 기본 브랜치는 `main`으로 설정해라.
- Git 사용자 이름과 이메일이 비어 있으면 마지막에 한 번만 내게 물어보고 설정해라.
- GitHub 로그인이 필요하면 `gh auth login --web`을 시작하고, 브라우저에서 내가 직접 승인하게 해라.
- Claude Code는 지금 실행 중인 설치를 유지하고 `claude --version`, `claude doctor`로만 점검해라. 같은 Claude Code를 다른 방식으로 중복 설치하지 마라.
- VS Code는 관리자 권한으로 상시 실행하지 마라.

## 안전 규칙

- 기존 프로그램, 프로젝트, Git 저장소, 환경 변수를 임의로 삭제하지 마라.
- 기존 도구를 이유 없이 다운그레이드하거나 다른 설치 방식으로 교체하지 마라.
- `winget upgrade --all`을 실행하지 마라.
- Defender, 방화벽, UAC를 끄지 마라.
- PowerShell 실행 정책을 전역으로 느슨하게 바꾸지 마라.
- WSL2, Docker Desktop, 데이터베이스 서버, Visual Studio Build Tools, Java/.NET SDK는 오늘 설치하지 마라. 실제 프로젝트가 요구하면 마지막 보고서의 `추가 설치 후보`에 이유와 함께 적어라.
- 비밀번호, GitHub 토큰, Claude 인증 정보, API 키, 개인키의 값을 출력하거나 파일에 기록하지 마라.
- 설치 하나가 실패하면 무작정 다른 설치 방식을 연달아 시도하지 말고, 정확한 오류와 가장 작은 해결 방법을 알려줘라.
- 자동 재부팅하지 마라. 재부팅이 필요하면 현재까지 완료한 항목을 먼저 보고해라.

## 최종 검증

설치가 끝나면 새 PowerShell 터미널 기준으로 아래 항목을 확인해라.

- `winget --version`
- `git --version`
- `gh --version`과 `gh auth status`
- `pwsh --version`
- `node --version`과 `npm --version`
- `uv --version`과 준비한 Python 3 버전
- `code --version`
- `claude --version`과 `claude doctor`
- `C:\dev` 폴더 존재 여부
- 설치한 VS Code 확장 목록
- Windows 빠른 지원 앱 실행 가능 여부

현재 프로젝트가 있다면 파일을 수정하지 않은 상태에서 올바른 설치 명령, 실행 명령, 테스트 또는 빌드 명령, 현재 `git status`도 확인해라.

## 마지막 결과물

`C:\dev\SETUP-REPORT.md` 파일을 만들고 아래 내용을 기록해라. 비밀 값은 넣지 마라.

- 점검 날짜와 Windows 정보
- 설치된 핵심 도구의 버전과 실행 경로
- GitHub와 Claude의 로그인 완료 여부만 표시
- 설치한 VS Code 확장
- 프로젝트별 실행 명령
- 실패했거나 보류한 항목과 이유
- 다음에 같은 프롬프트를 실행했을 때 확인할 항목

마지막 답변은 어렵게 설명하지 말고 아래 형식으로 끝내라.

1. 개발 환경: 완료 / 일부 완료
2. 자동 설치한 것: 목록
3. 내가 직접 한 것: 로그인·재시작 등 목록
4. 남은 문제: 없으면 `없음`
5. 다음 행동: 실제 프로젝트를 여는 한 문장
