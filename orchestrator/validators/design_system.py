"""Design System Validator - Auto-check CLAUDE.md compliance."""
import re
from typing import List, Dict, Tuple


class DesignSystemValidator:
    """Validates code against Festivo design system rules."""

    # Valid color tokens from globals.css
    VALID_COLOR_TOKENS = {
        '--color-bg-base',
        '--color-bg-elevated',
        '--color-bg-sunken',
        '--color-bg-accent',
        '--color-bg-glass',
        '--color-text-primary',
        '--color-text-secondary',
        '--color-text-tertiary',
        '--color-text-on-dark',
        '--color-text-on-dark-secondary',
        '--color-text-on-dark-tertiary',
        '--color-border-default',
        '--color-border-strong',
        '--color-border-on-dark',
        '--color-accent',
        '--color-status-error',
    }

    # Valid spacing tokens
    VALID_SPACING_TOKENS = {
        '--space-xs',   # 4px
        '--space-sm',   # 8px
        '--space-md',   # 16px
        '--space-lg',   # 32px
        '--space-xl',   # 64px
        '--space-2xl',  # 96px
    }

    # Valid typography classes
    VALID_TEXT_CLASSES = {
        'text-display',
        'text-title',
        'text-title-sm',
        'text-heading',
        'text-subheading',
        'text-card-title',
        'text-body',
        'text-body-sm',
        'text-control',
        'text-label',
        'text-caption',
    }

    # Forbidden patterns
    FORBIDDEN_PATTERNS = [
        (r'style=\{\{[^}]*color:[^}]*\}\}', 'Inline color style - use CSS variables'),
        (r'rgba\([^)]*\)', 'Direct rgba() - use CSS variables'),
        (r'rgb\([^)]*\)', 'Direct rgb() - use CSS variables'),
        (r'#[0-9A-Fa-f]{3,6}(?!["\'])', 'Direct hex color - use CSS variables'),
        (r'font-weight:\s*[67]', 'font-weight 600/700 - use 400/500 only'),
        (r'font-weight:\s*bold', 'font-weight bold - use 400/500 only'),
        (r'!important(?!\s*/)', '!important usage - use specific selectors'),
    ]

    @classmethod
    def validate_colors(cls, code: str) -> Tuple[bool, List[str]]:
        """Check if code uses only valid color tokens.

        Returns:
            Tuple of (is_valid, error_messages)
        """
        errors = []

        # Check for forbidden direct color specifications
        for pattern, description in [
            (r'style=\{\{[^}]*color:[^}]*\}\}', 'Inline color style'),
            (r'rgba\([^)]*\)', 'Direct rgba()'),
            (r'rgb\([^)]*\)', 'Direct rgb()'),
        ]:
            if re.search(pattern, code):
                errors.append(f"❌ {description}")

        return len(errors) == 0, errors

    @classmethod
    def validate_spacing(cls, code: str) -> Tuple[bool, List[str]]:
        """Check if code uses only valid spacing tokens.

        Returns:
            Tuple of (is_valid, error_messages)
        """
        errors = []

        # Check for hardcoded spacing values that should be variables
        suspicious_values = r'(?:padding|margin|gap|width|height):\s*(?!var\()\d+px'
        matches = re.findall(suspicious_values, code)

        if matches:
            # Check if these are in valid token values
            valid_px = {'4px', '8px', '16px', '24px', '32px', '48px', '64px', '96px'}
            for match in matches:
                value = re.search(r'\d+px', match)
                if value and value.group() not in valid_px:
                    errors.append(f"⚠️ Non-standard spacing: {match}")

        return len(errors) == 0, errors

    @classmethod
    def validate_typography(cls, code: str) -> Tuple[bool, List[str]]:
        """Check if code uses only valid typography classes and weights.

        Returns:
            Tuple of (is_valid, error_messages)
        """
        errors = []

        # Check font-weight
        weight_pattern = r'font-weight:\s*[67]|font-weight:\s*bold'
        if re.search(weight_pattern, code):
            errors.append("❌ font-weight 600/700 - use 400/500 only")

        # Check for valid text classes usage
        # This is more permissive - we just warn about direct styles
        if 'fontSize:' in code or 'fontWeight:' in code:
            errors.append("⚠️ Direct font styles - consider using .text-* classes")

        return len(errors) == 0, errors

    @classmethod
    def validate_forbidden_patterns(cls, code: str) -> Tuple[bool, List[str]]:
        """Check for all forbidden patterns.

        Returns:
            Tuple of (is_valid, error_messages)
        """
        errors = []

        for pattern, description in cls.FORBIDDEN_PATTERNS:
            if re.search(pattern, code):
                errors.append(f"❌ {description}")

        return len(errors) == 0, errors

    @classmethod
    def validate_aria(cls, code: str) -> Tuple[bool, List[str]]:
        """Check for ARIA attributes in interactive elements.

        Returns:
            Tuple of (is_valid, warnings)
        """
        warnings = []

        # Check if button has type attribute
        if 'button' in code.lower() and 'type=' not in code:
            warnings.append("⚠️ Consider adding type='button' to button elements")

        # Check for disabled state handling
        if 'disabled' in code and 'aria-disabled' not in code:
            warnings.append("⚠️ Consider adding aria-disabled for disabled state")

        # Check for loading state
        if 'loading' in code and 'aria-busy' not in code:
            warnings.append("⚠️ Consider adding aria-busy for loading state")

        return len(warnings) == 0, warnings

    @classmethod
    def validate_all(cls, code: str) -> Dict[str, Tuple[bool, List[str]]]:
        """Run all validations.

        Returns:
            Dictionary with validation results
        """
        return {
            'colors': cls.validate_colors(code),
            'spacing': cls.validate_spacing(code),
            'typography': cls.validate_typography(code),
            'forbidden': cls.validate_forbidden_patterns(code),
            'aria': cls.validate_aria(code),
        }

    @classmethod
    def generate_report(cls, code: str, filename: str = "") -> str:
        """Generate validation report.

        Returns:
            Markdown-formatted validation report
        """
        results = cls.validate_all(code)

        report = f"# 자동 검증 결과\n\n"
        if filename:
            report += f"**파일**: {filename}\n\n"

        all_pass = True

        for check_name, (is_valid, messages) in results.items():
            if is_valid:
                report += f"✅ {check_name}: PASS\n"
            else:
                report += f"❌ {check_name}: FAIL\n"
                for msg in messages:
                    report += f"  {msg}\n"
                all_pass = False

        report += f"\n---\n\n"
        if all_pass:
            report += "🎉 **최종**: ✅ PASS - 모든 검증 통과\n"
        else:
            report += "⚠️ **최종**: ⚠️ ISSUES FOUND - 수정 필요\n"

        return report
