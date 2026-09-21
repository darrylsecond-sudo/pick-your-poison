# Pick Your Poison — Feral Fortunes

A mobile-first, no-login party randomizer designed for a QR code printed on physical coasters.

## What is included

- `index.html` — the experience / screens
- `styles.css` — Night Garden Prince visual system
- `assets/coaster-art.webp` — optimized artwork used for the floral, celestial, glassware, and botanical treatments
- `questions.js` — **your editable question bank and game settings**
- `app.js` — randomizer, consent gate, repeat prevention, history, and Rare Poison behavior
- `make_qr.py` — optional helper that creates a print-ready QR PNG after you have a final URL
- `requirements.txt` — only needed for the optional QR helper

There is no server, account, database, or app download required.

## Version 2 visual restyle

This version uses the approved ornate coaster artwork as its visual source of truth. The landing card, category plaques, question card, history drawer, and After Dark gate now share the coaster collection's black-marble, antique-gold, blush-peony, white-blossom, moonlit, velvet, and cocktail-glass language.

The single WebP artwork asset is about 172 KB and is reused throughout the interface, keeping the page lightweight for QR-code guests on mobile data.

## How to edit the questions

Open `questions.js` in any text editor.

Each category contains a `questions` array. A prompt looks like this:

```js
{
  id: "FERAL-09",
  text: "Your new question goes here.",
  hostSpecific: false,
  intensity: 2
}
```

### Fields

- `id` — unique question number / label
- `text` — what the guest sees
- `hostSpecific: true` — shows the special host badge
- `intensity: 1` — light
- `intensity: 2` — bolder
- `intensity: 3` — daring; enables the optional “Pass — Coward.” button

You can add, delete, reorder, or rewrite questions without touching the design.

## Game settings

At the top of `questions.js`:

```js
settings: {
  hostLabel: "the birthday prince",
  rareChance: 0.08,
  historyLimit: 5,
  rareLabels: ["RARE POISON", "THE GARDEN CHOSE VIOLENCE", "FERAL FATE"]
}
```

### Change the host label

Edit `hostLabel` to change the special badge used on host-specific cards. For example, `"the birthday prince"`, `"Darryl"`, or `"the host"`. Prompts that literally contain the words “birthday prince” are ordinary question text and can be edited separately.

### Change the Rare Poison probability

- `0.05` = 5%
- `0.08` = 8%
- `0.10` = 10%
- `0` = turn Rare Poisons off

Rare prompts are stored in the separate `rareQuestions` array.

## How the randomizer behaves

- A category draw is random.
- A question is not repeated within that category until the category’s unseen questions are exhausted.
- Session history and seen-card tracking use `sessionStorage`.
- Refreshing the page restores the current poison.
- Closing the browser tab/window generally starts a fresh play session later.
- After Dark is gated by an adult-content confirmation.
- After Dark consent lasts only for the current browser session.
- Surprise Me may select After Dark; if it does and the guest has not entered After Dark yet, the adult-content confirmation appears first.
- The last 5 draws are shown under “Recent poisons” by default. Change `historyLimit` to adjust this.

## Local preview

The simplest reliable preview is to serve the folder with a tiny local web server.

### Mac / Windows / Linux with Python 3

From inside the `pick-your-poison` folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

On Windows, `python -m http.server 8080` may be the correct command.

You can also double-click `index.html`, but using the local server more closely matches the deployed experience.

## Deploy for a permanent QR destination

Choose **one** host and keep that project/site URL as your coaster destination.

### Option A — GitHub Pages

1. Create a GitHub repository, for example `pick-your-poison`.
2. Upload all site files from this folder to the repository root.
3. In the repository settings, enable GitHub Pages and publish from the main branch/root.
4. GitHub will provide a public HTTPS URL.
5. Test that URL on both iPhone and Android before printing.
6. Future question edits can be uploaded to the same repository. The URL stays the same.

### Updating the existing GitHub Pages repository

Upload and replace these items in the repository root:

- `index.html`
- `styles.css`
- `app.js`
- `questions.js`
- the complete `assets` folder

The `assets/coaster-art.webp` file is required. If the asset is missing or placed outside the `assets` folder, the game will still function but the coaster imagery will not appear.

