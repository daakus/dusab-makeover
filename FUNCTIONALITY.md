# Dusab Beauty Palour — Site Functionality Overview

_Last reviewed: 2026-08-15_

**Brand update (2026-08-15):** the site's color theme now matches the salon's real logo and printed bridal rate card — deep wine maroon, warm gold-tan, and cream, replacing the previous pink/magenta placeholder theme. The change was made at the token level (Tailwind config + CSS variables), so it applies sitewide: marketing pages, booking flow, customer dashboard, admin panel, and the `/book` + `/momo-admin` mini-app. The salon's actual logo (extracted from the rate card PDF) now appears in the site's navigation.

Dusab Beauty Palour is a Next.js 14 (App Router) booking platform for a Kumasi, Ghana-based makeup/hairstyling/wig-installation salon that also runs tutorials/training. Payments are manual mobile money (MTN MoMo, Vodafone Cash, AirtelTigo Money) verified by an admin from an uploaded screenshot — there is no payment gateway integration. Backend is Supabase (Auth, Postgres with RLS, Storage).

This document catalogs everything the site currently does, area by area, and ends with a **Go-Live Readiness** section flagging what's incomplete, stubbed, or duplicated — read that section before launch.

---

## 1. Public / Marketing Site (`/`, `/about`, `/services`, `/gallery`, `/contact`, `/careers`)

- **Home (`/`)** — hero banner, featured services teaser, "why choose us", testimonials (real, see below), Instagram-style photo strip, footer, mobile bottom nav, floating WhatsApp button, mobile "book now" FAB. Hero/bento images and prices shown on this page are still hardcoded in source, not pulled from the database.
- **About (`/about`)** — static company blurb.
- **Services (`/services`)** — real catalog: pulls active services + categories from Supabase, merged with a built-in template catalog for stock imagery/descriptions when a service has no photo.
- **Gallery (`/gallery`)** — real: shows published photos uploaded by the admin from Admin → Gallery (see §5), stored in Supabase Storage. Shows a "check back soon" message until at least one photo has been uploaded and published.
- **Contact (`/contact`)** — real: submits to the `contact_messages` table via a server action; staff/admin can read messages (no admin UI to view them yet — see readiness notes).
- **Careers (`/careers`)** — placeholder "we're building our hiring page" message.
- **Privacy (`/privacy`) / Terms (`/terms`)** — real policy/terms copy in place (bookings, mobile money verification, cancellations, data handling, Ghana Data Protection Act reference). Should still get a lawyer's review before launch, but no longer literal placeholder text.

## 1a. Bridal (`/bridal`)

A dedicated, standout page for bridal bookings — the owner's main current line of business (he no longer takes general walk-ins, though he still does casual/home services on request). Content is drawn directly from the salon's real bridal rate card (packages, terms, and photos), with all specific GH₵ prices intentionally left out — package tiers and what's included are shown instead, since actual bookable bridal services and pricing are set up by the admin like any other service (see §5).

- **Packages**: Silver, Golden, Outside-Kumasi Deals, and Extra Services (baby christening, wig making), each showing session/tier options (e.g. "Makeup only" vs "Makeup and hairstyling") without prices.
- **Gallery**: 5 real bridal photos from the rate card (not stock images).
- **"What to Expect"**: the salon's actual booking terms — day-of expectations, postponement/cancellation policy, travel arrangements, and the 50% deposit policy (MTN MoMo) — adapted from the rate card's Bridal Agreement Contract.
- Both CTAs ("Book Your Bridal Date" and "Enquire on WhatsApp") route into the **existing** booking flow and WhatsApp contact — no new/parallel booking system was created for this page.
- Linked prominently from the main nav, mobile bottom nav, both site footers, and a dedicated promo banner on the homepage.

## 2. Booking Flow

There are **two separate booking paths** live on the site simultaneously:

### 2a. Main booking wizard — `/booking`
A 3-step flow: **Services → Schedule → Payment**.
1. Customer picks one or more services and a staff member (data pulled live from Supabase).
2. Customer picks a date/time; available slots are computed live (business hours, per-staff working windows, existing bookings, admin-blocked dates, slot interval, and a "max days ahead" cutoff) via `/api/booking/availability`.
3. Customer selects a mobile money method (MTN MoMo / Vodafone Cash / AirtelTigo Money), types a payment reference, and uploads a screenshot of the transaction.
4. On submit: an appointment + line items are created in the database, the screenshot is uploaded to private storage, a `payments` record is created as **pending**, and a WhatsApp message opens automatically to alert the salon of the new booking.
5. Customer lands on a confirmation page referencing their real booking ID.

### 2b. Quick booking form — `/book`
A simpler, single-page, no-login-required form (name, phone, a fixed short list of services/trainings with fixed prices, date/time, MoMo receipt upload) that writes to a separate, standalone table and storage bucket, and also opens a WhatsApp alert on submit. This is a different, independent system from 2a — see readiness notes.

