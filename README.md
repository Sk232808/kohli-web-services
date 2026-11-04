# KOHLI WEB STUDIO

A responsive creative-studio website built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, GSAP/ScrollTrigger, Lucide, and optional Supabase. All portfolio entries and three fully designed demo sites are clearly identified as fictional concepts; sample pricing and business contact details must be reviewed before launch.

## Requirements

- Node.js 20.9 or newer (Node 22 LTS recommended)
- npm
- A Supabase project only if you want database-backed enquiries and the private dashboard

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without Supabase credentials the contact forms open a pre-filled email draft and `/admin` shows a safe setup screen; it does not pretend to authenticate or store messages.

## Business configuration

Business contact details are centrally configured in `src/config/business.ts`:

- Phone / WhatsApp: `+91 8968966640`
- Email: `shivamkohli2009@gmail.com`

Edit these values in that file to update public contact links, WhatsApp actions, footer details, and contact metadata. These details are public website configuration, not secrets.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL` | Social profile links |
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin used for metadata, sitemap and robots; defaults to the `kohli-web-services.vercel.app` deployment URL |
| `NEXT_PUBLIC_SINGLE_12_MONTH_PRICE`, `NEXT_PUBLIC_SINGLE_24_MONTH_PRICE`, `NEXT_PUBLIC_SINGLE_48_MONTH_PRICE` | Single Plan prices in INR |
| `NEXT_PUBLIC_PREMIUM_12_MONTH_PRICE`, `NEXT_PUBLIC_PREMIUM_24_MONTH_PRICE`, `NEXT_PUBLIC_PREMIUM_48_MONTH_PRICE` | Premium Plan prices in INR |

These values are public website configuration, not secrets. The six default prices live in `src/config/business.ts`, can be overridden with the variables above, and can also be edited in the Studio Admin dashboard.

## Supabase setup and admin access

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL editor.
2. Copy the project URL and **anon / publishable key** into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never use the service-role key in the website or expose it to a browser.
3. Add the administrator email address to the **server-only** `ADMIN_EMAILS` variable (comma-separated for multiple administrators).
4. In Supabase Auth, enable email sign-in and configure the site URL and redirect allowlist to include `http://localhost:3000/auth/callback` and your production `/auth/callback` URL. Configure an email provider before using magic links.
5. In Supabase SQL Editor, run [`supabase/pricing-plans-migration.sql`](./supabase/pricing-plans-migration.sql) once to replace any old package data with the Single Plan and Premium Plan prices. Running this migration resets the stored package prices to the six defaults; after that, edit prices in Studio Admin as needed.
6. In Supabase Authentication → Users, set each approved administrator’s **app metadata** role to `studio_admin` (for example via a trusted Supabase admin workflow). Do not use user-editable metadata. The address must also appear in `ADMIN_EMAILS`.
7. Restart the Next.js server after changing environment variables. Visit `/admin` and request a sign-in link.

Both server-side authorization (validated Supabase user, allowlisted email, and trusted app-metadata role) and row-level security are required. The admin APIs use the anon key with the signed-in user session; no service-role credential is used. Public site content is readable to visitors, while enquiry records and content modifications are restricted to administrators. Enquiry insertion is available to visitors. Add a production rate-limit / bot-protection provider and monitor abuse before accepting public traffic.

The admin dashboard edits structured JSON for projects, services, the two pricing plans (including all six duration prices), FAQs, and homepage copy; these records are read by the corresponding public pages and enquiry form. It also lists enquiries stored by the configured contact form and lets admins update their status. The configuration in `src/config/business.ts` is used when database content has not been added. Existing Supabase projects must run the one-time pricing migration above before loading the new pricing content schema.

## Quality checks and production

```powershell
npm run typecheck
npm run lint
npm run build
npm start
```

Deploy to a Node-compatible host such as Vercel. Import `Sk232808/kohli-web-services` from GitHub or connect the repository in Vercel. Set the public business, Supabase URL/key, server-only `ADMIN_EMAILS`, and production site URL in the host’s environment configuration. Apply `supabase/schema.sql` to the production database, set the production Supabase Auth redirect URL, then run a production build. Configure a real canonical domain before launch; update `NEXT_PUBLIC_SITE_URL` if you add one.

## Project map

- `src/app/` — agency, pricing, contact, demo routes, SEO endpoints and API handlers
- `src/components/` — shared chrome, forms, project gallery, pricing plans and admin UI
- `src/config/business.ts` — editable service, project, FAQ, and sample package defaults
- `src/lib/` — Supabase access and validated CMS content schemas
- `supabase/schema.sql` — database schema and row-level security policies
