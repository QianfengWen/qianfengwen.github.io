# Design: qianfengwen.github.io

Personal research website for Qianfeng Wen (incoming MSc CS, University of Toronto, CSS Lab).
Content source of truth: `assets/Qianfeng_Wen_CV.pdf` (resume, July 2026). Every fact and link
on the site is traceable to the resume or to a link embedded in it.

## Job of the page

One page, one job: convince a professor, admissions committee, or collaborator within
seconds that this is a productive, serious researcher, and route them to papers, CV,
and contact without friction.

## Concept: tournament board, journal page

Two materials from Qianfeng's actual research world drive every visual decision:

1. **The scientific journal.** Body text is set in STIX Two Text, the typeface family
   commissioned for scientific publishing (STIX = Scientific and Technical Information
   Exchange). Headings invert to a sans (Schibsted Grotesk), the same sans-display-over-
   serif-body structure used by Nature and Science. To an academic reader this page
   subconsciously reads as "a paper," which is the correct register.
2. **The tournament chessboard.** Qianfeng's forward-looking research line (ChessQA,
   Grounded Chess Reasoning, MSc with Ashton Anderson) uses chess as a grounded domain
   for LLM reasoning. Tournament boards are buff and deep green; that green is the site's
   single accent, and buff is the tag/chip fill. The signature element (below) is a
   knight's tour.

This also gives an honest answer to "why does it look like this" — nothing is themed for
decoration; the palette and signature encode what the research is about.

## Tokens

Typography (self-hosted variable woff2, latin subset):

| Role | Face | Usage |
|---|---|---|
| Display / headings / nav | Schibsted Grotesk (400–900) | Name, section titles, publication titles, buttons |
| Body | STIX Two Text (400–700 + italic) | Bio, author lists, descriptions |
| Meta | Spline Sans Mono (300–700) | Dates, venue chips, eyebrow labels, arXiv IDs |

Color:

| Token | Light | Dark | Meaning |
|---|---|---|---|
| paper | #FBFAF7 | #101411 | archival paper / night board |
| ink | #191C19 | #E7E4D8 | green-cast black / buff |
| muted | #5D635C | #9AA096 | secondary text |
| accent | #1E5A41 | #7BC49A | tournament board green / jade |
| buff | #EFEBDD | #1B231D | light-square buff, chip fills |
| hairline | #E3E2D9 | #232A24 | rules and borders |

Dark mode follows `prefers-color-scheme` with a manual toggle persisted to localStorage.

## Signature element

An animated **knight's tour** on an 8×8 dot grid: a thin trail showing the knight's last
nine moves, wandering the closed tour forever (a full tour drawn at once reads as a
tangle; the moving window always reads as one calm line). It lives in the hero's portrait
frame as the placeholder until a real photo is added (`assets/img/portrait.jpg`), and it
encodes three of Qianfeng's threads at once: chess reasoning, sequential decision-making
(MCTS), and search. The markup ships a static frame of the same animation, so no-JS and
`prefers-reduced-motion` visitors see a valid still. A 2×3
"knight move" mark (three dots joined by an L path) derived from it serves as the header
mark and favicon.

Boldness is spent here only. Everything else is quiet: no scroll-reveal effects, no
gradients, no cards with drop shadows. Hover states are underline and background shifts.

## Layout

Single page, anchored sections, max width 1080px, text measure ~68ch.

```
[ mark  Qianfeng Wen        About  News  Publications  Experience  Awards   theme ]
--------------------------------------------------------------------------------
|  MSC COMPUTER SCIENCE / UNIVERSITY OF TORONTO (mono eyebrow)   +----------+  |
|  Qianfeng Wen  (display, ~64px)                                | portrait |  |
|  2–3 sentence positioning statement, serif, inline links       |  frame / |  |
|  [Email] [Google Scholar] [GitHub] [LinkedIn] [CV (accent)]    |  knight  |  |
|                                                                +----------+  |
|  About: two short serif paragraphs (research threads, past labs)              |
|  News: mono date | serif entry (6 rows)                                       |
|  Publications: year rail | entries (title sans / authors serif, me bold,      |
|      * equal contribution legend / venue chip mono / Paper · Project · Code)  |
|  Experience: Research (3 labs) + Industry (3 roles), dates in mono rail       |
|  Awards & Service: year rail | award, grantor                                 |
|  Footer: email, links, last-updated, colophon (type + license note)           |
```

Publications are grouped by year (2026 / 2025 / 2024), newest first, all ten shown;
selected entries get no special treatment in v1 — the list is short enough to read whole.
Author names render "Qianfeng Wen" in a heavier weight; asterisks mark equal contribution
with a legend under the section title. Venue chips use friendly full names ("EMNLP 2025
Main Conference", "Under review at COLM 2026"), never raw abbreviation soup.

## Engineering constraints

- Pure static HTML/CSS/JS, zero build step, works with JavaScript disabled
  (JS adds only: theme toggle, knight-tour animation, scroll-spy). GitHub Pages ready
  (`.nojekyll`, repo name `qianfengwen.github.io`, push to `main`).
- Self-hosted fonts (no third-party requests, no CDN dependency).
- Semantic HTML with JSON-LD `Person` schema (`sameAs`: Scholar, GitHub, LinkedIn) for
  scholarly SEO; Open Graph and Twitter meta; `robots.txt` + `sitemap.xml`; print
  stylesheet; visible keyboard focus states; 404 page.
- Content edits never require touching CSS/JS: publications are clean repeating HTML
  blocks documented in the README.

## Anti-template checks

Rejected defaults: cream + terracotta serif look; near-black + acid green; broadsheet
hairline grid; Inter/Space Grotesk; numbered section markers (the content is not a
sequence); card grids with shadows; emoji icons (none anywhere, per owner preference).
The one ornament is justified by the research subject, not applied decoration.
