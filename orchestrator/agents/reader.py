"""Reader Agent - Code Analysis & Team Planning."""
import os
from pathlib import Path
from .base import BaseAgent


class ReaderAgent(BaseAgent):
    """Reader analyzes code and creates team task cards."""

    def __init__(self):
        """Initialize Reader agent with Opus 4.6."""
        system_prompt = """You are a senior architect analyzing a React/Next.js codebase.

Your task:
1. Analyze the provided code files and design system
2. Review CLAUDE.md compliance (colors.md, spacing.md, typography.md, forbidden.md)
3. Create 4 detailed team cards for Designer/Developer/Tester/Reviewer
4. Ensure cards have clear, actionable instructions

Output ONLY markdown files in structured format, following the exact templates provided."""

        super().__init__(
            name="Reader",
            model="claude-opus-4-6",
            system_prompt=system_prompt
        )

    def analyze_codebase(self) -> str:
        """Analyze the existing codebase and design system rules."""
        base_dir = Path(__file__).parent.parent.parent

        # Read key files
        files_to_read = {
            "FestivalCard.tsx": base_dir / "components" / "FestivalCard.tsx",
            "ExploreClient.tsx": base_dir / "components" / "ExploreClient.tsx",
            "globals.css": base_dir / "app" / "globals.css",
            "colors.md": base_dir / ".claude" / "rules" / "colors.md",
            "spacing.md": base_dir / ".claude" / "rules" / "spacing.md",
            "typography.md": base_dir / ".claude" / "rules" / "typography.md",
            "forbidden.md": base_dir / ".claude" / "rules" / "forbidden.md",
        }

        analysis = "## Codebase Analysis\n\n"

        for file_label, file_path in files_to_read.items():
            if file_path.exists():
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Limit content to avoid token explosion
                        if len(content) > 2000:
                            content = content[:2000] + "\n... (truncated)"
                        analysis += f"### {file_label}\n```\n{content}\n```\n\n"
                except Exception as e:
                    analysis += f"### {file_label}\n❌ Error reading: {e}\n\n"
            else:
                analysis += f"### {file_label}\n⚠️ File not found\n\n"

        return analysis

    def run(self, input_data=None) -> str:
        """Execute Reader analysis and generate team cards."""
        print(f"🔍 {self.name} Agent: Starting code analysis...")

        # Analyze codebase
        codebase_analysis = self.analyze_codebase()

        # Send to Claude for analysis
        analysis_prompt = f"""Analyze the following codebase and design system rules for implementing a Button component:

{codebase_analysis}

Task:
1. Review the design system (colors, spacing, typography, forbidden patterns)
2. Understand existing component patterns (FestivalCard, ExploreClient)
3. Plan Button component expansion with:
   - Ghost variant (new)
   - Icon support (iconLeft, iconRight)
   - 3 sizes (sm, md, lg)
   - Loading state

Provide a brief analysis of:
- Current design system compliance level
- Component pattern consistency
- Recommendations for Button implementation"""

        analysis_response = self.send_message(analysis_prompt)

        # Save analysis report
        self.save_output("ANALYSIS.md", analysis_response)

        # Generate team cards
        self._generate_designer_card()
        self._generate_developer_card()
        self._generate_tester_card()
        self._generate_reviewer_card()

        print(f"✅ {self.name} Agent: Analysis complete!")
        return analysis_response

    def _generate_designer_card(self) -> None:
        """Generate CARD_designer.md with design requirements."""
        card_prompt = """Create a detailed Design Guide card for the Designer role.

The Designer should create style specifications for Button component expansion:
- Ghost variant (transparent bg, border, different hover)
- Icon integration (left/right alignment)
- 3 sizes (sm/md/lg) with specific padding/font sizes
- All visual states (normal, hover, active, disabled, loading)

Format as markdown following this structure:
# Design Guide: Button Component 확장

## 요구사항
- Ghost variant 추가
- 아이콘 지원 (left/right)
- 3가지 크기 (sm/md/lg)

## 색상 규칙 (globals.css @theme inline 기준)
[Specify exact color tokens for each variant and state]

## 타이포그래피
[Specify exact typography classes and sizes]

## 간격
[Specify exact padding and gap values using design system tokens]

## 상태 시각
[Table showing normal, hover, active, disabled, loading states]

## 반응형
[Responsive behavior details]

---"""

        card_content = self.send_message(card_prompt)
        self.save_output("CARD_designer.md", card_content)

    def _generate_developer_card(self) -> None:
        """Generate CARD_developer.md with implementation requirements."""
        card_prompt = """Create a detailed Implementation card for the Developer role.

The Developer should implement Button component with:
- Props interface (variant, size, iconLeft, iconRight, loading, disabled, children)
- Ghost variant styling
- Icon positioning and spacing
- TypeScript types
- CSS variables only (no RGB/rgba)
- Framer Motion for loading animation

Format as markdown following this structure:
# Implementation: Button Component 확장

## 입력 (Designer 완료 후)
- design-guide.md (색상, 타이포, 간격 명시)

## 구현 체크리스트

### Props 정의
[Show TypeScript interface]

### 구현 영역
1. **Ghost Variant** - transparent bg, border, hover changes
2. **아이콘 지원** - props, spacing, alignment
3. **크기 변수화** - CSS variables for sm/md/lg
4. **로딩 상태** - Framer Motion animation
5. **TypeScript** - Complete typing

### Forbidden Patterns 체크
- ❌ style={{ color: '#xxx' }}
- ❌ rgba() 직접 사용
- ❌ font-weight 600/700
- ✅ 모두 CSS 변수로

---"""

        card_content = self.send_message(card_prompt)
        self.save_output("CARD_developer.md", card_content)

    def _generate_tester_card(self) -> None:
        """Generate CARD_tester.md with test requirements."""
        card_prompt = """Create a detailed Testing card for the Tester role.

The Tester should verify Button component:
- Visual accuracy (all variants, sizes, states)
- Icon alignment and spacing
- Responsive behavior
- Design system compliance
- Performance and animation smoothness

Format as markdown following this structure:
# Testing: Button Component 확장

## 검증 체크리스트

### 시각적 검증
- [ ] Primary variant 4가지 상태 (normal/hover/active/disabled)
- [ ] Secondary variant 4가지 상태
- [ ] Tertiary variant 4가지 상태
- [ ] Ghost variant 4가지 상태 ← NEW
- [ ] Loading 스피너 애니메이션

### 크기 검증
- [ ] sm: padding 6px 12px, 폰트 13px
- [ ] md: padding 8px 16px, 폰트 14px
- [ ] lg: padding 12px 20px, 폰트 15px

### 아이콘 검증
- [ ] iconLeft 정렬
- [ ] iconRight 정렬
- [ ] Icon-text spacing
- [ ] Icon sizes by variant
- [ ] Text-only display without icons

### 반응형 검증
- [ ] 375px (모바일)
- [ ] 768px (태블릿)
- [ ] 1024px (데스크톱)

### 색상 정확도
- [ ] Ghost border color
- [ ] Ghost hover background
- [ ] All text colors use tokens (no RGB)

### 성능
- [ ] Click responsiveness < 50ms
- [ ] Loading animation smooth (60fps)

---"""

        card_content = self.send_message(card_prompt)
        self.save_output("CARD_tester.md", card_content)

    def _generate_reviewer_card(self) -> None:
        """Generate CARD_reviewer.md with code review criteria."""
        card_prompt = """Create a detailed Code Review card for the Reviewer role.

The Reviewer should check:
- TypeScript type completeness
- Forbidden patterns (RGB, font-weight, etc)
- ARIA accessibility attributes
- Reusability and pattern consistency
- Design system full compliance

Format as markdown following this structure:
# Code Review: Button Component 확장

## 리뷰 기준

### TypeScript 타입 완전성
- [ ] ButtonProps interface 정의 완전
- [ ] variant/size 타입 일치
- [ ] iconLeft/iconRight 타입
- [ ] 반환 타입 명시

### 재사용성
- [ ] 다른 컴포넌트에서 import 가능
- [ ] 페이지(Explore, Calendar, Magazine)에서 사용 가능
- [ ] 크기/색상 확장 가능

### Forbidden Patterns 완전 준수
- [ ] 모든 색상 --color-* 변수
- [ ] font-weight 400/500만
- [ ] border/shadow 중복 없음
- [ ] className에 임의 값 없음

### 접근성 (ARIA)
- [ ] aria-disabled="true" (disabled state)
- [ ] aria-busy="true" (loading state)
- [ ] type="button" 명시
- [ ] aria-label (필요시)

### 기존 코드 일관성
- [ ] components/ 내 다른 파일과 스타일 일관
- [ ] 클래스명 네이밍 규칙 준수
- [ ] import/export 패턴 일관

### 최종 결정
- [ ] APPROVED → merge 진행
- [ ] CHANGES_REQUESTED → 수정 필요
- [ ] COMMENT → 논의 필요

---"""

        card_content = self.send_message(card_prompt)
        self.save_output("CARD_reviewer.md", card_content)
