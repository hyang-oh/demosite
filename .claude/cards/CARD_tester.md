# Testing: Button Component 확장

**담당자**: Tester Agent
**예상 소요 시간**: 20분
**입력**: Developer의 구현 완료 (components/Button.tsx)
**출력**: test-report.md (검증 체크리스트 + 버그 리스트)

---

## 테스트 환경 준비

### 1. 로컬 서버 실행
```bash
npm run dev
```

### 2. Button 컴포넌트 확인
- [x] Storybook 또는 테스트 페이지에서 Button 표시
- [x] 모든 variant/size 조합이 렌더링되는가

---

## 검증 체크리스트

### A. 시각적 검증 (Visual Testing)

#### Primary Button
- [ ] Normal 상태: 배경 검정, 텍스트 흰색, 마우스 포인터 표시
- [ ] Hover 상태: 배경 더 진해짐, 텍스트 흰색 유지
- [ ] Active 상태: 배경 매우 진함, 눌린 느낌
- [ ] Disabled 상태: 배경 밝은 회색, 텍스트 회색, 마우스 금지 표시
- [ ] Loading 상태: 회전하는 스피너, 클릭 불가

#### Secondary Button
- [ ] Normal 상태: 테두리만 표시, 배경 투명
- [ ] Hover 상태: 배경 밝은 회색
- [ ] Disabled 상태: 테두리 회색, 텍스트 회색

#### Tertiary Button
- [ ] Normal 상태: 텍스트만 표시
- [ ] Hover 상태: 배경 밝은 회색
- [ ] Disabled 상태: 텍스트 회색

#### Ghost Button (신규) ⭐
- [ ] Normal 상태: 흰색 배경, 회색 테두리 (1px)
- [ ] Hover 상태: 배경 밝은 회색, 테두리 유지
- [ ] Active 상태: 배경 더 진한 회색, 테두리 진함
- [ ] Disabled 상태: 불투명 테두리, 텍스트 회색
- [ ] Loading 상태: 배경 밝은 회색, 스피너 표시

---

### B. 크기 검증 (Size Testing)

#### Small (sm)
- [ ] Padding: 6px 12px (눈으로 확인)
- [ ] 폰트 사이즈: 13px (DevTools 확인)
- [ ] 아이콘 크기: 14px × 14px
- [ ] 높이: 약 28px (계산: 6+6 padding + 13px font + line-height)

#### Medium (md)
- [ ] Padding: 8px 16px
- [ ] 폰트 사이즈: 14px
- [ ] 아이콘 크기: 16px × 16px
- [ ] 높이: 약 36px

#### Large (lg)
- [ ] Padding: 12px 20px
- [ ] 폰트 사이즈: 15px
- [ ] 아이콘 크기: 18px × 18px
- [ ] 높이: 약 44px

---

### C. 아이콘 검증 (Icon Testing) ⭐

#### 위치 정렬
- [ ] iconLeft: 텍스트 좌측에 표시
- [ ] iconRight: 텍스트 우측에 표시
- [ ] 아이콘 없음: 텍스트만 표시

#### 간격 (Gap)
- [ ] sm: 아이콘-텍스트 간격 4px
- [ ] md: 아이콘-텍스트 간격 6px
- [ ] lg: 아이콘-텍스트 간격 8px
- [ ] DevTools에서 확인: `gap` 또는 `margin` 값

#### 정렬
- [ ] 아이콘과 텍스트: 세로 중앙 정렬 (`align-items: center`)
- [ ] 아이콘이 변형되지 않음 (aspect-ratio 유지)

---

### D. 로딩 상태 검증 (Loading Testing) ⭐

- [ ] loading=true일 때:
  - [ ] 버튼 클릭 불가 (onClick 실행 안 됨)
  - [ ] 스피너 애니메이션 표시
  - [ ] 애니메이션이 부드럽게 회전 (60fps)
  - [ ] 텍스트 숨겨짐 또는 불투명화
- [ ] loading=false일 때:
  - [ ] 스피너 사라짐
  - [ ] 버튼 클릭 가능
  - [ ] 텍스트 다시 표시

---

### E. 반응형 검증 (Responsive Testing)

#### 375px (모바일)
- [ ] 버튼 너비: 화면에 맞게 늘어남
- [ ] Padding 일관: 6px/8px/12px 유지
- [ ] 폰트 크기 일관: 13px/14px/15px 유지
- [ ] 터치 영역: 최소 44px × 44px (accessibility)

#### 768px (태블릿)
- [ ] Padding/폰트 동일 (375px와 동일)
- [ ] 레이아웃 일관성

#### 1024px+ (데스크톱)
- [ ] Padding/폰트 동일

---

### F. 색상 정확도 검증 (Color Testing) ⭐

#### DevTools 검사 (Browser DevTools → Inspect Element)

**Ghost Normal**:
- [ ] Background: `var(--color-bg-elevated)` 또는 계산값 #FFFFFF
- [ ] Border: `1px solid var(--color-border-default)` 또는 계산값 #E4E4E0
- [ ] Text: `var(--color-text-primary)` 또는 계산값 #1A1A18