## 3. Accounts & Authentication (`/login`, `/register`, `/forgot-password`)

- Email/password auth via Supabase (no social login, no MFA).
- Registration collects name, phone, email, password, and requires accepting Terms/Privacy.
- Password reset via emailed link.
- Two portal roles: **customer** (default on signup) and **admin** (plus an internal `super_admin` variant that behaves like admin), each routed to its own dashboard. A `staff` role slug still exists in the database for staff/therapist accounts, but there is no longer a staff portal to route into (see §6) — accounts with that role now land on the customer dashboard.

## 4. Customer Dashboard (`/customer/*`)

Available once logged in as a customer:
- **Overview** — greeting, next upcoming appointment, recent appointment history.
- **Appointments** — Upcoming list, History list, and a per-booking detail/manage page (view-only for cancel/reschedule — see readiness notes). Once a booking is confirmed and its appointment time has passed, the manage page shows a "leave a review" form (star rating + comment); after submitting, the customer's own review shows there read-only.
- **Favorites** — save/remove favorite services (no "add to favorites" button currently exposed on the services page).
- **Notifications** — a notifications inbox screen (currently always empty — nothing yet writes notifications into it).
- **Payments** — view payment/verification status per booking.
- **Profile** — read-only summary of account info.
- **Settings** — edit name, phone, and avatar URL.

## 5. Admin Portal (`/admin/*`)

Available once logged in as admin/super_admin:
- **Overview** — today's booking count, today's verified payments, active staff count, next 8 upcoming appointments.
- **Approvals** — queue of bookings awaiting approval, with Approve/Reject actions that update the booking status and message the customer on WhatsApp.
- **Bookings** — list of appointments, with the same approve/reject actions surfaced inline for anything still awaiting approval.
- **Calendar** — calendar view of appointments.
- **Services** — full create/edit for services (name, category, duration, price, description, image); delete/archive buttons are present but not yet wired up.
- **Gallery** — upload real salon photos (with an optional title); each upload goes to the `gallery-images` bucket in Supabase Storage and a row in the `gallery_images` table. Photos can be published/hidden or deleted from the same screen; published photos appear on the public `/gallery` page.
- **Reviews** — moderation list of every client review with a Remove button. Needed because reviews go live on the homepage the moment a customer submits one — there's no pre-approval step — so this is the safety net for taking down anything inappropriate.
- **Staff** — list/edit existing staff profiles and an "add staff" form (currently broken — see readiness notes).
- **Customers** — list of registered customer profiles.
- **Payments** — the working payment-verification queue: admin reviews uploaded screenshots and marks each payment Verified or Rejected; verifying triggers a WhatsApp confirmation message to the customer.
- **Revenue** — simple stat tiles totaling verified payments (no charts/graphs yet despite the charting library being installed).
- **Reports** — basic counts (appointments/customers/active services); no filtering or export yet.
- **Notifications/Alerts** — mirrors the customer notifications screen; currently always empty.
- **Settings** — raw JSON editor for site-wide settings (business hours, tax rate, etc.) stored in the database.
- A global search box appears on every admin page but currently only filters results on the Services page.

## 6. Staff Portal — removed

The `/staff/*` dashboard (Appointments, Availability, Notes, Schedule) has been removed; it was placeholder-only with no real data or functionality. Staff/therapist records still exist and are managed by the admin from Admin → Staff (§5) and selected by customers during booking — there is just no separate login area for staff members now. Accounts with the `staff` role are routed to the customer dashboard on login.

## 7. MoMo Mini Admin (`/momo-admin`)

A separate, lightweight admin screen — protected by a single shared password (not tied to staff/admin logins) — for managing bookings submitted through the quick `/book` form only. Shows pending/confirmed/cancelled counts, lets the admin view the uploaded MoMo receipt and Confirm or Cancel each booking, and opens WhatsApp to message the customer on confirmation. **This system and data are completely separate from the main `/admin` portal** — bookings made via `/book` never appear in `/admin`, and vice versa.

## 8. Payments (Manual Verification)

No payment gateway is integrated — this is by design. The flow is: customer pays the salon's mobile money number directly (outside the site), uploads a screenshot as proof during booking, and an admin visually reviews and approves/rejects it from the admin Payments queue. Approval and rejection both trigger a WhatsApp message so the customer is notified outside the site as well.

## 9. Data Model (Supabase/Postgres)

