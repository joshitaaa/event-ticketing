'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PurchaseFormProps {
  eventId: string;
  eventName: string;
  eventPrice: number;
}

export default function PurchaseForm({ eventId, eventName, eventPrice }: PurchaseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    paymentMethod: 'paypal' as 'paypal' | 'card',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Purchase failed');
      }

      // Redirect to ticket page
      router.push(`/tickets/${data.ticket.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  const platformFee = (eventPrice * 0.10).toFixed(2);
  const organizerAmount = (eventPrice * 0.90).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Purchase Ticket</h2>
      <p className="text-gray-600 mb-6">Complete your purchase for {eventName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="buyerName"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={formData.buyerName}
            onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="buyerEmail"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={formData.buyerEmail}
            onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'paypal' | 'card' })}
          >
            <option value="paypal">PayPal (Placeholder)</option>
            <option value="card">Credit Card (Placeholder)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Payment integration is a placeholder for demonstration</p>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Payment Breakdown</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Ticket Price:</span>
              <span>${eventPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Fee (10%):</span>
              <span>${platformFee}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Organizer Receives:</span>
              <span>${organizerAmount}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
              <span>Total:</span>
              <span>${eventPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
      </form>
    </div>
  );
}
