# Implementation: Button Component 확장

**담당자**: Developer Agent
**예상 소요 시간**: 40분
**입력**: CARD_developer.md + design-guide.md
**출력**: components/Button.tsx (수정된 컴포넌트)

---

## 선행 조건

✅ Designer가 CARD_designer.md를 완성했으며, 다음 정보를 가짐:
- Ghost variant 색상 정의
- 크기별 padding/font-size
- 아이콘 간격 및 크기
- 상태별 시각 명시

---

## 구현 개요

**목표**: 기존 Button 컴포넌트 패턴을 따르면서 다음 기능 추가

1. Ghost variant 지원
2. Icon props (iconLeft, iconRight)
3. 로딩 상태 (loading prop + Framer Motion 애니메이션)
4. 완전한 TypeScript 타입
5. 모든 forbidden patterns 준수

---

## Props 인터페이스

```typescript
interface ButtonProps {
  // 기존
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;

  // 신규
  iconLeft?: React.ReactNode;      // 좌측 아이콘
  iconRight?: React.ReactNode;     // 우측 아이콘
  loading?: boolean;               // 로딩 상태
  ariaLabel?: string;              // 접근성
  type?: 'button' | 'submit' | 'reset';  // 버튼 타입
}
```

---

## 구현 체크리스트

### 1. Ghost Variant 구현

**스타일**:
```
- 배경: transparent
- 테두리: 1px solid var(--color-border-default)
- 텍스트 색: var(--color-text-primary)
- Hover 배경: var(--color-bg-sunken)
- Active: 테두리 var(--color-border-strong)
- Disabled: 테두리 불투명화, 텍스트 tertiary
```

**규칙**:
- ❌ `background: 'transparent'` → ✅ `bg-transparent` 클래스 또는 변수
- ❌ `border: 'solid'` + 인라인 색상 → ✅ CSS 변수 사용
- ✅ `var(--color-border-default)` 필수

### 2. 아이콘 지원

**구현**:
```typescript
// 아이콘 렌더링
{iconLeft && <span className="icon-left">{iconLeft}</span>}
{children}
{iconRight && <span className="icon-right">{iconRight}</span>}
```

**간격** (design-guide.md 참고):
- sm: 4px 간격 (--space-xs)
- md: 6px 간격 (--space-xs + 2px 또는 별도 토큰)
- lg: 8px 간격 (--space-sm)

**정렬**:
- flexbox: `display: flex`, `align-items: center`
- gap 속성으로 간격 제어

### 3. 크기 변수화

**접근**:
```
sm  → padding: var(--button-sm-padding), font-size: 13px
md  → padding: var(--button-md-padding), font-size: 14px
lg  → padding: var(--button-lg-padding), font-size: 15px
```

**선택지 A**: globals.css에 토큰 추가
```css
--button-sm-padding: 6px 12px;
--button-md-padding: 8px 16px;
--button-lg-padding: 12px 20px;
```

**선택지 B**: Tailwind + design-guide.md (권장)
```typescript
const paddingMap = {
  sm: 'px-3 py-[6px]',   // 12px / 6px
  md: 'px-4 py-2',       // 16px / 8px
  lg: 'px-5 py-3',       // 20px / 12px
};
```

### 4. 로딩 상태

**요구사항**:
- `loading` prop = true일 때 disabled 상태처럼 동작
- 스피너 애니메이션 (Framer Motion)
- 버튼 클릭 불가

**구현**:
```typescript
import { motion } from 'framer-motion';

{loading && (
  <motion.span
    className="inline-block"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  >
    ⟳ {/* 또는 아이콘 컴포넌트 */}
  </motion.span>
)}
```

### 5. TypeScript 완전성

```typescript
// ✅ 모든 props에 타입 명시
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  // ... 나머지 props
}

// ✅ 반환 타입
export default function Button(props: ButtonProps): React.ReactNode {
  // ...
}

// ✅ 내부 타입 정의 (필요시)
type VariantClass = Record<'primary' | 'secondary' | 'tertiary' | 'ghost', string>;
```

---

## Forbidden Patterns 체크

### ❌ 반드시 피해야 할 것들

```typescript
// ❌ 금지: Inline style with RGB/hex
<button style={{ color: '#1A1A18' }} />
<button style={{ backgroundColor: 'rgba(255, 255, 255, 0.97)' }} />

// ❌ 금지: font-weight 600/700
<button style={{ fontWeight: 600 }} />

// ❌ 금지: border + box-shadow 중복
className="border border-gray-300 shadow-md"

// ❌ 금지: !important (유틸리티 제외)
<button style={{ color: 'var(--color-text-primary) !important' }} />
```

### ✅ 올바른 방식

```typescript
// ✅ CSS 변수 사용
<button style={{ color: 'var(--color-text-primary)' }} />
<button style={{ backgroundColor: 'var(--color-bg-sunken)' }} />

// ✅ className으로 스타일링
<button className="text-primary bg-sunken" />

// ✅ Tailwind + 설계 시스템
<button className={clsx(
  'px-4 py-2',  // padding
  'text-body-sm',  // 타이포 클래스
  'transition-colors',  // 애니메이션
  variantClass[variant],  // 색상 로직
)} />
```

---

## 접근성 (ARIA) 구현

```typescript
<button
  type="button"
  aria-label={ariaLabel || children}
  disabled={disabled || loading}
  aria-disabled={disabled || loading}
  aria-busy={loading}
  onClick={handleClick}
  className={...}
>
  {loading && <LoadingSpinner />}
  {!loading && children}
</button>
```

---

## 기존 패턴 준수

### FestivalCard 패턴
- variant 기반 조건부 렌더링
- clsx()로 className 조합
- Framer Motion으로 애니메이션

### ExploreClient 패턴
- 상태(disabled, loading)에 따른 스타일 변경
- CSS 변수 활용

---

## 구현 순서

1. **Props 인터페이스 정의** (5분)
2. **Ghost variant 스타일 추가** (10분)
3. **아이콘 렌더링 로직** (10분)
4. **로딩 상태 + Framer Motion** (10분)
5. **TypeScript 타입 완성 + 테스트** (5분)

---

## 최종 체크리스트

- [ ] Props 인터페이스 완전
- [ ] Ghost variant 모든 상태 구현
- [ ] iconLeft/iconRight 정렬 및 간격 일관
- [ ] loading 상태 애니메이션 부드러움
- [ ] 모든 색상이 CSS 변수 사용
- [ ] font-weight 400/500만 사용
- [ ] TypeScript 타입 완전
- [ ] ARIA 속성 완전
- [ ] 다른 페이지(Explore, Calendar)에서도 사용 가능

---

## 출력 요구사항

**파일**: `components/Button.tsx`

**커밋 메시지**:
```
feat(button): Add ghost variant and icon support

- Implement ghost variant with transparent background and border
- Add iconLeft and iconRight props for icon placement
- Support sm/md/lg sizes with CSS variables
- Add loading state with Framer Motion animation
- Complete TypeScript typing and ARIA accessibility
- Ensure full design system compliance (colors, spacing, typography)
```
