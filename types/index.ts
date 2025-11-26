export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  price: number;
  availableTickets: number;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  purchaseDate: string;
  qrCode: string;
  validated: boolean;
  validatedAt?: string;
}

export interface PaymentInfo {
  ticketId: string;
  totalAmount: number;
  platformFee: number;
  eventOrganizerAmount: number;
  paymentMethod: 'paypal' | 'card';
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}
