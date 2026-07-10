# Mama's Cookie Frontend — Walkthrough

Written as a snapshot for a future session (or a fresh pair of eyes) to get oriented fast.
Backend runs at `http://localhost:8080/api/v1` (Spring Boot). Frontend is Vite + React 19 + Redux
Toolkit + React Router + Tailwind v4, at `D:\Projects\Mamas Cookie\Front End\mamas-cookie`.

## Environment quirk worth knowing immediately
The `preview_start` tool (browser preview) cannot launch a dev server here — the space in
`Mamas Cookie` breaks its command-spawning. Verification in this project has always been done via
`npm run build` + manually starting `npm run dev` via Bash + `curl` checks against both the
frontend routes and the live backend directly. Kill stray `node.exe` processes between runs
(`taskkill //F //IM node.exe`) — many pile up across a session otherwise.

## Architecture pattern (applies uniformly to every feature)
```
constants/apiRoutes.js   → endpoint path constants (grouped by resource)
services/*.js            → thin axios wrapper, one function per endpoint
store/*Slice.js          → createAsyncThunk + createSlice, consistent shape:
                             { items/data, status, mutationStatus, error }
hooks/use*.js            → ergonomic wrapper around useSelector/useDispatch
pages/**/*.jsx           → UI, calls the hook, never calls services/axios directly
```
Every resource (Products, Categories, Areas, Pickup Centers, Addresses, Orders, Gifting,
Catering, Monthly Drop, Weekly Drop) follows this exact chain. `src/lib/axios.js` holds the
shared axios instance with a request interceptor that attaches `Authorization: Bearer <token>`
from `localStorage` automatically, and a response interceptor that unwraps backend errors into
`Error(message)`.

## Folder convention
- `pages/<PageName>/` — one folder per route/page, holding that page's own file plus any
  sub-components used *only* by it (e.g. `pages/Home/Hero.jsx`, `pages/EventsCatering/ContactStep.jsx`).
- `components/common/` — truly shared across multiple pages (e.g. `ProductCard`, `CartDrawer`,
  `ConfirmDialog`, `ProductQuickViewModal`, and the whole `location/` subfolder — login/gate
  modal used by both the Local page and Checkout).
- `components/ui/` — tiny generic primitives (`Button`, `Card`, `Spinner`).
- `components/layout/` — `Navbar`, `Footer`, `Layout` (wraps every public-site route), `AnnouncementBar`.
- `store/`, `hooks/`, `services/` — flat, one file per resource.

## Theme
`src/styles/theme.css` defines the design tokens via Tailwind v4's `@theme` block — `primary`
(brand red, 50–900), `ink` (near-black text scale), `gray`, `surface`. Mirrored in
`src/constants/theme.js` for non-Tailwind JS use (rare). Older `cookie`/`choco` tokens exist in
`index.css` from the very first scaffold pass — mostly superseded, a few older files
(`ProductCard`'s image container) may still reference them; harmless but inconsistent if you're
doing a cleanup pass.

## Routing (`src/router.jsx`)
Two independent route trees:
1. `/` with `Layout` (Navbar + Footer + global `CartDrawer`/`CartMiniBar`) — all customer-facing
   pages: `/`, `/shop`, `/shop/:id`, `/checkout`, `/login`, `/gifting`, `/events-catering`,
   `/our-story`, `/local`, `/profile`, `/track-order`.
2. `/admin/login` (standalone, no Layout) and `/admin` with `AdminLayout` (sidebar + topbar) —
   `/admin` (dashboard), `/admin/products`, `/admin/locations`, `/admin/orders`, `/admin/gifting`,
   `/admin/catering`, `/admin/monthly-drop`, `/admin/weekly-drop`.

`/admin` is **not** linked from the customer Navbar and is currently **unguarded** — anyone who
knows the URL or logs in reaches it, no role-check redirect yet. Deliberately deferred per user
instruction ("we will make it safe later").

## Auth — two entirely separate flows sharing one `authSlice`
- **Customer**: passwordless OTP. Email → `checkEmail` (backend tells us registered vs new) →
  if registered, `requestOtp({email})`; if new, show a registration form then `requestOtp` with
  full details → `verifyOtp({email, otp})` → `setCredentials` stores `{token, role, name, email}`
  in Redux + `localStorage` (`mc_token`, `mc_user`). This flow lives in
  `components/common/location/` (`LoginModal.jsx` standalone, or inlined into
  `LocationGateModal.jsx` for the Local/Checkout flow) — both reuse the same
  `LoginEmailStep`/`LoginOtpStep`/`LoginRegisterStep` components.
- **Admin**: plain email/password at `/admin/login`, via `authSlice`'s `loginAdmin` thunk.
- `authSlice` also has `fetchProfile`/`updateProfile` thunks (`GET`/`PUT /users/me`) used by the
  Profile page — merges into the same `user` object.
- Main site Navbar's account icon → `/admin/login` (admin only, by explicit user instruction).
  The "Track Order" nav link is auth-gated inline — clicking it while logged out opens the
  customer `LoginModal` instead of navigating; on success it auto-navigates.

## Cart — global, not page-scoped
`cartSlice.js`: items keyed by `productId` + `variantId` (so "Box of 4" and "Box of 8" of the
same product are separate lines with independent price/quantity). Persisted to `localStorage`
(`mc_cart`). `isOpen` boolean (not persisted) drives the drawer.
`components/common/CartDrawer.jsx` + `CartMiniBar.jsx` are mounted once in `Layout.jsx` — appear
identically no matter which page triggered `openCart()`. Drawer shows line items, a "Popular
Items" upsell strip, subtotal/delivery-fee/grand-total (delivery fee pulled from the currently
selected `localOrder` area; tax is a **hardcoded 18% placeholder**, no real tax config exists
backend-side), and a Clear Cart button with confirm dialog.