Core tables: `profiles` (linked 1:1 to login accounts, with role), `roles`, `service_categories`, `services`, `staff`, `staff_availability`, `appointments`, `appointment_services`, `payments`, `user_favorite_services`, `notifications`, `reviews` (now includes a `customer_name` snapshot column, added 2026-08-15, so the public homepage can show a reviewer's name without needing access to the `profiles` table), `gallery_images`, `contact_messages`, `settings`, plus `blocked_dates`, `business_settings`, and `tax_settings` for booking rules. Row-level security is enabled on every table so customers only ever see their own data, staff see what's assigned to them, and admins see everything. Separately, the MoMo mini-app has its own standalone `bookings` table with more permissive access rules. Storage buckets hold payment screenshots (private), MoMo receipts (public), and service/staff/gallery images (public).

---

## Go-Live Readiness — Issues to Resolve Before Launch

These were found during a full code review. Items marked **✅ Fixed** were resolved on 2026-08-15; the rest still need addressing (or consciously accepting) before sending customers to the live site.

1. ✅ **Fixed — Contact form now works.** It submits to the `contact_messages` table via a server action and shows a confirmation message. (There's still no admin UI to *view* submitted messages — someone would need to check the Supabase table directly, or that could be a follow-up.)
2. ✅ **Fixed — Privacy Policy and Terms of Service now have real content** covering bookings, mobile money payment verification, cancellations, and data handling, and the registration checkbox links now point to the correct `/terms` and `/privacy` pages instead of `/contact`. Recommend a lawyer's review of the copy before launch, but it is no longer a placeholder.
3. ✅ **Fixed — Admin Approvals queue now surfaces real bookings.** It was filtering on booking statuses that don't exist in the database; it now filters on the actual status the booking flow creates (`payment_submitted`), so newly submitted bookings correctly appear for approval on Approvals, Bookings, and Calendar.
4. ✅ **Fixed — Staff portal removed.** The empty placeholder `/staff/*` dashboard has been deleted rather than left half-built and login routing updated accordingly. Staff/therapist records are still managed from Admin → Staff and used in booking; there's just no separate staff login area anymore. If staff-facing tools (viewing assignments, setting availability) are wanted later, that would need to be built from scratch.
5. **The public "Payments" page (linked from the site footer) is a disconnected demo page** — it shows a fake example booking, its screenshot upload button doesn't actually upload anything, and its "I Have Paid" button leads to a fake, non-existent confirmation. It is not part of the real booking flow and could confuse a customer who lands on it directly. Recommend removing the footer link or removing the page.
6. **Two separate, disconnected booking systems are running at once**: the main `/booking` wizard and the simpler `/book` quick-booking form (with its own `/momo-admin` review screen and a fixed, code-only service/price list). They don't share data, so a booking made in one will never show up in the other's admin view. A decision is needed on which one (or both) should be public at launch.
7. ✅ **Fixed — gallery and testimonials are both real now.** Admin → Gallery lets you upload real salon photos (stored in Supabase Storage) and publish/hide/delete them; `/gallery` shows only real, published photos (a "check back soon" message until the first is uploaded). Home page testimonials now pull real reviews (rating ≥ 4 with a comment) from the `reviews` table instead of fabricated quotes, and show a "be the first to share your experience" call-to-action until any exist. Customers can leave a review (star rating + comment) from their appointment's manage page once that visit is complete; Admin → Reviews lets the salon remove any review, since reviews go live immediately with no pre-approval step. **Requires a database migration** (`supabase/migrations/20260815000000_reviews_customer_name.sql`, adds a `customer_name` column to `reviews`) to be applied before this works — see the Supabase connectivity note below.
8. **Adding a new staff member from Admin → Staff currently fails** due to a missing required link to a login account in that form.
9. **Service "delete/archive" buttons in Admin → Services aren't wired up yet** — there's currently no way to remove or deactivate a service from the admin UI.
10. **Payment merchant numbers shown to customers will fall back to placeholder example numbers** if the real MTN/Vodafone/AirtelTigo numbers aren't set in the site's environment configuration — worth double-checking these are set correctly before launch.
11. **Customers cannot cancel or reschedule a booking themselves** — the booking detail page explicitly says this is coming in a future release; for now they must contact the salon directly.
12. Notifications inboxes (both customer and admin) are built but nothing currently generates notifications into them, so they'll appear empty.
13. First admin/super-admin login requires a one-time manual setup step (creating the accounts in Supabase directly and running a seed script) — make sure this has been done with real credentials, not the placeholder example emails in the migration file, and that the password is changed immediately.
14. ⚠️ **New — the Supabase project currently configured in `.env` appears unreachable.** While testing the contact form fix, the configured project host (`ohsxzsqduqojbtktbwll.supabase.co`) failed to resolve at the DNS level (not an RLS/permissions error — the host itself can't be found), which matches a `TODO` comment already in `.env` saying it's a placeholder pointing at an "original project." This affects **every** database-backed feature, not just the contact form — booking, auth, admin, everything. Before go-live, confirm the live/production Supabase project URL and anon key are correctly set in the real deployment environment (Netlify), not just this local `.env`.
