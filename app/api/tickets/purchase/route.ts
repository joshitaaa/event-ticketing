import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { storage } from '@/lib/storage';
import { calculatePaymentSplit, processPayPalPayment } from '@/lib/payment';
import { Ticket } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, buyerName, buyerEmail, paymentMethod } = body;

    // Validate input
    if (!eventId || !buyerName || !buyerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get event
    const event = storage.getEvent(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check availability
    if (event.availableTickets <= 0) {
      return NextResponse.json(
        { error: 'No tickets available' },
        { status: 400 }
      );
    }

    // Generate ticket ID
    const ticketId = uuidv4();

    // Calculate payment split
    const paymentSplit = calculatePaymentSplit(event.price);

    // Process payment (placeholder for PayPal)
    const paymentResult = await processPayPalPayment(event.price, ticketId);

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      );
    }

    // Generate QR code
    const qrCodeData = JSON.stringify({
      ticketId,
      eventId,
      buyerEmail,
    });
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Create ticket
    const ticket: Ticket = {
      id: ticketId,
      eventId,
      buyerName,
      buyerEmail,
      purchaseDate: new Date().toISOString(),
      qrCode,
      validated: false,
    };

    storage.createTicket(ticket);

    // Create payment record
    storage.createPayment({
      ticketId,
      ...paymentSplit,
      paymentMethod: paymentMethod || 'paypal',
      paymentStatus: 'completed',
      transactionId: paymentResult.transactionId,
    });

    // Update event availability
    event.availableTickets -= 1;
    storage.updateEvent(eventId, event);

    return NextResponse.json({
      success: true,
      ticket,
      payment: paymentSplit,
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to process purchase' },
      { status: 500 }
    );
  }
}