**Ghost Hover**:
- [ ] Background: `var(--color-bg-sunken)` 또는 계산값 #EFEFED
- [ ] Border: 유지

**Ghost Disabled**:
- [ ] Text: `var(--color-text-tertiary)` 또는 계산값 #9B9B97
- [ ] Border: 불투명화 (opacity 40%)

#### Forbidden Patterns 확인
- [ ] ❌ `background: #FFFFFF` (변수 사용 금지)
- [ ] ❌ `border-color: rgba(228, 228, 224, 1)` (변수 사용 금지)
- [ ] ✅ `background: var(--color-bg-elevated)`
- [ ] ✅ `border-color: var(--color-border-default)`

---

### G. 성능 검증 (Performance Testing)

#### 클릭 응답성
- [ ] 마우스 클릭 → onClick 실행: < 50ms
- [ ] 지연 없음 (버튼 누름 즉시 반응)

#### 애니메이션 부드러움
- [ ] Hover 상태 전환: 부드러운 색상 변화
- [ ] Loading 스피너: 부드럽게 회전 (60fps)
- [ ] DevTools → Performance 탭에서 프레임 드롭 없음

---

### H. 접근성 검증 (Accessibility Testing)

#### ARIA 속성
- [ ] `type="button"` 또는 `type="submit"` 명시
- [ ] disabled 상태: `aria-disabled="true"`
- [ ] loading 상태: `aria-busy="true"`
- [ ] 아이콘만 있는 버튼: `aria-label` 또는 `title` 속성

#### 키보드 네비게이션
- [ ] Tab 키: 버튼에 포커스 이동
- [ ] Enter 키: 버튼 클릭
- [ ] Space 키: 버튼 클릭 (HTML spec)
- [ ] Disabled 상태: Tab으로 이동 불가

#### 스크린 리더 (선택사항)
- [ ] 버튼 텍스트가 제대로 읽혀짐
- [ ] Loading 상태가 공지됨

---

## 버그 보고 템플릿

발견된 버그마다 다음 형식으로 보고:

```
### 버그 #1: [간단한 제목]

**심각도**: Critical / High / Medium / Low

**조건**:
- Variant: primary / secondary / tertiary / ghost
- Size: sm / md / lg
- State: normal / hover / active / disabled / loading

**현상**:
[관찰된 문제 설명]

**기대 동작**:
[design-guide.md에서 정의한 예상 동작]

**증거**:
[DevTools 스크린샷 또는 재현 단계]

**해결 방안**:
[추측되는 원인 및 수정 방법]
```

---

## 검증 결과 저장

### test-report.md 포맷

```markdown
# Test Report: Button Component 확장

**테스터**: Tester Agent
**테스트 날짜**: [현재 날짜]
**환경**: Chrome/Firefox, 로컬 dev 서버

## 검증 결과

### A. 시각적 검증
- Primary Button: ✅ PASS
- Secondary Button: ✅ PASS
- Tertiary Button: ✅ PASS
- Ghost Button: ⚠️ PARTIAL (색상 오류 발견)
- Loading 상태: ✅ PASS

### B. 크기 검증
- Small: ✅ PASS
- Medium: ✅ PASS
- Large: ✅ PASS

### C. 아이콘 검증
- iconLeft: ✅ PASS
- iconRight: ✅ PASS
- 간격: ✅ PASS (6px 확인)

### D. 로딩 상태
- 애니메이션: ✅ PASS
- 클릭 불가: ✅ PASS

### E. 반응형
- 375px: ✅ PASS
- 768px: ✅ PASS
- 1024px: ✅ PASS

### F. 색상 정확도
- Ghost 배경: ⚠️ 색상 코드 확인 필요
- Ghost 테두리: ✅ PASS

### G. 성능
- 클릭 응답성: ✅ PASS (< 50ms)
- 애니메이션 fps: ✅ PASS (60fps)

### H. 접근성
- ARIA 속성: ✅ PASS
- 키보드 네비게이션: ✅ PASS

## 발견된 버그

### 버그 #1: Ghost Button 호버 색상 오류
**심각도**: Medium
**원인**: design-guide.md의 #EFEFED가 아닌 다른 색상 사용
**수정**: components/Button.tsx line 45에서 색상 토큰 확인

## 최종 결론

✅ **PASS WITH NOTES**: 대부분 통과, 1개 버그 수정 후 재검증 필요

---
```

---

## 최종 체크리스트

- [ ] 모든 시각적 상태 확인 완료
- [ ] 크기 padding/font-size 측정 완료
- [ ] 아이콘 정렬 및 간격 확인 완료
- [ ] 색상 정확도 DevTools로 검증 완료
- [ ] 반응형 375px/768px/1024px 테스트 완료
- [ ] 성능 (응답성, 애니메이션 fps) 확인 완료
- [ ] 접근성 (ARIA, 키보드) 검증 완료
- [ ] 발견된 버그 모두 문서화 완료
- [ ] test-report.md 작성 완료

---

## 다음 단계

✅ 이 카드의 모든 항목을 확인한 후:
1. test-report.md 생성
2. 버그가 있으면 Reviewer와 협업
3. Developer에게 피드백 전달
4. 재검증 수행
