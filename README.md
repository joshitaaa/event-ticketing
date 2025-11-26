# Event Ticketing System

A simple, secure event ticketing website focused on identity, payments, and fraud prevention.

## Features

- **Buy Ticket**: Simple and fast ticket purchase process
- **Anti-Fraud Protection**: One-time entry validation prevents ticket reuse
- **PayPal Payments**: Placeholder for PayPal payment integration
- **Split Payments**: 10% platform fee automatically retained, 90% goes to event organizers
- **QR Code Tickets**: Each ticket includes a unique QR code for verification
- **Identity Management**: Buyer information tracked with each ticket

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joshitaaa/event-ticketing.git
cd event-ticketing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Buying a Ticket

1. Browse available events on the homepage
2. Click "Buy Ticket" on an event
3. Fill in your name and email
4. Select payment method (PayPal placeholder)
5. Review the payment breakdown showing the 10% platform fee
6. Complete your purchase
7. Receive your ticket with QR code

### Verifying a Ticket

1. Click "Verify Ticket" in the header
2. Enter the ticket ID or scan the QR code
3. The system validates the ticket and marks it as used
4. **Anti-Fraud**: Attempting to use the same ticket again will be rejected

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Codes**: qrcode library
- **Storage**: In-memory storage (for demonstration)

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── events/       # Event endpoints
│   │   └── tickets/      # Ticket endpoints (purchase, validate)
│   ├── events/[id]/      # Event detail pages
│   ├── tickets/[id]/     # Ticket display pages
│   ├── verify/           # Ticket verification page
│   └── page.tsx          # Homepage
├── components/           # React components
├── lib/                  # Utility functions
│   ├── storage.ts        # Data storage
│   └── payment.ts        # Payment processing
└── types/                # TypeScript types

```

## Payment System

The payment system includes:
- **10% Platform Fee**: Automatically calculated and retained
- **90% to Organizer**: Remainder goes to event organizer
- **PayPal Integration**: Placeholder implementation (easily replaceable with real PayPal SDK)

## Anti-Fraud System

The anti-fraud system prevents ticket reuse:
1. Each ticket has a unique ID and QR code
2. When validated, the ticket is marked as "used" in the database
3. Any subsequent validation attempt is rejected
4. Validation timestamp is recorded for audit purposes

## Production Considerations

For production deployment, consider:

1. **Database**: Replace in-memory storage with PostgreSQL, MongoDB, or similar
2. **Authentication**: Add user authentication (NextAuth.js, Auth0, etc.)
3. **Real Payments**: Integrate actual PayPal SDK or Stripe
4. **Image Storage**: Use CDN for event images
5. **Security**: Add rate limiting, CSRF protection
6. **Email**: Send ticket confirmations via email
7. **QR Scanner**: Add mobile QR scanning capability
8. **Analytics**: Track ticket sales and validations

## License

MIT

## Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/0e58d6e0-91fd-4dbf-b1ba-3a73165a6b48)

### Purchase Form
![Purchase Form](https://github.com/user-attachments/assets/7d7e5ae8-3f14-451d-8957-6698ac08dc79)

### Ticket with QR Code
![Ticket Success](https://github.com/user-attachments/assets/bae48f8b-db48-4cc5-8b3f-ad96832c5ea8)

### Ticket Verification
![Ticket Validated](https://github.com/user-attachments/assets/5cd9ad75-cb8d-4ce6-958c-8ec65bae662c)

### Anti-Fraud Protection
![Anti-Fraud](https://github.com/user-attachments/assets/c400662b-b7d7-4b67-b30b-3339fdb62458)
