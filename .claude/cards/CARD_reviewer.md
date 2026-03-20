# Code Review: Button Component 확장

**담당자**: Reviewer Agent
**예상 소요 시간**: 20분
**입력**: Developer의 PR (components/Button.tsx) + Tester의 test-report.md
**출력**: review.md (최종 검수 의견)

---

## 리뷰 목적

1. **코드 품질**: TypeScript 타입, 재사용성, 유지보수성
2. **설계 시스템 준수**: CLAUDE.md 규칙 완전 준수
3. **일관성**: 기존 컴포넌트와의 패턴 일관성
4. **최종 승인**: merge 가능 여부 결정

---

## 리뷰 기준

### A. TypeScript 타입 완전성

#### ButtonProps 인터페이스
```typescript
interface ButtonProps {
  // ✅ 모든 prop에 타입 명시
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

**체크리스트**:
- [ ] 모든 optional props에 `?` 표시
- [ ] 모든 prop 타입이 명확한가 (string 말고 literal types)
- [ ] children 타입 명시
- [ ] callback 타입 명시: `onClick?: () => void`
- [ ] 반환 타입 명시: `React.ReactNode` 또는 `JSX.Element`

#### 내부 타입 정의
- [ ] VariantClass 타입 정의 (variant → className 매핑)
- [ ] SizeClass 타입 정의 (size → className 매핑)
- [ ] 불필요한 `any` 타입 사용 없음

---

### B. 재사용성 검증

#### 다른 컴포넌트에서 사용 가능?
```typescript
// ✅ Explore 페이지
import Button from '@/components/Button';
<Button variant="primary" size="md" onClick={() => {}}>
  필터 적용
</Button>

// ✅ Calendar 페이지
<Button variant="ghost" size="sm" iconRight={<ArrowIcon />}>
  다음 월
</Button>

// ✅ Settings 페이지
<Button variant="tertiary" loading={isLoading}>
  저장 중...
</Button>
```

**체크리스트**:
- [ ] 컴포넌트가 export 되는가
- [ ] 다른 페이지에서 import 가능한 경로인가: `@/components/Button`
- [ ] Props가 명확하고 확장 가능한가
- [ ] 기존 variant (primary/secondary/tertiary)도 작동하는가
- [ ] 새로운 variant (ghost) 추가 방식이 확장 가능한가

#### 유사 컴포넌트와의 일관성
- [ ] FestivalCard의 variant 패턴과 유사한가
- [ ] ExploreClient의 필터 pills 선택 로직과 호환되는가
- [ ] 색상 토큰 사용 패턴 일관성

---

### C. Forbidden Patterns 완전 준수

#### 색상 규칙 ❌ 금지 / ✅ 필수

```typescript
// ❌ 절대 금지
const buttonStyles = {
  backgroundColor: '#1A1A18',  // ← 직접 hex
  color: 'rgba(26, 26, 24, 1)',  // ← 직접 rgba
  borderColor: '#E4E4E0'  // ← 직접 hex
};

// ✅ 필수
const buttonStyles = {
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border-default)'
};
```

**체크리스트**:
- [ ] 모든 색상이 `var(--color-*)` 사용
- [ ] globals.css의 @theme inline 토큰만 사용
- [ ] RGB/rgba 직접 사용 없음
- [ ] 16진 색상 코드 직접 사용 없음

#### 타이포그래피 규칙 ❌ 금지 / ✅ 필수

```typescript
// ❌ 절대 금지
<button style={{ fontSize: '14px', fontWeight: 600 }} />  // font-weight 600
<button className="font-bold">  // bold = 700

// ✅ 필수
<button className="text-body-sm">  // 14px
<button className="font-[400]">  // 400 only
<button style={{ fontWeight: 400 }}>  // 400 or 500
```

**체크리스트**:
- [ ] font-weight는 400 (regular) 또는 500 (semi-bold)만
- [ ] font-weight 600, 700, bold 없음
- [ ] 타이포그래피는 `.text-*` 클래스로만 (inline style 금지)
- [ ] 커스텀 font-size 없음

#### 간격 규칙 ❌ 금지 / ✅ 필수

```typescript
// ❌ 절대 금지
<button style={{ padding: '10px 15px' }} />  // 임의값