## The Local page (`/local`) — the most complex single flow
`Local.jsx` renders (in order): `LocalHeroCarousel` (real weekly-drop images, auto-rotating),
`LocalCategorySection` (fetches real categories, renders one product grid per category — no
hardcoded category list), then conditionally the **`LocationGateModal`** (blocks everything until
an order type is chosen) and, once selected, `MonthlyDropModal` (real image, dismissable, shown
once per session).

`LocationGateModal` (`components/common/location/`) is a state machine:
`type` (Delivery/Pickup toggle) → **Pickup**: dropdown of real pickup centers, done. →
**Delivery**: if not authenticated, inline login steps first, then `DeliveryAddressStep` — shows
saved addresses (real `GET /addresses`) to pick from, or a form (area dropdown + address line +
landmark) to create a new one, which becomes the selection. Selection is stored in
`localOrderSlice` (`orderType`, `area`, `address` or `pickupCenter`), persisted to `localStorage`.
This same modal is reused verbatim by `Checkout.jsx` if a user reaches checkout without ever
visiting `/local` — that's why it lives in `components/common/`, not `pages/Local/`.

`LocalNavbar.jsx` replaces the normal Navbar only on `/local` (checked by pathname in
`Layout.jsx`) — shows "Delivery to {real address}" / "Pickup from {center}", a cart icon, and
(when logged in) a dropdown with My Profile / Track Orders / Logout.

## Product cards & quick view — one component, used everywhere
`components/common/ProductCard.jsx` is the single card used on Home (Best Sellers), Shop, and
every category section on the Local page. Shows a **Best Seller** tag only when
`product.bestSeller` is true (real field — note the backend serializes it as `bestSeller`, not
`isBestSeller`, standard Jackson boolean-getter behavior), real star rating from
`averageRating`/`reviewCount`, wishlist heart, Add-to-Cart.
Clicking a card (not its buttons) opens `components/common/ProductQuickViewModal.jsx` — image
gallery (real `images[]` array, falls back to single `imageUrl`), name/price/description,
**variant picker** if `product.variants[]` is non-empty (changes displayed price and what gets
added to cart), an "Instructions" textarea, quantity stepper, Add to Cart.

## Checkout (`Checkout.jsx`)
Order of checks: empty cart → fewer than **3 total items** (sum of quantities across all lines,
not distinct products — blocks with a message) → no `localOrder` selection yet (renders
`LocationGateModal`) → not authenticated (shows a "Log In" prompt, since Pickup doesn't force
login upfront but placing *any* order does) → real checkout summary + "Place Order" →
`POST /orders` with `{orderType, items: [{productId, quantity}], addressId | pickupCenterId}` →
clears cart, navigates to `/track-order`.

**Known gap, not a bug**: cart lines track a selected variant and per-item instructions, but
`CreateOrderRequest` only accepts `{productId, quantity}` — no variant or instructions field
exists on the backend yet. Variant pricing/selection and special-request text do **not** reach
the actual order. Flagged repeatedly, still open.

