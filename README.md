# Maison Voyage — Full-stack bags & luggage storefront

A white-and-burgundy luxury e-commerce starter built with **Next.js App Router, React, TypeScript, Tailwind CSS, PostgreSQL and Prisma**. It includes a customer-facing shop, secure credential sessions, persistent database-backed carts, inventory-safe cash-on-delivery checkout, order history, wishlist, contact inbox and an admin workspace.

> **Status: development-ready application, NOT a turnkey live merchant service.** Sample photos, pricing, brand identity, reviews, contact details and legal documents are demonstration data. Payment cards are **not accepted**. You must supply a database, real business details, legal terms, fulfilment practices, and production email/payment integrations before selling to customers.

## Quick start

Requires Node.js 20+ and Docker (or a PostgreSQL 16 database).

```bash
npm install
cp .env.example .env
cp .env.example .env.local
docker compose up -d postgres
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open **http://localhost:3000**. Demo product data are created with `npm run db:seed`. To create an admin, set `ADMIN_EMAIL` and a **strong, unique** `ADMIN_PASSWORD` in `.env` before running the seed; the seed deliberately refuses the placeholder password. Visit `/login`, then `/admin`.

> If you already have a managed PostgreSQL instance, set the `DATABASE_URL` and skip Docker. The database URL must be available to Prisma CLI in `.env`, and to the app runtime via `.env.local` or hosting environment settings.

## Features in this version

| Area | Implemented |
| --- | --- |
| Marketing | Responsive homepage, curated categories, editorial content, FAQ, shipping, returns, legal placeholders |
| Catalog | Search, category / size / color / material / brand filters, price ranges, sorting, pagination, product pages |
| Accounts | Register, sign in/out, bcrypt password hashing, 14-day httpOnly database-backed sessions |
| Bag | Database-backed guest/user carts, stock-aware add/update/remove, 90-day guest cart cookie |
| Checkout | Validated Moldova shipping details, cash on delivery, coupon discounts, order creation & transactional stock decrement |
| Customer area | Orders, statuses, wishlist |
| Contact | Validated contact form stored in PostgreSQL, newsletter email capture |
| Admin | Role-protected dashboard and financial totals, product create/edit/archive, inventory, order status management |
| SEO & UX | Responsive design, metadata, dynamic product descriptions, sitemap, robots, loading/error states, reduced-motion support |

## Application structure

```
app/
  api/              # Authentication, cart, wishlist, checkout, admin, contact
  shop/             # Catalog filters + product pages
  cart/ checkout/   # DB-backed cart & order creation
  account/          # Customer order history
  admin/            # Administrator-only product/order controls
  [info pages]/     # About, shipping, legal pages, FAQ, contact
components/         # Reusable product cards, actions, forms and layout
lib/                # Auth/session helpers, Prisma client, pricing, validation
prisma/             # PostgreSQL schema and demo seed
```

All prices are stored as **integer MDL bani** (e.g. `189000 = 1,890.00 MDL`) to avoid floating-point order totals. The checkout **recalculates prices and quantities on the server**, uses a serializable database transaction to decrement stock conditionally, and stores an order snapshot. Admin deletes archive products so previous order references remain valid.

## Configuration / security

- Never commit `.env`, `.env.local`, or credentials. Choose a strong admin password (minimum 12 characters recommended); restrict admin registration by seed-only role assignment.
- Production hosting must enable HTTPS, protected database credentials, regular backups, audit logging, bot protection/rate limiting and operational alerting.
- Currently **only cash on delivery** is accepted; no card credentials are collected or stored. Integrate a Moldova-compatible PSP with verified server-side webhooks before enabling online card payments.
- The site stores contact and newsletter submissions but **does not send emails** without a configured transactional email provider.
- Product image URLs must use HTTPS. Product administration supports URL-based images, **not file uploads**; connect Cloudinary or equivalent for uploads.
- The initial store is **English UI / MDL checkout**, with schema and helpers suited to future Romanian/Russian localization and configurable display currencies. Full translations, exchange-rate management, order tracking events, password reset emails, reviews moderation, refunds, and variant/image batch management remain future tasks.
- Illustrative hero/product stock photos from Unsplash are demo content. Confirm licenses, image relevance and actual merchandise photography before production.
- Delivery and return estimates, support address, company location, policies, and sample reviews are placeholders requiring merchant approval.

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

Build is expected to run after dependencies and `DATABASE_URL` are configured. In restricted environments without npm registry access, the application can be packaged and syntax-reviewed, but a fully verified production build and end-to-end checkout test cannot be claimed.

## Before launch

1. Replace the Maison Voyage placeholder brand content, products, photography and contact details; confirm taxes/shipping regions/pricing.
2. Review privacy, cookie, returns and consumer terms with qualified local counsel and configure consent where necessary.
3. Integrate email sending (order confirmations and account recovery); implement password reset.
4. Add payment gateway webhooks, inventory reconciliation, refund workflows and detailed audit logs if online payments are planned.
5. Configure rate limiting, bot mitigation, image upload/storage, monitoring, backups, CI and application health checks.
6. Run end-to-end tests for registration, cart, discount, checkout, refunds, multi-user concurrency and administrator permissions.

## License

This generated starter may be adapted for your own shop. External product photography remains subject to its respective terms.
