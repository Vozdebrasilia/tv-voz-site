# VOZ NEWS Editorial SEO Engine Implementation Plan

**Goal:** Make every VOZ NEWS analysis directly addressable, crawlable, shareable and distinct in tone/content.

**Architecture:** Keep the homepage feed, but change analysis clicks to `/analises/<slug>`. Add a server-rendered Vercel function for analysis pages, plus dynamic sitemap and robots directives. Derive author/topic/entity metadata from each headline and expose internal links for crawl discovery.

**Tech Stack:** Vanilla JS, Vercel serverless functions, HTML/CSS, JSON-LD.

## Global Constraints
- Preserve V33 and existing homepage layout.
- Alternate Deijanete Fayad / Paulo Fayad one analysis at a time.
- Use the existing official `logo-voznews-oficial.png` only.
- Commentary must be specific to each headline and avoid generic repeated paragraphs.
- Facts/data/quotes require source attribution.

### Task 1: Direct analysis URLs
Modify `v33-did-player.js` so headline/ticker clicks navigate to a slugged `/analises/...` URL with compact source metadata.

### Task 2: Server-rendered analysis page
Create `api/analysis-page.js` producing unique article HTML, metadata, canonical, author, topic/entity links, source attribution and `NewsArticle` JSON-LD.

### Task 3: Crawl/indexing
Create `api/sitemap.js`, `robots.txt`, and Vercel rewrites for `/analises/:slug` and `/sitemap.xml`.

### Task 4: Verification
Fetch committed files and verify routes, canonical metadata, JSON-LD, sitemap endpoints and homepage direct links are present.