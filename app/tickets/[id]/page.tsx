import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

async function getTicket(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/tickets/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getEvent(eventId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/events/${eventId}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ticket = await getTicket(id);

  if (!ticket) {
    notFound();
  }

  const event = await getEvent(ticket.eventId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Events
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">✓ Purchase Successful!</h1>
            <p className="text-green-100">Your ticket has been confirmed</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">Ticket ID</span>
                  <p className="text-gray-900 font-mono text-sm">{ticket.id}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Event</span>
                  <p className="text-gray-900 font-medium">{event?.name || 'Unknown Event'}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Buyer Name</span>
                  <p className="text-gray-900">{ticket.buyerName}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Email</span>
                  <p className="text-gray-900">{ticket.buyerEmail}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Purchase Date</span>
                  <p className="text-gray-900">
                    {new Date(ticket.purchaseDate).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Status</span>
                  <p className={`font-medium ${ticket.validated ? 'text-red-600' : 'text-green-600'}`}>
                    {ticket.validated ? 'Used' : 'Valid'}
                  </p>
                </div>
              </div>
            </div>

            {ticket.validated && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium">
                  ⚠️ This ticket has already been used for entry on{' '}
                  {new Date(ticket.validatedAt!).toLocaleString()}
                </p>
                <p className="text-red-600 text-sm mt-1">
                  Anti-fraud protection: This ticket cannot be used again.
                </p>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">QR Code</h3>
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <Image
                    src={ticket.qrCode}
                    alt="Ticket QR Code"
                    width={300}
                    height={300}
                    unoptimized
                  />
                </div>
                <p className="text-gray-600 text-sm mt-4 text-center max-w-md">
                  Present this QR code at the event entrance for verification. This is a one-time use ticket.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Important Information</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Save this page or take a screenshot of your QR code</li>
                <li>• This ticket can only be used once (anti-fraud protection)</li>
                <li>• Arrive early to allow time for verification</li>
                <li>• Bring a valid ID matching the name on this ticket</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
