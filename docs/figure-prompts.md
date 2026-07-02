# Publication figure prompts

The publication figures (`assets/img/pubs/<slug>.webp`, 600×400) are generated with
gpt-image-2 at 1536×1024 and downscaled. Each is a redrawing of the paper's actual
method figure: roughly 80% faithful method diagram, 20% house style. Researchers
should recognize the paper from the figure alone.

## Workflow

Generate through Codex non-interactively; its sandboxed shell cannot write files
here, so harvest the PNG from Codex's image store afterwards:

```sh
codex exec --skip-git-repo-check -s workspace-write \
  "Generate one image with your image generation tool: model gpt-image-2, landscape
   1536x1024, high quality. Do not run any shell commands. Call the image tool
   exactly once, then reply done. Image description: <SCENE> <STYLE>"
# then copy the newest ~/.codex/generated_images/<session>/ig_*.png and:
convert ig_*.png -filter Lanczos -resize 600x400 -quality 86 assets/img/pubs/<slug>.webp
```

## Locked style suffix (append to every scene)

> Flat minimal research-journal figure style: warm off-white paper background, all
> linework in deep bottle green, fills only in muted jade green and warm buff tints,
> thin precise strokes, no gradients, no shadows, no photorealism, generous margins,
> landscape composition.

## Scene prompts

- **thinktwice** — A clean research-paper method figure: two rounded rectangular
  stages side by side, the left stage labeled 'Solve' showing a small scribbled
  draft answer, the right stage labeled 'Refine' showing the same answer redrawn
  clean and correct; a bold arrow flows from Solve to Refine, and a circular loop
  arrow returns underneath; beneath both stages one shared model chip (a small
  rounded square with a simple network glyph) connects up to both stages with thin
  lines; a small check mark badge sits above each stage. Small neat sans-serif
  labels 'Solve' and 'Refine' only, no other text.
- **chess-distill** — At the top a chess knight silhouette beside a small branching
  game tree, both pouring through a funnel; below the funnel a compact three-layer
  network of connected nodes; from the network a bold arrow points to a small
  chessboard with a single bold move arrow drawn across it. No text anywhere.
- **chessqa** — A central chessboard drawn flat from above as a hub with a few
  simple piece silhouettes, and five small rounded chips arranged in a ring around
  it, connected to the board by thin spokes; each chip holds one tiny glyph: a pawn,
  a fork of two crossed arrows, a lightning bolt, a balance scale, and a speech
  bubble. No text anywhere.
- **safegeo** — Left to right: three rectangular document cards ride thin flow lines
  into a small agent chip drawn as a rounded square with a simple robot face; one of
  the three documents is tinted warm buff and contains a small fishing hook glyph;
  from the agent an arrow leads to a ranked podium of three product bars where the
  buff-tinted product stands first, marked with a small warning triangle. Exactly
  one small label: GEO, on the hooked document.
- **gpr-llm** — Three calm stages, left to right: first a neat single column of
  eight small passage cards, three of them tinted jade and connected by thin lines
  up to one small LLM chip that marks each with a score dot; second, dominating
  the center, a smooth multimodal surface with three distinct peaks of clearly
  different heights, drawn as one continuous elegant fine contour mesh with a soft
  buff confidence band beneath its curve (multimodality is the paper's point:
  never draw a single bell); third, a bold
  arrow leading to a short ranked list of five horizontal bars, the top bar filled
  jade. Exactly one small label: GPR, beside the surface. Generous calm spacing
  between the three stages.
- **ma-dpr** — A graceful S-shaped ribbon of small dots forming a point cloud,
  joined into a sparse graph by faint short edges; at the lower end of the S a
  clear five-pointed star marks the query, the star filled muted jade with a
  bottle-green outline; midway along the S one large jade-filled dot marks a
  passage; two strongly contrasting routes connect them: a thin straight dashed
  chord cutting across the empty gap, and a bold solid jade path that hops dot to
  dot following the ribbon's curve; a small arrowhead on each route. No text
  anywhere. (Add "strictly no yellow, no gold" to the style line; the model likes
  gilding the star.)
- **eqr** — Left to right: one small query bubble, arrows elaborating it into a fan
  of six smaller subtopic bubbles, whose thin lines converge onto a vertical ranked
  list of five horizontal item bars; the top bar is filled jade, the rest stay
  outlined. No text anywhere.
- **travel-eqr** — A soft vague thought cloud at the upper left resolving through a
  small fan of subtopic bubbles into three teardrop map pins standing on a minimal
  coastline map drawn with thin contour lines and a small compass rose; at the right
  edge a short ranked list of three bars, the top one filled jade. No text anywhere.
- **latin-charters** — An old charter page with a ragged edge and a round wax seal
  at its foot; thin lines lift a handful of word dots from the page into two small
  side-by-side scatter plots in thin frames: in the left plot each word is a single
  fixed dot; in the right plot the same words appear as small clusters of several
  nearby dots; a thin timeline arrow runs beneath both plots. No text anywhere.
- **mcts-driving** — A three-lane road drawn in flat perspective with a small simple
  car at the bottom; floating above the road a branching decision tree of small
  round nodes expands upward through three levels; one branch of the tree and its
  matching lane path are drawn bold in jade while the other branches stay faint and
  thin. No text anywhere.
