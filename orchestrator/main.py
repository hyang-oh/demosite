#!/usr/bin/env python3
"""Festivo Team Orchestrator - Run Reader Agent for initial analysis."""
import sys
import asyncio
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from agents.reader import ReaderAgent


async def run_reader_phase():
    """Phase 1: Run Reader Agent for analysis and team planning."""
    print("=" * 60)
    print("🚀 FESTIVO TEAM ORCHESTRATOR - Phase 1: Reader Agent")
    print("=" * 60)
    print()

    try:
        reader = ReaderAgent()
        result = reader.run()

        print()
        print("=" * 60)
        print("✅ Phase 1 Complete!")
        print("=" * 60)
        print()
        print("📋 Generated files:")
        output_dir = Path(__file__).parent / "output"
        if output_dir.exists():
            for file in sorted(output_dir.glob("CARD_*.md")):
                print(f"  ✓ {file.name}")
            analysis_file = output_dir / "ANALYSIS.md"
            if analysis_file.exists():
                print(f"  ✓ {analysis_file.name}")

        print()
        print("Next steps:")
        print("  1. Review CARD_designer.md and design-guide.md")
        print("  2. Review CARD_developer.md for implementation details")
        print("  3. Review CARD_tester.md and CARD_reviewer.md")
        print("  4. Run Designer Agent (Phase 2)")
        print()

        return True

    except Exception as e:
        print(f"❌ Error during Reader phase: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Main orchestrator entry point."""
    print()
    print("📊 Festivo Button Component - Team Orchestration")
    print()

    # Run Phase 1: Reader
    success = asyncio.run(run_reader_phase())

    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
