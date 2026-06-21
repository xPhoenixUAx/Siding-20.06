# Universal Aggregator Website Requirements

This document defines reusable technical and UX requirements for building a service aggregator website. It is intentionally industry-neutral and can be applied to any niche: home services, repairs, health services, local professionals, consultations, installations, or other lead-generation aggregator businesses.

## 1. Core Project Goal

Build a responsive, conversion-focused website that helps users understand available service categories, compare service options, submit an inquiry, and connect with independent local providers.

The website must work as a reusable aggregator shell where company identity, contact details, legal text, disclaimers, service data, and CTA labels can be changed from configuration files instead of being hardcoded throughout the project.

## 2. Required Pages

Every project should include these pages unless explicitly removed by the client:

- `index.html` - homepage
- `about.html` - company/about page
- `services.html` - compact service directory or grouped service overview
- Individual service pages, one page per service slug
- `contact.html` - lead/contact form page
- `privacy.html` - privacy policy
- `terms.html` - terms of service
- `cookie-policy.html` - cookie policy

Optional but recommended:

- `service-detail.html` or a reusable service template
- `sitemap.xml`
- `robots.txt`
- `favicon.svg`
- `contact-submit.php` or another form endpoint when static hosting is not required

## 3. Global Configuration Requirement

The project must contain a global configuration file:

```text
js/site-config.js
```

All company-level data must be stored in this file and hydrated into pages through JavaScript. Do not hardcode business identity across HTML files.

Minimum required config fields:

```js
window.SITE_CONFIG = {
  companyName: "",
  companyLegalName: "",
  companyId: "",
  phone: "",
  phoneDisplay: "",
  phoneButtonLabel: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  serviceArea: "",
  businessHours: "",
  footerTextPrimary: "",
  footerTextSecondary: "",
  disclaimerShort: "",
  disclaimerFull: "",
  footerDisclaimer: "",
  copyrightLine: "",
  ctaPrimary: "",
  ctaSecondary: ""
};
```

Required dynamic targets:

- Company name in header, footer, legal pages, and visible content
- Legal company name
- Company ID or registration placeholder
- Phone text and `tel:` links
- Email text and `mailto:` links
- CTA button labels
- Footer text
- Footer disclaimer
- Short and full disclaimers
- Business hours
- Service area
- Copyright line
- Browser tab title where the company name appears

Recommended data attributes:

```html
data-company-name
data-company-legal-name
data-company-id
data-company-address
data-phone-text
data-phone-link
data-email-text
data-email-link
data-cta-primary
data-footer-text-primary
data-footer-text-secondary
data-disclaimer-short
data-disclaimer-full
data-footer-disclaimer
data-service-area
data-business-hours
data-copyright-line
data-year
```

The browser tab title must also update from config. If static HTML contains a fallback company name, JavaScript must replace it with `SITE_CONFIG.companyName`.

## 4. Service Data Requirement

Service content must be centralized in a separate data file:

```text
js/services-data.js
```

Each service should include:

- `slug`
- `title`
- `short`
- `eyebrow` or category label
- `intro`
- Hero/background image path
- Main service image path
- Included work/items
- Material or option types, where applicable
- Best-fit situations
- Process steps
- Important details
- FAQ items
- Related services
- Category/group assignment

Service pages should be generated or hydrated from this data where possible. Avoid manually duplicating service content across pages unless the client specifically requires fully static pages.

## 5. Header Requirements

Header must be consistent across all pages.

Required items:

- Logo/brand mark
- Config-driven company name
- Main navigation
- Services dropdown
- Phone icon CTA
- Primary CTA button
- Mobile menu toggle

Desktop services dropdown:

- Services must be grouped by category.
- Each group item should have a real icon from an icon library.
- On hover, category groups may reveal a mini dropdown with the services inside that group.
- Dropdown must include internal padding and enough spacing so items do not look crushed.
- Hover bridges must be implemented so the dropdown does not close while moving from trigger to menu.

Mobile menu:

- Font size must be smaller than desktop hero/navigation display sizes.
- Services must be expandable as a dropdown/accordion.
- Service groups and services must remain readable at 360px width.
- CTA must be visible and easy to tap.

## 6. Footer Requirements

Footer must be consistent across all pages.

Required columns:

- Brand/company summary
- Services or service groups
- Contact
- Legal pages

