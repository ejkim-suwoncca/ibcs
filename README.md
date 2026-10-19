# IB Computer Science

Slides and course pages for IB Computer Science, organised by the IB guide's
sections (A1–A4, B1–B4, Internal Assessment, Case Study). Open `index.html`.

## One template for every page

| File | What it does |
| --- | --- |
| `assets/theme.css` | Colours (black, white, greys; light and dark mode), fonts, the course top bar and the home pages. |
| `assets/deck.css` | The slide template: a fixed 1280 × 720 slide, one set of font sizes, left alignment, cards, callouts, code and tables. |
| `assets/deck.js` | Shows one slide at a time, scales it to fit any screen, and adds the Prev / Next controls. |
| `assets/site.js` | Opens and closes the course menu. |
| `templates/slide-deck.html` | Starter file for a new deck. |

Every slide is the same size and is scaled to fit the screen, so a slide looks
the same on a laptop, a projector or a large monitor, and never needs scrolling.

## Making a new deck

1. Copy `templates/slide-deck.html` into the right `slides-…` folder and rename it.
2. Replace the example slides; keep the classes the template uses. Don't add
   font sizes, fonts, colours or alignment: the template sets them.
3. Open the deck with `?check` after the file name (for example `B2.6.html?check`).
   A slide with too much content shows a red dashed outline: shorten it or
   split it into two slides.
4. Add the deck to the course menu and to the cards on `index.html`.

Keyboard: arrow keys, Space, Page Up / Page Down, Home / End.
The address ends in `#5` on slide 5, so a link can open a deck on any slide.
