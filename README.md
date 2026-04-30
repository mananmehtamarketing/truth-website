# Truth — Underground Cocktail Bar Website

A cinematic Next.js + Framer Motion + GSAP + Lenis website for Truth, an underground cocktail bar and nightclub in Andheri East, Mumbai.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS for styling, custom Truth design tokens (gold, neon red, bone)
- Framer Motion for entrance + parallax animations
- GSAP available for advanced sequencing (already in deps, ready to wire)
- Lenis for buttery smooth scroll
- Custom canvas particle smoke (no three.js, lightweight)

## Run

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
src/
  app/
    layout.tsx       # global layout, fonts, providers
    page.tsx         # composes all sections
    globals.css      # font-faces, tailwind, base styles
  components/
    sections/        # Nav, Hero, Welcome, Gallery, Categories, OurStory, SmokeTransition, Footer
    ui/              # SplitText, MagneticButton, TiltCard, SmokeCanvas, CustomCursor, Loader, ScrollProgress, LenisProvider
public/
  fonts/             # Bonyland + Jost (Variable)
  images/            # hero photos 1-6
  sections/          # designer reference GIFs
```

## Animations per section

- **Hero**: parallax background, word-by-word headline reveal, neon flicker SVG filter, canvas smoke overlay, scroll hint pulse.
- **Welcome**: cocktail tray scale + blur on scroll, word-by-word body text, magnetic Book Now CTA.
- **Gallery (3 tiles)**: 3D tilt on cursor, Ken Burns zoom on scroll, gold ring on hover.
- **Categories**: magnetic buttons with gold glow ring on hover.
- **Our Story**: Eye of Ra slab parallax (slower than text), word-by-word reveal mirroring the myth, gold accent on closing line.
- **Smoke transition**: scroll-velocity-reactive particle field bridging sections.
- **Footer**: staggered nav reveal, social icons rise on hover, animated SVG map placeholder with pulsing pin.
- **Global**: Lenis smooth scroll, custom gold cursor with hover-state ring, Eye of Ra particle loader, top scroll progress bar, mobile drawer.

## Asset replacement

Drop in:

- Bar interior video loop → swap the `style={{ backgroundImage }}` div in `Hero.tsx` for a `<video autoPlay muted loop playsInline>` tag pointing at `/videos/hero.mp4`.
- Real Eye of Ra carving image → replace `<EyeOfRaArt />` SVG in `OurStory.tsx` with an `<img>` or `<div style={{ backgroundImage }}>`.
- Live Google Map embed → swap the SVG placeholder in `Footer.tsx` for an `<iframe>` from Google Maps embed share.

## Deployment

Vercel: connect the repo, deploy. No env vars needed for v1.

## To-do for full v2

- Booking flow (Sevenrooms / Zomato integration).
- Menu page + dish carousel.
- Private events inquiry form.
- Music + DJ events listing.
- CMS connection (Sanity recommended) for hours, events, menu.
