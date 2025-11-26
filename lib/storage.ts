// Simple in-memory storage for demonstration
// In production, use a proper database like PostgreSQL or MongoDB

import { Event, Ticket, PaymentInfo } from '@/types';

class Storage {
  private events: Map<string, Event> = new Map();
  private tickets: Map<string, Ticket> = new Map();
  private payments: Map<string, PaymentInfo> = new Map();

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample events
    const sampleEvents: Event[] = [
      {
        id: 'event-1',
        name: 'Tech Conference 2025',
        description: 'Annual technology conference featuring the latest in AI, Cloud, and DevOps',
        date: '2025-03-15',
        price: 99.99,
        availableTickets: 100,
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      },
      {
        id: 'event-2',
        name: 'Music Festival',
        description: 'Summer music festival with top artists from around the world',
        date: '2025-07-20',
        price: 149.99,
        availableTickets: 500,
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      },
      {
        id: 'event-3',
        name: 'Food & Wine Expo',
        description: 'Culinary experience featuring renowned chefs and wineries',
        date: '2025-05-10',
        price: 79.99,
        availableTickets: 200,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      },
    ];

    sampleEvents.forEach(event => this.events.set(event.id, event));
  }

  // Event methods
  getAllEvents(): Event[] {
    return Array.from(this.events.values());
  }

  getEvent(id: string): Event | undefined {
    return this.events.get(id);
  }

  updateEvent(id: string, event: Event): void {
    this.events.set(id, event);
  }

  // Ticket methods
  createTicket(ticket: Ticket): void {
    this.tickets.set(ticket.id, ticket);
  }

  getTicket(id: string): Ticket | undefined {
    return this.tickets.get(id);
  }

  updateTicket(id: string, ticket: Ticket): void {
    this.tickets.set(id, ticket);
  }

  getTicketsByEvent(eventId: string): Ticket[] {
    return Array.from(this.tickets.values()).filter(t => t.eventId === eventId);
  }

  // Payment methods
  createPayment(payment: PaymentInfo): void {
    this.payments.set(payment.ticketId, payment);
  }

  getPayment(ticketId: string): PaymentInfo | undefined {
    return this.payments.get(ticketId);
  }

  updatePayment(ticketId: string, payment: PaymentInfo): void {
    this.payments.set(ticketId, payment);
  }
}

// Singleton instance
export const storage = new Storage();
