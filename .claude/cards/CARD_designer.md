# Design Guide: Button Component 확장

**담당자**: Designer Agent
**예상 소요 시간**: 20분
**입력**: Reader의 분석 리포트
**출력**: design-guide.md (스타일 가이드)

---

## 요구사항

새로운 Button 컴포넌트를 설계하면서 다음을 포함해야 합니다:

1. **Variant 추가**
   - 기존: primary, secondary, tertiary
   - **신규**: ghost (투명 배경, 테두리, 다른 호버)

2. **아이콘 지원**
   - iconLeft: 텍스트 좌측 아이콘
   - iconRight: 텍스트 우측 아이콘
   - 정렬: 세로 중앙 정렬

3. **크기 지원**
   - sm (small), md (medium), lg (large)
   - 각 크기마다 padding, font-size, icon-size 정의

4. **상태 시각화**
   - normal, hover, active, disabled, loading
   - 각 상태의 색상, 배경, 텍스트 명시

---

## 색상 규칙 (globals.css @theme inline 기준)

### Primary Button (기존)
- **Normal**: 배경 `--color-accent` (#1A1A18), 텍스트 `--color-text-on-dark` (white)
- **Hover**: 배경 10% 어둡게, 텍스트 white
- **Active**: 배경 20% 어둡게, 텍스트 white
- **Disabled**: 배경 `--color-bg-sunken`, 텍스트 `--color-text-tertiary`
- **Loading**: 배경 `--color-accent`, 텍스트 white, 스피너 애니메이션

### Secondary Button (기존 패턴 따르기)
- Border 기반, 내부 배경 투명
- Hover 시 배경 `--color-bg-sunken`

### Tertiary Button (기존 패턴 따르기)
- 텍스트 기반, 배경/테두리 없음
- Hover 시 배경 `--color-bg-sunken`

### Ghost Button (신규)
- **Normal**:
  - 배경: `transparent`
  - 테두리: `1px solid var(--color-border-default)`
  - 텍스트: `--color-text-primary`
  - 커서: `pointer`

- **Hover**:
  - 배경: `--color-bg-sunken` (#EFEFED)
  - 테두리: `1px solid var(--color-border-default)`
  - 텍스트: `--color-text-primary`

- **Active**:
  - 배경: 약간 더 진한 회색
  - 테두리: `1px solid var(--color-border-strong)`

- **Disabled**:
  - 배경: `transparent`
  - 테두리: `1px solid var(--color-border-default)` (불투명 40%)
  - 텍스트: `--color-text-tertiary`
  - 커서: `not-allowed`

- **Loading**:
  - 배경: `--color-bg-sunken`
  - 테두리: `1px solid var(--color-border-default)`
  - 텍스트: `--color-text-tertiary`
  - 스피너: 텍스트 위에 로드 애니메이션

---

## 타이포그래피

### 크기별 정의

| 크기 | 클래스 | 폰트 사이즈 | 사용 용도 |
|------|--------|----------|---------|
| **sm** | `.text-control` | 13px | 작은 액션, 보조 버튼 |
| **md** | `.text-body-sm` | 14px | 일반적인 버튼 (기본값) |
| **lg** | `.text-body` | 15px | 주요 CTA, 호출 버튼 |

### 규칙
- 모든 텍스트는 **DM Sans** (산세리프)
- font-weight: **400 (regular)** 또는 **500 (semi-bold)** 만 사용
- font-weight 600/700 **금지**

---

## 간격 (4px 그리드)

### Padding (텍스트 내부)

| 크기 | Padding (세로 x 가로) | 아이콘 포함 여부 |
|------|---------------------|-----------------|
| **sm** | 6px 12px | 4px 아이콘 |
| **md** | 8px 16px | 6px 아이콘 |
| **lg** | 12px 20px | 8px 아이콘 |

### 아이콘-텍스트 간격

| 크기 | Gap (아이콘 ← → 텍스트) |
|------|----------------------|
| **sm** | 4px (`--space-xs`) |
| **md** | 6px (`--space-xs` + 2px) |
| **lg** | 8px (`--space-sm`) |

### 아이콘 크기

| 크기 | 아이콘 치수 |
|------|----------|
| **sm** | 14px × 14px |
| **md** | 16px × 16px |
| **lg** | 18px × 18px |

---

## 상태 시각 요약

```
┌─────────────────────────────────────────────┐
│ Ghost Button State Matrix                  │
├─────────────────────────────────────────────┤
│ Normal    │ bg: transparent, border: gray    │
│ Hover     │ bg: --color-bg-sunken            │
│ Active    │ bg: darker sunken, border:strong │
│ Disabled  │ opacity: 0.5, cursor: not-allowed│
│ Loading   │ bg: sunken, spinner active       │
└─────────────────────────────────────────────┘
```

---

## 반응형 동작

- **375px (모바일)**: 패딩 일관성, 터치 영역 최소 44px 높이
- **768px (태블릿)**: 동일 스타일 적용
- **1024px+ (데스크톱)**: 동일 스타일 적용

---

## 기존 컴포넌트 패턴 준수

- ExploreClient의 필터 pills 패턴과 유사하게
- FestivalCard의 상태 관리 방식 참고
- className 조합 방식: `clsx()` 사용 권장
- CSS 변수: `var(--color-*)`, `var(--space-*)` 사용 필수

---

## 최종 체크리스트

- [ ] 모든 색상 토큰이 `--color-*` 변수인가
- [ ] 모든 간격이 `--space-*` 변수 또는 4px 배수인가
- [ ] 타이포그래피가 지정된 클래스만 사용하는가
- [ ] Ghost variant의 모든 상태가 명시되었는가
- [ ] 아이콘 크기 및 간격이 일관성 있는가
