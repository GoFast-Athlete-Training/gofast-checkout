# GoFast Run Program - Checkout

Checkout flow for Boys Gotta Run program registration.

## Features

- Site selection with pricing display
- Per-site pricing variance (from Head Coach configuration)
- Stripe payment integration (demo mode)
- Two-step checkout process
- Success confirmation page

## Tech Stack

- React 18.3.1
- Vite 5.4.10
- React Router 6.28.0
- Tailwind CSS 3.4.15
- Stripe React (@stripe/react-stripe-js)
- Lucide React (icons)
- shadcn/ui patterns

## Development

```bash
npm install
npm run dev
```

## Demo Mode

Currently in demo mode with mock Stripe integration. Use any card number (e.g., 4242 4242 4242 4242) for testing.

## Connection to Head Coach Portal

- Site list and pricing comes from Head Coach's Registration Setup
- Each site can have different pricing (monthly, semester, annual)
- Pricing displayed based on selected site

