# Spacing Rules

## 4px 그리드

| 토큰 | 값 | 주요 용도 |
|------|-----|----------|
| `--space-xs` | 4px | 아이콘-텍스트 간격 |
| `--space-sm` | 8px | 수퍼라벨-제목 간격 |
| `--space-md` | 16px | 카드 내부 패딩 |
| `--space-lg` | 32px | 컨테이너 좌우 패딩 |
| `--space-xl` | 64px | 섹션 하단 패딩 |
| `--space-2xl` | 96px | 페이지 타이틀 상단 패딩 |

## 레이아웃

- 컨테이너: `max-w-[1100px] mx-auto px-8`
- 카드 그리드: 3열 (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), gap-6
- 섹션 간 구분: `border-top: 1px solid var(--color-border-default)` 또는 배경색 변경

## 페이지 타이틀 영역

- paddingTop: 96px (nav 64px + 여백 32px)
- paddingBottom: 64px
- 서브텍스트 marginTop: 12px

## 섹션 패딩

- 일반 섹션: paddingTop 48px, paddingBottom 64px
- 섹션 헤더 → 콘텐츠: marginBottom 24px
