# Mango Catalyst — Site Scaffold

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — Nav + Footer wrap all pages
│   ├── page.tsx                # HOME
│   ├── about/
│   │   └── page.tsx            # ABOUT — Bryan's story (no NorthStar name)
│   ├── services/
│   │   └── page.tsx            # SERVICES — Card grid overview of all offerings
│   ├── contact/
│   │   └── page.tsx            # CONTACT — Form + Calendly embed
│   ├── industries/
│   │   └── hvac/
│   │       └── page.tsx        # INDUSTRY — HVAC/Home Services (Phase 1 vertical)
│   └── blog/
│       ├── page.tsx            # BLOG INDEX — List of all posts
│       └── [slug]/
│           └── page.tsx        # BLOG POST — Dynamic MDX renderer
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Top nav — logo, links, "Book a Call" CTA
│   │   └── Footer.tsx          # Minimal — links, "Based in Minnesota", email
│   ├── ui/
│   │   ├── Button.tsx          # Primary/secondary CTA buttons
│   │   ├── Card.tsx            # Service card, blog card, reusable
│   │   ├── ContactForm.tsx     # Name, email, business, "what's eating your time?"
│   │   └── SectionHeading.tsx  # Consistent heading + subtext pattern
│   └── sections/
│       ├── Hero.tsx            # Big headline + subtext + CTA (used on Home)
│       ├── HowItWorks.tsx      # 3-step process (Discovery → Plan → Build)
│       ├── ServiceGrid.tsx     # Card grid of services
│       ├── CredibilityBar.tsx  # Stats strip (years, industries, hours saved)
│       ├── Testimonial.tsx     # Quote block (placeholder-ready)
│       └── CTABlock.tsx        # Reusable bottom-of-page call to action
│
├── content/
│   └── blog/
│       ├── hvac-tasks-to-automate.mdx
│       ├── what-is-automation-consultant.mdx
│       └── manual-data-entry-cost.mdx
│
└── lib/
    ├── blog.ts                 # MDX loader — reads content/blog/, returns metadata
    └── constants.ts            # Site-wide constants (site name, contact info, colors)
```

## Pages Breakdown

### Home (`/`)
| Section         | Component        | Content                                              |
|----------------|------------------|------------------------------------------------------|
| Hero           | Hero.tsx         | "Stop Hiring for Tasks a Machine Can Do" + CTA       |
| What We Do     | ServiceGrid.tsx  | 3 cards: Workflow, AI Docs, Custom Integrations       |
| Credibility    | CredibilityBar   | "10+ years / 5 industries / 1000s of hours saved"    |
| How It Works   | HowItWorks.tsx   | Discovery Call → Custom Plan → We Build It            |
| Testimonial    | Testimonial.tsx  | Placeholder slot for first client quote               |
| Final CTA      | CTABlock.tsx     | "Ready to stop doing it the hard way?" + button       |

### About (`/about`)
| Section         | Content                                                    |
|----------------|-------------------------------------------------------------|
| Story          | Decade in home services, built automation from inside out   |
| Philosophy     | "I'm not a consultancy. I'm the guy who builds it."        |
| Experience     | Generic bullets — ServiceTitan, Zapier, custom APIs, AI    |
| Photo          | Placeholder slot for headshot                               |
| CTA            | "Let's talk about your business"                            |

### Services (`/services`)
| Section         | Content                                              |
|----------------|------------------------------------------------------|
| Intro          | One paragraph — what automation means for your biz   |
| Card Grid      | 8 service cards (workflow, AI docs, CRM, comms, reporting, data entry, scheduling, integrations) |
| Bottom CTA     | "Not sure what you need? Let's figure it out."       |

### HVAC Industry Page (`/industries/hvac`)
| Section         | Content                                              |
|----------------|------------------------------------------------------|
| Hero           | "Your Techs Should Be Fixing Furnaces, Not Fighting Software" |
| Pain Points    | Dispatch chaos, missed follow-ups, invoice delays    |
| Solutions      | What automation looks like for HVAC shops            |
| Examples       | Real things built (generic — no company names)       |
| CTA            | "Let's automate your shop"                           |

### Blog Index (`/blog`)
| Section         | Content                                              |
|----------------|------------------------------------------------------|
| Header         | "Automation Insights" or similar                     |
| Post List      | Card grid — title, date, excerpt, read link          |

### Blog Post (`/blog/[slug]`)
| Section         | Content                                              |
|----------------|------------------------------------------------------|
| Article        | MDX rendered content                                 |
| Author         | Small byline block                                   |
| CTA            | "Want help automating this?" bottom block             |

### Contact (`/contact`)
| Section         | Content                                              |
|----------------|------------------------------------------------------|
| Form           | Name, email, business name, free text                |
| Calendly       | Embed for booking discovery calls                    |
| Location       | "Based in Minnesota, working across the upper Midwest" |

## Design Tokens (for whoever builds it)

| Token          | Value                                    |
|---------------|------------------------------------------|
| Primary        | Mango orange `#F97316` (Tailwind orange-500) |
| Primary hover  | `#EA580C` (orange-600)                   |
| Dark bg        | `#0F172A` (slate-900)                    |
| Light bg       | `#F8FAFC` (slate-50)                     |
| Text primary   | `#0F172A` (slate-900)                    |
| Text secondary | `#64748B` (slate-500)                    |
| Text on dark   | `#F8FAFC` (slate-50)                     |
| Font           | Inter (Google Fonts)                     |
| Radius         | `0.5rem` (rounded-lg)                    |
| Max width      | `1280px` (max-w-7xl)                     |

## SEO Notes

- Every page gets a unique `<title>` and `meta description`
- Blog posts use `generateMetadata()` from MDX frontmatter
- Schema markup: `LocalBusiness` on Home, `Service` on service pages, `Article` on blog posts
- `robots.txt` and `sitemap.xml` via Next.js built-ins
- Open Graph tags on all pages (for link previews when shared via text/email — not social)

## What's NOT in Phase 1

- Individual service detail pages (Phase 2)
- Additional industry pages beyond HVAC (Phase 2)
- Lead magnet / email capture (Phase 2)
- Testimonials with real content (Phase 3)
- ROI calculator (Phase 3)
- FAQ page (Phase 3)
