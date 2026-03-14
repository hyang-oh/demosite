# Typography Rules

## 서체

- **Cormorant Garamond** (세리프) — 헤드라인 전용. `--font-serif`
- **DM Sans** (산세리프) — 본문·UI 전체. `--font-sans`

로딩: `next/font/google`으로 layout.tsx에서 로드. CDN 링크 사용 금지.

## 역할 분리

| 역할 | 서체 |
|------|------|
| Display, Title, Heading, Subheading, Card Title | Cormorant Garamond (세리프) |
| Body, Control, Label, Caption, 모든 UI | DM Sans (산세리프) |

**세리프는 헤드라인에만.** 본문·버튼·필터·입력에 세리프 사용 금지.

## 타이포 스케일 (globals.css 기준)

| 클래스 | 용도 | 서체 | 크기 |
|--------|------|------|------|
| `.text-display` | 홈 히어로 헤드라인 | 세리프 | clamp(44px, 6vw, 72px) |
| `.text-title` | 페이지 타이틀 (Explore, Calendar 등) | 세리프 | 48px |
| `.text-title-sm` | 좁은 페이지 타이틀 (Settings) | 세리프 | 36px |
| `.text-heading` | 섹션 제목, featured 카드 오버레이 | 세리프 | 28px |
| `.text-subheading` | Magazine featured, 상세 h2 | 세리프 | 24px |
| `.text-card-title` | 카드 축제명 | 세리프 | 20px |
| `.text-body` | 기본 본문 | 산세리프 | 15px |
| `.text-body-sm` | 토글 라벨, 버튼, 리뷰어 | 산세리프 | 14px |
| `.text-control` | 필터 pill, 드롭다운, 월 탭 | 산세리프 | 13px |
| `.text-label` | 섹션 수퍼라벨, 태그 (uppercase) | 산세리프 | 11px |
| `.text-caption` | 날짜, 위치, 메타데이터 | 산세리프 | 12px |

## 규칙

- font-weight: 400(기본), 500(강조)만 사용. **600·700 금지**
- 헤드라인: letter-spacing 음수 (-0.01em ~ -0.03em)
- Label(11px): letter-spacing 양수 (0.1em), uppercase
- 임의 font-size 인라인 지정 금지 — 위 스케일 클래스 또는 globals.css 정의 값만 사용
