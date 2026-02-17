# Web Typography Skill for Claude Code

A skill that equips [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with professional typographic principles for the web, enabling it to produce well-set, readable, and aesthetically considered HTML and CSS.

## What It Does

When this skill is active, Claude Code will apply time-tested typographic best practices whenever it writes or reviews CSS/HTML involving readable text — body copy, articles, documentation, blogs, email templates, or prose-heavy UI.

**Coverage includes:**

- Measure (line length) constrained to 45–75 characters
- Modular type scales for harmonious size relationships
- Vertical rhythm aligned to a baseline grid
- Proper letterspacing for capitals and small caps
- Old-style vs. lining numeral selection
- Hyphenation and justification rules
- Micro-typographic details (curly quotes, dashes, ligatures, hanging punctuation)
- A complete production-ready starter stylesheet
- A 15-point typographic quality checklist

## Installation

### Option 1 — Global skill (available in all projects)

```bash
# Clone the repository
git clone https://github.com/thatjonwilliams/web-typography.git

# Copy into your global Claude Code skills directory
cp -r web-typography ~/.claude/skills/web-typography
```

### Option 2 — Project-local skill (scoped to a single repo)

```bash
# From within your project root
mkdir -p .claude/skills
cp -r /path/to/web-typography .claude/skills/web-typography
```

### Option 3 — Upload via Claude.ai

1. Download this repository as a ZIP.
2. Go to **Settings → Capabilities → Skills**.
3. Upload the ZIP file.

### Option 4 — Claude Code CLI

```bash
# From a local clone
/plugin add /path/to/web-typography
```

Once installed, Claude will detect the skill automatically whenever a task involves web typography.

## Usage

The skill activates automatically when Claude Code encounters tasks involving web typography — styling body text, creating article layouts, reviewing CSS for readability, or building documentation sites.

You can also reference it explicitly:

> "Apply the web-typography skill to style this blog template."

## Attribution & Acknowledgements

This skill synthesises and adapts typographic guidance from the following sources. **It is a derivative work and does not reproduce original text verbatim.** The principles, rules, and recommendations have been re-expressed as actionable instructions and CSS implementations for use by an AI coding assistant.

### Primary Sources

#### *The Elements of Typographic Style Applied to the Web*

- **Author:** [Richard Rutter](https://clagnut.com/)
- **Website:** [webtypography.net](https://webtypography.net)
- **License:** [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)
- **Source code:** [github.com/clagnut/webtypography](https://github.com/clagnut/webtypography)

Per the terms of CC BY-NC 4.0, this derivative work provides attribution to the original author and indicates that changes were made. The original work's guidance has been restructured, condensed, and supplemented with modern CSS techniques for use as an AI skill file.

#### *The Elements of Typographic Style*

- **Author:** Robert Bringhurst
- **Publisher:** Hartley & Marks Publishers
- **ISBN:** 978-0-88179-212-6

Richard Rutter's website is itself an adaptation of Bringhurst's foundational typography reference. The typographic principles referenced in this skill — such as the ideal measure of 66 characters, the traditional type scale, and rules for letterspacing capitals — originate from Bringhurst's work and are widely considered standard typographic knowledge.

### Supplementary Sources

- [U.S. Web Design System (USWDS) — Typography](https://designsystem.digital.gov/components/typography/) · Public domain
- [CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/) · W3C
- [CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/) · W3C

### Richard Rutter's Book

For a comprehensive, extended treatment of web typography beyond what this skill covers, see:

- **Title:** *Web Typography*
- **Author:** Richard Rutter
- **Website:** [book.webtypography.net](https://book.webtypography.net)
- **ISBN:** 978-0-9956642-0-3

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/), consistent with the license of the primary source material from webtypography.net.

### What this means

- ✅ **Share** — You may copy and redistribute this material in any medium or format.
- ✅ **Adapt** — You may remix, transform, and build upon this material.
- ❌ **NonCommercial** — You may not use this material for commercial purposes.
- ℹ️ **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

If you wish to use this skill in a commercial context, you should seek permission from [Richard Rutter](https://clagnut.com/) regarding the webtypography.net-derived content.

## Contributing

Contributions are welcome. If you'd like to improve the skill — adding new typographic rules, updating CSS techniques, or fixing errors — please open a pull request.

When contributing, please:

1. Ensure any new typographic guidance is well-sourced and attributed.
2. Keep CSS examples modern and practical.
3. Test that recommendations work across current browsers.

## Disclaimer

This skill provides typographic guidance for web development. It is a tool for an AI coding assistant, not a substitute for professional typographic judgement. The authors of the original source materials are not affiliated with this project.

---

*Made with reference to five centuries of typographic tradition and the generous open-source contributions of the web typography community.*
