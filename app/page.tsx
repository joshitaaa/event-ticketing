import EventCard from '@/components/EventCard';
import Link from 'next/link';
import { Event } from '@/types';

async function getEvents(): Promise<Event[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/events`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Ticketing</h1>
              <p className="text-gray-600 mt-1">Secure event tickets with anti-fraud protection</p>
            </div>
            <Link
              href="/verify"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Verify Ticket
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-600">No events available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span><strong>Simple Ticket Purchase:</strong> Easy and fast checkout process</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span><strong>Anti-Fraud Protection:</strong> One-time entry validation to prevent ticket reuse</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span><strong>PayPal Integration:</strong> Secure payment processing (placeholder implementation)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span><strong>Split Payments:</strong> 10% platform fee automatically retained</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span><strong>QR Code Tickets:</strong> Each ticket includes unique QR code for verification</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