// ✅ 필수 (4px 그리드)
<button style={{ padding: '8px 16px' }} />  // --space-sm / --space-md
<button className="px-4 py-2" />  // Tailwind 토큰
```

**체크리스트**:
- [ ] 모든 padding/margin이 4px 그리드의 배수
- [ ] 유효한 값: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, ...
- [ ] 가능하면 `--space-*` 변수 사용
- [ ] 자의적인 픽셀값 없음

#### 기타 Forbidden Patterns

```typescript
// ❌ border + box-shadow 중복
<button className="border border-gray-300 shadow-md" />

// ❌ !important 사용
<button style={{ color: 'var(--color-text-primary) !important' }} />

// ✅ 구체적 선택자 사용
.button.primary { /* ... */ }
.button.primary:hover { /* ... */ }
```

**체크리스트**:
- [ ] border + box-shadow 중복 없음
- [ ] `!important` 사용 없음 (utility classes 제외)
- [ ] inline style보다 className 우선

---

### D. 접근성 (ARIA) 완전성

#### ARIA Attributes

```typescript
<button
  type="button"  // ✅ 명시적 타입
  disabled={disabled}
  aria-disabled={disabled}  // ✅ 중복된 상태 표현
  aria-busy={loading}  // ✅ loading 상태
  aria-label={ariaLabel || children}  // ✅ 아이콘만 있는 경우
  className={...}
>
  {children}
</button>
```

**체크리스트**:
- [ ] `type="button"` 명시 (또는 `type="submit"`)
- [ ] disabled 상태: `disabled` + `aria-disabled="true"`
- [ ] loading 상태: `aria-busy="true"`
- [ ] 아이콘만: `aria-label` 또는 `title` 속성
- [ ] semantic HTML 사용 (올바른 태그)

#### 키보드 네비게이션
- [ ] Tab 키로 버튼에 포커스 가능
- [ ] focused 상태 시각화 (outline 또는 ring)
- [ ] Enter/Space 키로 activation 가능
- [ ] disabled 상태에서 Tab으로 이동 불가

---

### E. 기존 코드 패턴 일관성

#### className 조합 방식
```typescript
// ✅ clsx 사용 (또는 classnames)
import { clsx } from 'clsx';  // 또는 npm install clsx

const buttonClass = clsx(
  'inline-flex',
  'items-center',
  'justify-center',
  'transition-colors',  // 스타일 전환
  'cursor-pointer',
  {
    'bg-slate-900 text-white hover:bg-slate-800': variant === 'primary',
    'border border-slate-300 text-slate-900 hover:bg-slate-50': variant === 'ghost',
    // ...
  },
  {
    'px-3 py-1.5 text-sm': size === 'sm',
    'px-4 py-2 text-base': size === 'md',
    // ...
  },
  {
    'opacity-50 cursor-not-allowed': disabled || loading,
  },
  className  // 추가 className 병합
);
```

**체크리스트**:
- [ ] clsx/classnames 사용 (조건부 className)
- [ ] inline style 최소화
- [ ] className 구조가 읽기 쉬운가
- [ ] 기존 컴포넌트(FestivalCard, ExploreClient)와 일관성

#### 변수 네이밍
- [ ] variantMap, sizeMap 등 명확한 이름
- [ ] snake_case vs camelCase 일관성 (JavaScript = camelCase)
- [ ] 약자 사용 최소화 (btn → button)

#### Import 패턴
```typescript
// ✅ 일관된 import
"use client";  // Client Component 명시 (필요시)
import { motion } from 'framer-motion';
import clsx from 'clsx';  // 또는 import { clsx } from 'clsx'
import type { ReactNode } from 'react';
```

**체크리스트**:
- [ ] Server/Client Component 명시 일관
- [ ] 외부 라이브러리는 절대 경로로 import
- [ ] 로컬 컴포넌트는 `@/` 패턴으로 import
- [ ] 필요한 라이브러리가 package.json에 있는가 (clsx, framer-motion)

---

### F. 성능 및 최적화

#### Framer Motion 사용
```typescript
// ✅ 효율적인 애니메이션
<motion.span
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
>
  ⟳
