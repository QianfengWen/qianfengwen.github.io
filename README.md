# qianfengwen.github.io

Personal research website for Qianfeng Wen. Pure static HTML/CSS/JS: no build step,
no framework, no third-party requests (fonts are self-hosted). Design rationale lives
in [docs/design.md](docs/design.md).

## Deploy

1. Create a GitHub repository named exactly `qianfengwen.github.io` (under the
   `QianfengWen` account).
2. Push this repo to its `main` branch:

   ```sh
   git remote add origin git@github.com:QianfengWen/qianfengwen.github.io.git
   git push -u origin main
   ```

3. In the repository settings, under Pages, confirm the source is `main` / root.
   The site appears at <https://qianfengwen.github.io/> within a minute or two.

## Replace the photo

The hero photo is `assets/img/portrait.jpg` (819×1024, a 4:5 crop, metadata
stripped). To swap it: overwrite the file, keep the name, and update the
`width`/`height` attributes on the hero `<img>` if the dimensions change.
Aim for a roughly 4:5 portrait crop, 800×1000 px or larger. The knight's-tour
animation the photo replaced still lives in `js/main.js` and wakes up again if
an `<svg id="knight-tour">` is ever put back in the frame.

## Edit content

Everything is plain HTML in `index.html`; each section is marked with a
`<!-- ===== ... ===== -->` comment.

- **News**: copy an existing `<li>` inside `.news-list` and edit the date and text.
  Keep newest first.
- **Publications**: copy a `<li class="pub">` block inside the right year group
  (`.pub-year`) and edit the thumbnail, title, link, authors, venue chip, links,
  and BibTeX. Bold yourself with `<span class="me">Qianfeng Wen</span>`; mark equal
  contribution with `*` after the closing tag. Use `class="venue"` for published
  venues, `class="venue preprint"` for preprints and papers under review, and add
  `<span class="venue-flag">Oral</span>` for orals, best-paper awards, and similar.
- **Publication figures**: each entry shows `assets/img/pubs/<slug>.webp` (600×400),
  a gpt-image-2 redrawing of the paper's method figure in the site palette: about
  80% faithful method diagram, 20% house style. The locked style prompt, every
  scene prompt, and the generation workflow live in
  [docs/figure-prompts.md](docs/figure-prompts.md); add a scene there when adding
  a paper.

- **BibTeX**: paste the official entry (arXiv's "Export BibTeX" or the ACL
  Anthology `.bib`) into the `<pre>` inside each entry's `<details class="bibtex">`.
- **CV**: replace `assets/Qianfeng_Wen_CV.pdf` with the new file (same name, no
  HTML edits needed), and update the "Last updated" line in the footer.

After editing, commit and push; GitHub Pages redeploys automatically.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

## Files

| Path | Purpose |
|---|---|
| `index.html` | The whole site: content and structure |
| `css/main.css` | Design tokens (light/dark), layout, components, print styles |
| `js/main.js` | Theme toggle, scroll-spy, knight's tour animation (all optional enhancements) |
| `assets/fonts/` | Self-hosted woff2 fonts and `@font-face` rules |
| `assets/img/` | Favicon, Open Graph card, publication thumbnails (`pubs/`) |
| `assets/Qianfeng_Wen_CV.pdf` | CV served by the "Download CV" button |
| `docs/design.md` | Design decisions and their rationale |
| `docs/figure-prompts.md` | Style and scene prompts for the publication figures |
| `404.html` | Not-found page served by GitHub Pages |
