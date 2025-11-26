'use client';

import { Event } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{event.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500 text-sm">
            {new Date(event.date).toLocaleDateString()}
          </span>
          <span className="text-green-600 font-semibold">
            ${event.price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {event.availableTickets} tickets left
          </span>
          <Link
            href={`/events/${event.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Buy Ticket
          </Link>
        </div>
      </div>
    </div>
  );
}
