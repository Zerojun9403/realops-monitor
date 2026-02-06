# 🖥️ RealOps Monitor - Frontend


## 🔗 Live Demo

**https://realops-monitor.ddns.net**

![Dashboard Screenshot](https://via.placeholder.com/800x450?text=RealOps+Monitor+Dashboard)

---

## ✨ 주요 기능

- 🔴 **실시간 모니터링** - WebSocket으로 2초마다 메트릭 업데이트
- 📊 **인터랙티브 차트** - CPU, Memory, Network 실시간 시각화
- 🔔 **브라우저 알림** - 임계값 초과 시 즉시 알림
- 🌙 **다크/라이트 모드** - 테마 전환 지원
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크탑 지원

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Real-time | WebSocket |

---

## 🚀 시작하기

### 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/Zerojun9403/realops-monitor.git
cd realops-monitor

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 프로덕션 빌드

```bash
npm run build
npm run start
```

---

## ⚙️ 환경 설정

### WebSocket 연결 URL 변경

`app/page.tsx`에서 WebSocket URL 수정:

```typescript
// 로컬 개발
const wsUrl = "ws://localhost:8080/ws/metrics";

// 프로덕션
const wsUrl = "wss://your-domain.com/ws/metrics";
```

---

## 📁 프로젝트 구조

```
realops-monitor/
├── app/
│   ├── hooks/
│   │   └── useWebSocket.ts    # WebSocket 커스텀 훅
│   ├── page.tsx               # 메인 대시보드
│   ├── layout.tsx             # 레이아웃
│   └── globals.css            # 글로벌 스타일
├── public/                    # 정적 파일
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔌 API 연동

### WebSocket 메시지 형식

```json
{
  "cpu": 75.5,
  "memory": 68.2,
  "disk": 45.0,
  "network": 120,
  "timestamp": "2026-02-06T12:00:00"
}
```

### REST API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/status` | 서버 상태 확인 |
| GET | `/api/metrics` | 현재 메트릭 조회 |
| GET | `/api/metrics/history?period=1h` | 히스토리 조회 |

---

## 🎨 스크린샷

### 메인 대시보드
![Main Dashboard](https://via.placeholder.com/600x400?text=Main+Dashboard)

### 실시간 차트
![Real-time Charts](https://via.placeholder.com/600x400?text=Real-time+Charts)

### 모바일 뷰
![Mobile View](https://via.placeholder.com/300x600?text=Mobile+View)

---

## 🔗 관련 저장소

- **Backend**: [realops-monitor-backend](https://github.com/Zerojun9403/realops-monitor-backend)

---

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

## 👨‍💻 개발자

- **GitHub**: [@Zerojun9403](https://github.com/Zerojun9403)
- **Experience**: KT 데이터센터 3년 근무 경험

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
