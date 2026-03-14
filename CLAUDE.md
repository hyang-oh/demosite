# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Festivo — 세계 축제 큐레이션 라이프스타일 가이드. 에디토리얼 매거진 감성.
여행 예약 플랫폼이 아님. 커머스 UI 금지.

**레퍼런스**: afar.com, monocle.com, kinfolk.com (이미지 톤·여백감), linear.app (타이포·간격)

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@theme inline` in globals.css)
- Framer Motion (애니메이션)
- next/font/google (Cormorant Garamond + DM Sans)
- Vercel 자동 배포

## Commands

```bash
npm run dev    # 로컬 개발 서버
npm run build  # 프로덕션 빌드
```

## Design System

디자인 토큰은 `app/globals.css`의 `@theme inline` 블록에 정의.
상세 규칙은 `.claude/rules/` 참조:

- `typography.md` — 서체, 스케일, weight 규칙
- `colors.md` — 컬러 토큰, on-dark, 사용 규칙
- `components.md` — 카드, 필터, 섹션 헤더 패턴
- `spacing.md` — 4px 그리드, 레이아웃 규칙
- `forbidden.md` — 금지 패턴 목록