After committing the files, wait for the GitHub Pages workflow to show a green check. Then open the same permanent URL on iPhone Safari and refresh once. If Safari briefly shows the previous design, close the tab and reopen it or use **Settings → Safari → Clear History and Website Data** only if a normal refresh does not update the cached stylesheet.

### Option B — Netlify

1. Create a new site in Netlify.
2. Deploy this folder as a static site.
3. Netlify gives you an HTTPS site URL.
4. Set a custom site name or custom domain before generating the final QR if you want a cleaner permanent URL.
5. Future deployments update the site without changing the QR destination.

### Option C — Vercel

1. Create a new static project.
2. Import the folder/repository.
3. No build command is needed; the site is plain HTML/CSS/JS.
4. Use the assigned HTTPS URL or attach a custom domain.
5. Keep that URL unchanged after coaster printing.

## Best permanent-URL strategy

For printed materials, the strongest option is a URL you control, such as:

```text
https://yourdomain.com/poison
```

That address can later redirect to any host you choose. If you move the site in the future, you update the redirect—not the printed coaster.

If you do not own a domain, a stable GitHub Pages, Netlify, or Vercel project URL is still workable. Do not delete/recreate the project after printing unless you can keep the same URL.

## Create the QR code

**Important:** the QR should contain only the permanent website URL. Do not put the questions in the QR itself.

### Included helper script

After you deploy and have your final HTTPS URL:

```bash
python3 -m pip install -r requirements.txt
python3 make_qr.py "https://YOUR-FINAL-URL.example/"
```

This creates:

```text
pick-your-poison-qr.png
```

The helper generates a high-resolution QR with a proper quiet zone.

You may also use a reputable QR generator, but export a high-resolution PNG or, preferably, vector SVG/PDF if your printer supports it.

## QR printing guidance for coasters

Use your coaster printer’s exact template first. These are safe general guidelines, not a replacement for the vendor’s production specs.

### Recommended minimum size

- Aim for a QR around **1.0–1.25 inches square** on a typical 3.5–4 inch coaster.
- If the coaster artwork is busy, use **1.25 inches or larger** when possible.
- Test the physical-size proof from multiple phones before placing the full order.

### Quiet zone

A QR needs an empty border around it.

- Keep at least **4 QR modules** of clear space on all sides.
- Do not let flowers, borders, foil, stars, text, or textures enter that quiet zone.

### Contrast

For this dark Night Garden design, place the QR inside an ivory/blush paper-like patch.

Best practice:

- very dark QR modules
- very light background
- no gradient inside the QR
- no transparency
- no metallic foil over the code
- no glossy spot-UV over the QR if it causes glare

### Keep the code simple

Shorter URLs produce less-dense QR codes and scan more easily. A custom short path such as `/poison` is ideal.

### Print-safe placement

- Keep the QR away from the trim edge.
- Follow the printer’s bleed and safety lines.
- A common starting point is **0.125 inch bleed** and at least **0.125–0.25 inch internal safe margin**, but your vendor’s template always wins.
- Do not place the QR over a fold, embossing, textured edge, or coaster cut detail.

### Proof before production

Before ordering the full batch:

1. Print the artwork at **actual physical size** on paper.
2. Test it in normal room light and dim party light.
3. Test from iPhone and Android.
4. Test at arm’s length and with the coaster flat on a table.
5. Confirm the QR opens the final HTTPS site—not a temporary preview URL.

## What to customize next

The site is intentionally ready for the complete approved Pick Your Poison deck. Replacing the sample prompts requires no redesign.

Good next customizations:

1. Replace all sample prompts with the approved Sip / Spill / Feral / After Dark deck.
2. Tune the Rare Poison probability.
3. Add the final host-specific questions.
4. Adjust wording on category taglines if desired.
5. Create the matching physical coaster artwork around the final QR safe area.
6. Deploy first, then generate the permanent QR.

## Notes

- No sound is included in Version 1. This keeps the scan-to-play experience fast and avoids unexpected audio at the party.
- No analytics are included. The site does not require tracking to work.
- Because all prompts live in a public JavaScript file, a technically curious guest could inspect the full question bank. For a private party game this is usually fine; hiding the question bank would require a server-side setup.