</motion.span>

// ❌ 비효율적 (매 렌더링마다 새로운 객체)
animate={{ rotate: Math.random() * 360 }}  // ← 불필요한 리렌더링
```

**체크리스트**:
- [ ] Framer Motion 설정이 합리적인가 (duration, repeat)
- [ ] 불필요한 리렌더링 없음
- [ ] CSS 변수로 애니메이션 제어

#### 메모이제이션 (필요시)
```typescript
// React.memo 필요? (Props가 자주 변경되지 않을 때)
export default React.memo(Button);  // ← 선택사항
```

**체크리스트**:
- [ ] 불필요한 memo 사용 없음
- [ ] Props가 자주 변경되는 컴포넌트인가

---

## 리뷰 템플릿

### review.md 작성 포맷

```markdown
# Code Review: Button Component 확장

**검수자**: Reviewer Agent
**검수 날짜**: [현재 날짜]
**상태**: [APPROVED / CHANGES_REQUESTED / COMMENT]

## 1. TypeScript 타입

### 점검 사항
- [x] ButtonProps interface 완전
- [x] 모든 prop 타입 명시
- [x] 반환 타입 명시
- [x] 내부 타입 일관성

**코멘트**: ButtonProps가 잘 정의되어 있습니다. optional props에 모두 `?` 표시 확인.

---

## 2. Forbidden Patterns 준수

### 색상
- [x] 모든 색상이 `var(--color-*)` 사용

### 타이포그래피
- [x] font-weight 400/500만
- [x] `.text-*` 클래스 사용

### 간격
- [x] 4px 그리드 준수
- [x] `--space-*` 또는 Tailwind 토큰

**코멘트**: Forbidden patterns 완전히 준수합니다.

---

## 3. 재사용성

- [x] 다른 페이지에서 import 가능
- [x] Props 확장 가능
- [x] 기존 variant 호환

**코멘트**: Explore, Calendar, Settings 등 다양한 페이지에서 사용 가능합니다.

---

## 4. 접근성 (ARIA)

- [x] type="button" 명시
- [x] disabled + aria-disabled
- [x] loading 상태: aria-busy
- [x] 키보드 네비게이션 지원

**코멘트**: ARIA 속성이 완전히 구현되었습니다.

---

## 5. 코드 패턴 일관성

- [x] className 조합 (clsx 사용)
- [x] import 패턴 일관
- [x] 네이밍 규칙 준수

**코멘트**: ExploreClient와 FestivalCard 패턴을 잘 따랐습니다.

---

## 최종 결론

✅ **APPROVED** - merge 가능

모든 검수 항목을 통과했습니다:
- TypeScript 타입 완전
- Forbidden patterns 준수
- 접근성 구현
- 코드 품질 우수

---

## 추천사항 (선택사항)

1. Storybook에 Button 스토리 추가 고려
2. 단위 테스트 추가 (추후)
3. 다른 컴포넌트에서 Button 재사용 권장

---
```

---

## 최종 체크리스트

- [ ] TypeScript 타입 검증 완료
- [ ] Forbidden patterns 확인 완료
- [ ] 재사용성 검증 완료
- [ ] ARIA 접근성 확인 완료
- [ ] 코드 패턴 일관성 검토 완료
- [ ] Tester의 test-report.md 검토 완료
- [ ] 발견된 버그/이슈 모두 처리 확인
- [ ] review.md 작성 완료
- [ ] 최종 결정: APPROVED / CHANGES_REQUESTED / COMMENT

---

## 승인 후 다음 단계

✅ **APPROVED인 경우**:
1. components/Button.tsx merge
2. main 브랜치로 pull request 생성
3. 테스트 자동화 (CI/CD) 실행
4. 배포 준비

⚠️ **CHANGES_REQUESTED인 경우**:
1. Developer에게 피드백 전달
2. 수정 대기
3. 재검증

---

## 참고 자료

- CLAUDE.md (프로젝트 가이드)
- colors.md (색상 토큰)
- spacing.md (간격 규칙)
- typography.md (타이포그래피)
- forbidden.md (금지 패턴)
- components.md (컴포넌트 패턴)
