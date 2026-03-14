# Forbidden Patterns

## 절대 금지

| 패턴 | 이유 | 대안 |
|------|------|------|
| `style={{ color: '#xxx' }}` | 토큰 이탈 | CSS 변수 사용 |
| `rgba()` 직접 사용 | 토큰 이탈 | globals.css에 토큰 추가 |
| font-weight 600, 700 | 과하게 굵음 | 400, 500만 사용 |
| 카드 border + box-shadow | 무거운 느낌 | 탈박스, hover는 이미지 scale만 |
| 별점(★), 리뷰 숫자 | 커머스 UI | 제거 |
| 배지 (에디터 추천 등) | 불필요한 레이어 | 제거 |
| 히어로 배경 이미지 + 검색폼 | 예약 사이트 느낌 | 단색 배경 + display 타이포 |
| "How it works" 단계 | SaaS 클리셰 | 제거 |
| 통계 숫자 (120+ Countries) | 랜딩 클리셰 | 제거 |
| 브랜드 컬러, 그라데이션 | 모노톤 위반 | `--color-accent` 사용 |
| Google Fonts CDN `<link>` | 최적화 누락 | `next/font/google` 사용 |
| CSS animation | 통일성 위반 | Framer Motion 사용 |
| `!important` (유틸리티 제외) | 스타일 충돌 | 구체적 선택자 사용 |
