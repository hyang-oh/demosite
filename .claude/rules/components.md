# Component Patterns

## 카드 (FestivalCard)

3가지 variant: `standard`, `featured`, `horizontal`

### Standard (기본)
- 탈박스 (border 없음, 배경 없음)
- 이미지: 4:3 비율, hover 시 scale-105
- 텍스트: category(label) → name(serif 20px) → city·month(caption)
- gap: mt-3 (이미지-텍스트), mt-1 (텍스트 간)

### Featured
- 이미지 위 gradient overlay (`gradient-full`)
- 텍스트: 이미지 위 absolute bottom
- on-dark 토큰 사용

### Horizontal
- 가로 배치: 이미지(96x72) + 텍스트
- 하단 border-bottom 구분선

## 필터 (Filter Pills)

- `.filter-pill` 클래스 사용
- 비활성: gray border (`--color-border-default`), secondary 텍스트
- 활성: 면 채움 (`--color-text-primary`), 반전 텍스트 (`--color-bg-elevated`)
- hover: `.filter-pill:hover`로 border·text를 primary로

## 섹션 헤더

```
수퍼라벨   .text-label, color: --color-text-tertiary, margin-bottom: 8px
제목       .text-heading
```

우측에 "View all →" 링크 (`.text-label`, secondary)

## 페이지 타이틀

- 크기: 48px (`.text-title`), Settings만 36px (`.text-title-sm`)
- 상단 여백: paddingTop 96px, paddingBottom 64px
- 서브텍스트: `.text-body`, secondary, marginTop 12px

## 가로 스크롤 섹션

- 카드 width: 320px, `flex-shrink: 0`, `scroll-snap-align: start`
- 우측 여백: 32px spacer div
- `scrollbar-width: none`

## Navigation

- 높이: 64px, sticky, z-50
- 배경: `--color-bg-glass` + `backdrop-blur`
- 로고: serif 18px weight 600
- 링크: 13px, secondary → hover primary
