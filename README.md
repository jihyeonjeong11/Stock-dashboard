# Stock Dashboard

NextJS Starter 템플릿을 기반으로 웹소켓 기반 실시간 주식 가격 정보를 확인할 수 있는 토이 프로젝트입니다.

[원본 repo](https://github.com/webdevcody/wdc-saas-starter-kit)
[Original Video walkthrough](https://webdevcody.gumroad.com/l/wdc-saas-starter-kit-walkthrough)

## 기능 명세

- 이메일 회원가입 / 로그인 및 자체 세션 핸들링
- Group Management(작업 중지)
- Drizzle ORM
- Tailwind CSS
- Authorization

- FinnHub third party api를 활용한 주식 정보 대시보드
- 주식 가격 Websocket Server (Cloudflare worker) / Client (NextJS)
- 회사 재무 정보 시각화 / Echarts

### 요구사항

Docker와 Docker Compose를 통해 postgres db를 빌드합니다. 다른 방법으로 사용하신다면 수정이 필요합니다.

## How to Run

1. cp .env.sample .env
2. pnpm i
3. docker compose up
4. pnpm run db:migrate
5. pnpm run dev

## Env Setup

해당 템플릿을 구동하기 위해 env.ts 안의 env 변수 명을 지정해야 합니다.

## Database

postgres db를 사용하고 있습니다.