Legal pages must be in their own column named clearly, for example:

```text
Legal pages
```

Footer must include:

- Config-driven company name
- Config-driven phone and email
- Links to privacy, terms, and cookie policy
- Config-driven short disclaimer
- Full footer disclaimer
- Config-driven copyright line

Required aggregator disclaimer:

```text
Disclaimer: This site is a free service to assist users/customers in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the customer to verify that the hired contractor/provider furnishes the necessary license, insurance, certification, or other credentials required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors/providers listed on this site.
```

Adjust the wording only to match the target industry, but keep the independent-provider and no-guarantee meaning.

## 7. Legal Pages

Legal pages must be readable, styled, and visually integrated with the website. They must not appear as raw text dumps.

Required pages:

- Privacy Policy
- Terms of Service
- Cookie Policy

Each legal page must:

- Use the same header and footer as the rest of the site
- Pull company name, legal name, email, service area, and disclaimer from config
- Be adapted to aggregator language
- Avoid niche-specific wording unless provided by the client
- Include a clear last-updated date

Privacy Policy should cover:

- Information users provide
- Automatically collected information
- Cookies/tracking
- How information is used
- Sharing with service providers/partners
- Security
- User rights
- Children’s privacy
- Third-party links
- California/privacy rights where relevant
- Data retention
- Contact information

Terms of Service should cover:

- Acceptance of terms
- Service/inquiry description
- Estimates/pricing or provider matching disclaimer
- Customer responsibilities
- Independent provider disclaimer
- Limitation of liability
- Dispute resolution
- Intellectual property
- Modifications
- Governing law placeholder
- Contact information

Cookie Policy should cover:

- What cookies are
- Essential cookies
- Analytics cookies
- Functional cookies
- Marketing cookies
- Third-party cookies
- Cookie management
- Do Not Track statement
- Updates
- Contact information

## 8. Cookie Banner

The website must include a cookie banner.

Requirements:

- Appears if no cookie preference is stored
- Uses local storage or equivalent client-side storage
- Includes Accept and Decline actions
- Includes a link to `cookie-policy.html`
- Must not block important CTAs on mobile
- Must be responsive at 360px width
- Copy must be industry-neutral and not hardcoded to a specific niche

Storage key should be generic or derived from the company/project slug.

## 9. Contact and Lead Form

The contact page must be visually aligned with the rest of the website.

Required form fields:

- Name
- Email
- Phone
- Service selection
- Message/project details

Recommended:

- Contact method cards/rows with icons
- Config-driven phone, email, and business hours
- Short disclaimer near the form
- Server-side config usage if a PHP/contact handler is used

If using a backend form handler, it should read destination email/company data from `site-config.js` or an equivalent config source, not from hardcoded values.

## 10. Services UX

When there are many services, do not present them as a large flat grid.

Preferred structures:

- Group services into 3 to 5 logical categories.
- Use a compact service directory.
- Use tabs, grouped lists, accordions, or carousel-like grouped cards.
- Avoid excessive tile/card repetition.
- Make links visually recognizable as links or list items.
- Related services sections must be compact and not overpower the detail page.

Individual service pages should explain services in plain human language:

- What the service means for the customer
- What is included
- What options/materials/types exist
- When the service is a good fit
- How the process works
- What details matter
- Frequently asked questions
- CTA at the end

Avoid overly technical headings. Headings should feel human and clear.

## 11. Visual Design Requirements

The site must feel custom, modern, and appropriate to the industry.

General rules:

- Avoid a generic template feeling.
- Avoid overly square, tiled, repetitive layouts.
- Use enough spacing and rhythm, but do not make sections unnecessarily tall.
- Avoid nested cards and card-heavy page sections.
- Use icons from a real icon library, not invented text/symbol placeholders.
- Do not place decorative icon backgrounds unless visually justified.
- Use hover effects on interactive cards, process items, buttons, and lists.
- Make headings and paragraphs balanced in width.
- Avoid sections where a small title is squeezed while the paragraph spans too wide.
- Make process/steps sections visually engaging, not plain static blocks.
- Decorative prints/patterns must not appear visibly cut off.

Images:

- Use real or generated bitmap images where needed.
- Generated section images should be saved as `.webp`.
- Service pages should have unique hero/background images where practical.
- Important hero/section images must not be awkwardly cropped.
- If using people cutouts, ensure they are scaled and positioned correctly across desktop, tablet, and mobile.

