# Design: qianfengwen.github.io

Personal research website for Qianfeng Wen (incoming MSc CS, University of Toronto, CSS Lab).
Content source of truth: `assets/Qianfeng_Wen_CV.pdf` (resume, July 2026). Every fact and link
on the site is traceable to the resume or to a link embedded in it.

## Job of the page

One page, one job: convince a professor, admissions committee, or collaborator within
seconds that this is a productive, serious researcher, and route them to papers, CV,
and contact without friction.

## Concept: journal page, field notes

Qianfeng's research identity is LLM post-training (reinforcement learning, on-policy
distillation, self-refinement), language-model agents, and LLMs for recommendation and
information retrieval. Chess appears in the work only as a fully verifiable evaluation
domain — the site treats it that way and never leads with it.

Two materials drive every visual decision:

1. **The scientific journal.** Body text is set in STIX Two Text, the typeface family
   commissioned for scientific publishing (STIX = Scientific and Technical Information
   Exchange). Headings invert to a sans (Schibsted Grotesk), the same sans-display-over-
   serif-body structure used by Nature and Science. To an academic reader this page
   subconsciously reads as "a paper," which is the correct register.
2. **The researcher's notebook.** Deep study-green ink on warm archival paper, with buff
   fills for tags and chips — the palette of ledgers, field notes, and library lamps.
   Diagrams are drawn in that same ink: the hero's agent trail, the three research-thread
   figures, and the matched set of illustrated paper teasers.

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
| paper | #FBFAF7 | #101411 | archival paper / night ink |
| ink | #191C19 | #E7E4D8 | green-cast black / buff |
| muted | #5D635C | #9AA096 | secondary text |
| accent | #1E5A41 | #7BC49A | study green / jade |
| buff | #EFEBDD | #1B231D | warm buff, chip fills |
| hairline | #E3E2D9 | #232A24 | rules and borders |

Dark mode follows `prefers-color-scheme` with a manual toggle persisted to localStorage.

## Signature element

An **agent exploring a grid world**: on an 8×8 dot lattice, a comet trail of the agent's
last nine moves wanders forever (the trail is a precomputed closed walk, so the animation
loops seamlessly; a full walk drawn at once reads as a tangle, while the moving window
always reads as one calm line). It served as the hero's portrait placeholder until the
real photo landed there (`assets/img/portrait.jpg`, a high-resolution personal
headshot). The animation code stays dormant in `js/main.js` and reactivates if an
`<svg id="knight-tour">` is put back; its language survives in the header mark, favicon,
and research-thread figures.

## Figures and icons

- **Research threads**: three hand-drawn SVG figures in the site ink — a training curve
  (post-training), a model-environment loop (agents), and a query branching into a ranked
  list (recommendation and retrieval).
- **Paper teasers**: a matched set of flat editorial illustrations, one per paper,
  generated with gpt-image-2 under a single locked style prompt (bottle-green ink,
  jade/buff fills, warm paper ground, no text) and reviewed individually. Consistency of
  the set is the point — mixed styles read as clip art.
- **Contact and UI icons**: monoline SVGs drawn in currentColor (download, envelope,
  mortarboard, code brackets, badge), always paired with text labels; no brand glyph
  rows. A small step mark (two dots joined by an L path — one move on the grid) serves
  as the header mark and favicon.

Boldness is spent here only. Everything else is quiet: no scroll-reveal effects, no
gradients, no cards with drop shadows. Hover states are underline and background shifts.

## Layout

Single page, anchored sections, max width 1080px, text measure ~68ch.

```
[ mark  Qianfeng Wen   About Research News Publications Experience Awards  theme ]
--------------------------------------------------------------------------------
|  COMPUTER SCIENCE / UNIVERSITY OF TORONTO (mono eyebrow)       +----------+  |
|  Qianfeng Wen  (display, ~64px)                                | portrait |  |
|  Positioning statement, serif, inline links                    |  frame:  |  |
|  [topic chips: post-training, OPD, agents, recsys, IR]         |  photo   |  |
|  [CV (accent)] [Email] [Scholar] [GitHub] [LinkedIn] w/ icons  |          |  |
|                                                                +----------+  |
|  About: two short serif paragraphs + Currently/Previously rail                |
|  Research: three framed thread panels, SVG figure + blurb + paper links       |
|  News: mono date | serif entry                                                |
|  Publications: year rail | teaser image | venue eyebrow / title / authors /   |
|      links / BibTeX accordion (* equal contribution legend in section head)   |
|  Experience: Education + Research (3 labs) + Industry (3 roles)               |
|  Awards & Service: year rail | award, grantor                                 |
|  Footer: email, links, last-updated, colophon (type + license note)           |
```

Publications are grouped by year (2026 / 2025 / 2024), newest first, all ten shown;
selected entries get no special treatment in v1 — the list is short enough to read whole,
and a duplicated "selected" block over a ten-entry list would mostly repeat it.
Author names render "Qianfeng Wen" in a heavier weight; asterisks mark equal contribution
with a legend under the section title. Venue chips use friendly full names ("EMNLP 2025
Main Conference", "Under review at COLM 2026"), never raw abbreviation soup; orals get
an accent-tinted flag chip.

Each entry carries an illustrated teaser (webp, 600×400, 3:2) linked to the paper — per
a survey of twelve professional researcher sites, teaser images are the single strongest
upgrade over a text-only list; a matched illustration set (see Figures and icons) reads
hand-crafted where mixed styles would read as clip art. Every entry also exposes official
BibTeX (arXiv / ACL Anthology exports; a minimal constructed entry for the IEEE paper) in
a native `<details>` accordion — no JavaScript involved.

### Survey reconciliation (July 2026)

A parallel survey of well-regarded researcher sites (Barron, Karpathy, Weng, Olah,
Liang, Finn, Chen, Rush, Min, and strong PhD-student sites) confirmed the core choices:
info-dense above-the-fold hero (no splash), single column near 700–900px text measure,
warm off-white + near-black + one accent, intentional non-default type pairing, dark
mode, text-label social links, no al-folio tells (circular photo, icon rows, citation
badges). Adopted from the survey: per-paper thumbnails, BibTeX per entry, accent oral
flags. Consciously departed: no duplicated "selected publications" block (list is only
ten entries), and no hover GIF swaps (no animated teasers exist yet; slot fits later).

## Engineering constraints

- Pure static HTML/CSS/JS, zero build step, works with JavaScript disabled
  (JS adds only: theme toggle, agent-trail animation, scroll-spy). GitHub Pages ready
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
