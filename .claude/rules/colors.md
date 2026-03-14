# Color Rules

## 토큰 (globals.css `@theme inline`)

### Background
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-bg-base` | #F7F7F5 | 페이지 배경 |
| `--color-bg-elevated` | #FFFFFF | 카드·패널·모달 |
| `--color-bg-sunken` | #EFEFED | 입력 배경, 맵 영역 |
| `--color-bg-accent` | #E8E6E1 | 컬러 섹션 배경 (Spring Festivals 등) |
| `--color-bg-glass` | rgba(255,255,255,0.97) | 스티키 헤더 (Calendar) |

### Text
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-text-primary` | #1A1A18 | 제목, 본문 |
| `--color-text-secondary` | #6B6B68 | 서브텍스트, 설명 |
| `--color-text-tertiary` | #9B9B97 | 수퍼라벨, 메타데이터 |

### Text on Dark (이미지 오버레이, 다크 배경)
| 토큰 | 값 |
|------|-----|
| `--color-text-on-dark` | #FFFFFF |
| `--color-text-on-dark-secondary` | rgba(255,255,255,0.6) |
| `--color-text-on-dark-tertiary` | rgba(255,255,255,0.4) |

### Border
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-border-default` | #E4E4E0 | 기본 구분선 |
| `--color-border-strong` | #D4D4CF | 강조 구분선, 스크롤바 |
| `--color-border-on-dark` | rgba(255,255,255,0.15) | 다크 배경 위 구분선 |

### 기타
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-accent` | #1A1A18 | 모노톤 액센트 |
| `--color-status-error` | #dc2626 | 에러 상태 |

### Shadow
| 토큰 | 용도 |
|------|------|
| `--shadow-sm` | 드롭다운 그림자 |
| `--shadow-ring` | 포커스/활성 링 |

## 규칙

- **모든 색상은 CSS 변수로.** `#hex`, `rgba()` 직접 사용 금지
- 새 색상이 필요하면 globals.css에 토큰 추가 후 사용
- 모노톤 유지 — 브랜드 컬러, 그라데이션 금지
