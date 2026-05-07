# 🧭 PRODUCT & SYSTEM DESIGN DOCUMENT (v2)

---

# 1. 🌍 PRODUCT VISION

A unified marketplace platform (Angola-first) combining:

## 🏨 Hospitality System

* Hotel / hostel / guesthouse bookings
* Room/unit availability management
* Request-to-book flow with partner approval
* Stripe payments after approval

## 🏠 Real Estate System

* Property listings
* Contact-based leads (no direct transaction in MVP)
* Optional paid visibility + verification system

---

# 2. 🧠 CORE BUSINESS MODEL RULES

## 2.1 Platform structure

* ONE platform
* TWO domains:

  * Hospitality (transactional booking)
  * Real Estate (lead generation)

---

## 2.2 Listing system (UNIFIED CORE MODEL)

All content is based on:

> 🧱 Single Listing Entity

But behavior depends on domain:

| Domain      | Behavior               |
| ----------- | ---------------------- |
| Hospitality | Rooms + bookings       |
| Real Estate | Properties + inquiries |

---

## 2.3 Booking model (Hospitality)

### Flow:

1. User selects room/unit
2. System creates booking request
3. Partner approves/rejects
4. Stripe payment is processed after approval
5. Booking confirmed

---

## 2.4 Pricing model

* Partner-controlled pricing
* No system override in MVP
* Future: dynamic pricing possible

---

## 2.5 Cancellation rules

* Strict rule-based system
* No default free cancellation
* Possible rules:

  * 24h rule
  * 7-day rule
  * no cancellation (partner-defined)

---

## 2.6 Real estate flow

### Flow:

1. User views property
2. User sends inquiry/contact
3. Lead is stored in system

### Optional monetization:

* Paid visibility boost
* Paid verification (agent visit + badge)

---

## 2.7 Verification system

* Verified listings → higher ranking + trust badge
* Unverified listings → optionally visible or hidden (configurable)
* Manual verification (initial phase)

---

## 2.8 Geography scope

* Phase 1: 🇦🇴 Angola only

---

## 2.9 Language system

* Portuguese (default)
* English (fallback)
* UI fully bilingual
* Listings stored in Portuguese (MVP)

---

## 2.10 Notifications

### Channels:

* Email (Resend)
* In-app notifications

### Type:

* Transactional only

### Includes:

* booking updates
* approvals/rejections
* payment events
* inquiry notifications

### Excludes:

* marketing
* promotions
* ads

---

## 2.11 Payments

* Stripe integration
* Payment Intent model
* Payment only after booking approval

---

# 3. 🧱 SYSTEM ARCHITECTURE

## 3.1 High-level architecture

```txt
Frontend (Vercel - React)
        ↓
Backend API (Render - Spring Boot)
        ↓
Database (Supabase - PostgreSQL)
        ↓
Storage (Cloudflare R2)
        ↓
Auth (Keycloak)
        ↓
Email (Resend)
        ↓
Payments (Stripe)
```

---

# 4. ⚙️ TECHNOLOGY STACK DECISIONS

---

## 4.1 Frontend (UPDATED)

### 🧩 Final stack:

* React 19
* Tailwind CSS
* Vite
* React Router
* Keycloak JS adapter
* i18n (react-i18next or JSON-based)

---

### Frontend responsibilities:

* marketplace UI (hospitality + real estate)
* booking flow UI
* listing browsing
* multilingual UI (PT/EN)
* authentication integration

---

### UI structure:

```txt
/src
  /features
    /hospitality
    /real-estate
    /auth
    /profile

  /components
  /layouts
  /shared
  /i18n
```

---

## 4.2 Backend

* Java Spring Boot
* Modular Monolith architecture

### Modules:

```txt
/auth
/user

/hospitality
  /listing
  /room
  /booking
  /availability

/real-estate
  /property
  /lead
  /agent

/payment
  /stripe

/notification
  /email
  /inapp
```

---

## 4.3 Database

* Supabase (PostgreSQL)

---

## 4.4 Storage

* Cloudflare R2
* images (rooms, properties, listings)

---

## 4.5 Authentication

* Keycloak
* Roles:

  * USER
  * PARTNER
  * ADMIN

---

## 4.6 Notifications

* Resend (email)
* DB-based in-app notifications

---

## 4.7 Payments

* Stripe (Payment Intents)
* delayed capture after partner approval

---

## 4.8 Hosting

| Layer    | Provider      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | Supabase      |
| Storage  | Cloudflare R2 |

---

# 5. 🧠 CORE DOMAIN MODELS

---

## 5.1 Listing (base entity)

* id
* title
* description
* location
* images
* ownerId
* verified
* type (HOSPITALITY | REAL_ESTATE)

---

## 5.2 Hospitality

### RoomUnit

* id
* listingId
* type
* price
* availability

### Booking

* id
* userId
* roomUnitId
* status:

  * REQUESTED
  * APPROVED
  * REJECTED
  * PAYMENT_PENDING
  * PAID
  * CONFIRMED
  * CANCELLED

---

## 5.3 Real Estate

### Property

* id
* listingId
* price
* agentId

### Lead

* id
* propertyId
* contact info
* status

---

## 5.4 Payment

* id
* bookingId
* stripePaymentIntentId
* status

---

# 6. 🔄 BOOKING STATE MACHINE

```txt
REQUESTED
   ↓
APPROVED / REJECTED
   ↓
PAYMENT_PENDING
   ↓
PAID
   ↓
CONFIRMED
   ↓
(optional) CANCELLED
```

---

# 7. 🎯 MVP SCOPE

## MUST HAVE

* Listings system
* Hospitality booking flow
* Real estate contact system
* Stripe payments
* Keycloak authentication
* Email + in-app notifications
* PT/EN UI

---

## NOT IN MVP

* SMS / WhatsApp
* AI recommendations
* Reviews system
* Advanced pricing engine
* Multi-country support

---

# 8. ⚠️ TRUST & SAFETY SYSTEM

* Verified listings ranked higher
* Unverified listings optionally visible or hidden
* Manual moderation system
* Reporting system (planned)

---

# 9. 🚀 DEPLOYMENT FLOW

## Backend (Render)

* Spring Boot monolith
* Maven build
* env vars configured in dashboard

## Frontend (Vercel)

* React build (Vite)
* API connected via environment config

---

# 10. 🧭 FINAL PRODUCT STRATEGY

You are building:

> A dual-marketplace ecosystem combining:

* transactional hospitality booking system
* lead-based real estate system

With:

* shared infrastructure
* modular backend
* scalable frontend (React + Tailwind)
* phased monetization strategy

---

# 📌 FINAL STATUS

Your system is now:

## ✔ Architecturally consistent

## ✔ MVP-ready

## ✔ Scalable foundation defined

## ✔ Fully aligned across frontend/backend/data/payment/auth