## Track Order (`/track-order`) — single page, not List+Detail
One page. Lists the customer's own orders (`fetchMyOrders`, sorted newest-first client-side in
the slice), each row expands inline (no navigation) to lazy-load full detail + status history via
`fetchMyOrderById`. The old separate `pages/Orders`/`pages/OrderDetail` were deleted — nothing
links to `/orders` anymore.

## Admin panel — one CRUD pattern repeated per resource
Every admin resource follows: list page with status/filter, click a row → modal with full detail
+ action buttons, all through the matching Redux slice.
- **Products** (`AdminProducts.jsx`): View/Create toggle. Create form has name/description/price/
  stock(blank=unlimited)/category dropdown(real)/isBestSeller checkbox/variants(add-remove
  rows)/multi-image upload. List → `AdminProductDetailModal` (bigger, two-column, editable images
  with add/remove — image removal is implemented via the `PUT` "replace-array" semantics your
  backend uses, since there's no per-image delete endpoint for products specifically, unlike
  Weekly Drop which does have one).
- **Locations** (`AdminLocations.jsx`): Areas / Pickup Centers tabs, each a create-form-plus-list
  CRUD manager (`AdminAreaManager`, `AdminPickupCenterManager`).
- **Orders** (`AdminOrders.jsx`): status filter pills, list sorted newest-first, **red "new" dot**
  tracked client-side only (`localStorage`, no backend "viewed" flag exists) — clears when opened
  or when its status is changed. `AdminOrderDetailModal` shows full detail + action buttons
  generated from `pages/Admin/orderStatusFlow.js`, which mirrors the backend's exact state
  machine (only valid next-statuses ever appear as buttons; Reject requires typing a reason first).
- **Gifting** / **Catering** (`AdminGifting.jsx` / `AdminCatering.jsx`): near-identical — status
  filter (NEW/CONTACTED/CONFIRMED/CLOSED, no sequencing enforced so all 4 are always clickable),
  detail modal. Both share `GiftingStatusBadge` for the status pill.
- **Monthly Drop** (`AdminMonthlyDrop.jsx`): single image, one "Upload"/"Change Image" button.
- **Weekly Drop** (`AdminWeeklyDrop.jsx`): always renders exactly 5 slots. Occupied slot has
  change (pencil) and remove (✕) buttons; empty slot has "Add Image". Since the backend has no
  atomic "replace" endpoint for weekly-drop images — only append (`POST`, capped at 5 server-side)
  and delete-by-id (`DELETE`) — "changing" an image is delete-then-upload in sequence, tracked
  with a per-slot busy state.

## Public inquiry forms wired to real backend
- **Corporate Gifting** (`pages/Gifting/GiftingHero.jsx`) — name/email/phone/company(optional)/
  requirements(textarea)/eventDate(optional)/budget(optional) → `POST /gifting`, no auth.
- **Events & Catering** (`pages/EventsCatering/EventsForm.jsx`) — 3-step wizard (Contact → Event
  Details → Review), fields happened to already match the real `catering` schema exactly
  (firstName/lastName/email/phone/eventType/eventDate/guestCount/venueAddress) →
  `POST /catering`, no auth. This form originally had a fake `setTimeout` submission before the
  backend endpoint existed; now wired for real.

## Known naming/field gotchas already hit and fixed once (don't reintroduce)
- Backend strips `is`-prefixes on booleans: `isBestSeller` → JSON key `bestSeller`,
  `isDefault`/`isActive` on addresses/areas → `default`/`active`. Always read the stripped name
  from API responses; request payloads still use the `isX` form per the given specs.
  Worth double-checking this pattern whenever wiring a brand-new boolean field.
- `category` on a Product is a full `{id, name}` object, not a string — categories are a real
  backend resource now (`categoriesSlice`), not a hardcoded enum. The Local page's category
  sections are generated dynamically from whatever categories exist server-side — adding a
  category in the admin panel makes a new section appear on `/local` automatically, no frontend
  change needed.
- Order status history entries use `changedAt`, not `createdAt` (caught and fixed once already —
  double check before reusing `history[]` elsewhere).
- `formatCurrency` in `utils/format.js` outputs `Rs. X.00` (plain string formatting, not `Intl`).

## What's explicitly NOT done / deferred
- `/admin` route has no auth guard yet (open by design, deferred).
- No WhatsApp notifications (Twilio blocked on user's account access — see other memory file).
- No "new order" email-to-admin (flagged as a gap; user hasn't confirmed whether to build it).
- Product variant/instructions don't reach order creation (backend limitation, described above).
- Bundle size warning on build (~550KB main chunk) — never addressed, not urgent, would need
  route-based code-splitting if it matters later.