Favicon:

- Add a project favicon.
- Prefer `favicon.svg` unless the target platform requires `.ico`.
- Include it on every HTML page.

## 12. Responsive Requirements

The website must be responsive.

Required breakpoints:

- Desktop
- Tablet
- Mobile
- Specific check at `360px` mobile width

Mobile requirements:

- Header and mobile menu must fit at 360px.
- Mobile menu fonts must not be oversized.
- Dropdowns/accordions must open smoothly.
- CTA buttons must fit and remain tappable.
- No horizontal scrolling.
- Text must not overflow buttons/cards.
- Floating CTA must not cover important content or cookie banner.

Tablet requirements:

- Hero sections must not be excessively tall.
- Desktop-inspired layouts may be scaled down for tablet instead of collapsing too early.
- Important sections should remain balanced and not appear empty.

## 13. Animation and Interaction

Allowed:

- Icon libraries
- Hover effects
- Smooth accordions
- Scroll reveal
- Carousels/slideshows
- Auto-rotating service/testimonial groups
- Floating CTA

Requirements:

- Accordions must open and close smoothly.
- Carousels must include controls or dots where useful.
- Auto-rotation should pause or behave reasonably during interaction.
- Hover effects should enhance clarity, not distract.
- Mobile interactions must work without hover.

## 14. Floating CTA

Add a floating CTA when appropriate.

Requirements:

- Circular button
- Phone icon from an icon library
- Uses config-driven phone link
- Fixed position
- Accessible label
- Does not conflict with cookie banner on mobile

## 15. Asset and Path Management

All local paths must be checked before delivery.

Requirements:

- No broken image paths
- No broken CSS imports
- No broken JS references
- No stale generated images that are not referenced
- No temporary screenshots or attachment folders in final delivery
- Remove unused assets only after verifying they are not referenced
- Keep generated production images in predictable folders

Recommended structure:

```text
css/
  base.css
  bundle.css
  pages/
js/
  site-config.js
  services-data.js
  main.js
  page-loader.js
img/
  generated/
  services/
```

## 16. Cache Versioning

Static assets should use a version query parameter:

```html
css/bundle.css?v=YYYYMMDDxx
js/main.js?v=YYYYMMDDxx
```

When CSS/JS changes, update the version consistently across:

- HTML pages
- CSS imports
- Dynamic page loaders

Before delivery, verify there is only one current cache version across the project.

## 17. SEO and Indexing Basics

Required:

- Valid titles on each page
- Titles should update company name from config
- `sitemap.xml`
- `robots.txt`
- Legal pages included in sitemap
- Service pages included in sitemap
- Semantic headings
- Descriptive image alt text where practical

Recommended:

- Meta descriptions per page
- Open Graph image/title/description
- Canonical URLs when deployed

## 18. Accessibility Basics

Required:

- Buttons must have accessible labels where icons are used
- Decorative icons should use `aria-hidden="true"`
- Mobile menu toggle must expose `aria-expanded`
- Dropdowns and accordions should have usable keyboard/focus behavior where practical
- Links must be visually identifiable
- Text contrast must be readable
- Form fields must have labels

## 19. Local Development and Review

The project should run locally with a simple server.

Recommended local URL:

```text
http://127.0.0.1:8000/
```

Before handoff:

- Start or verify the local server
- Check desktop
- Check tablet
- Check mobile at 360px
- Verify all HTML pages return `200`
- Verify console has no errors
- Verify config hydration works
- Verify service pages load their dynamic data
- Verify favicon loads
- Verify cookie banner works
- Verify floating CTA links to the configured phone number

## 20. Final QA Checklist

Before delivery, confirm:

- All company data is controlled by config
- No hardcoded phone/email/company name remains outside allowed fallbacks
- Browser tab title changes from config
- Header/footer are consistent across all pages
- Legal pages are readable and styled
- Cookie banner is present and functional
- Services are grouped, not dumped into a huge flat grid
- Service detail pages are clear and customer-friendly
- CTA exists at meaningful conversion points
- Floating phone CTA works
- Sitemap includes main, legal, and service pages
- Favicon exists and is linked everywhere
- All paths are valid
- Unused temporary files are removed
- Site is responsive at 360px
- JS syntax checks pass
- Local HTTP page checks pass
