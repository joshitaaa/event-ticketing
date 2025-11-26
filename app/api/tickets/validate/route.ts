import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId } = body;

    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID required' },
        { status: 400 }
      );
    }

    const ticket = storage.getTicket(ticketId);

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Anti-fraud: Check if ticket already validated (one-time entry)
    if (ticket.validated) {
      return NextResponse.json(
        {
          error: 'Ticket already used',
          validatedAt: ticket.validatedAt,
          message: 'This ticket has already been used for entry. Anti-fraud protection: one-time entry only.',
        },
        { status: 400 }
      );
    }

    // Mark ticket as validated
    ticket.validated = true;
    ticket.validatedAt = new Date().toISOString();
    storage.updateTicket(ticketId, ticket);

    return NextResponse.json({
      success: true,
      message: 'Ticket validated successfully',
      ticket,
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate ticket' },
      { status: 500 }
    );
  }
}
