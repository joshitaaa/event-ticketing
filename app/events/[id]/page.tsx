import { notFound } from 'next/navigation';
import Image from 'next/image';
import PurchaseForm from '@/components/PurchaseForm';
import Link from 'next/link';

async function getEvent(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/events/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Events
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-32">Description:</span>
                  <span className="text-gray-700">{event.description}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Date:</span>
                  <span className="text-gray-700">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Price:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${event.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Availability:</span>
                  <span className="text-gray-700">
                    {event.availableTickets > 0 ? (
                      <span className="text-green-600 font-medium">
                        {event.availableTickets} tickets available
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Sold Out</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {event.availableTickets > 0 ? (
              <PurchaseForm
                eventId={event.id}
                eventName={event.name}
                eventPrice={event.price}
              />
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-900 mb-2">Sold Out</h2>
                <p className="text-red-700">
                  Unfortunately, all tickets for this event have been sold.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
