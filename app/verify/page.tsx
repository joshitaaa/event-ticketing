'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VerifyPage() {
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/tickets/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || 'Validation failed');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Failed to validate ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Events
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Ticket</h1>
          <p className="text-gray-600 mb-6">
            Enter a ticket ID to validate and mark it as used. This prevents fraudulent re-entry.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700 mb-1">
                Ticket ID
              </label>
              <input
                type="text"
                id="ticketId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Enter ticket ID or scan QR code"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Validating...' : 'Validate Ticket'}
            </button>
          </form>

          {result && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-xl font-bold text-green-900 mb-2">✓ Ticket Valid!</h2>
              <p className="text-green-800 mb-3">{result.message}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Buyer:</span>
                  <span className="text-gray-900 font-medium">{result.ticket.buyerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900">{result.ticket.buyerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validated At:</span>
                  <span className="text-gray-900">
                    {new Date(result.ticket.validatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
                <p className="text-green-800 text-sm font-medium">
                  🔒 This ticket has been marked as used and cannot be used again.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="text-xl font-bold text-red-900 mb-2">✗ Validation Failed</h2>
              <p className="text-red-800">{error}</p>
              {error.includes('already used') && (
                <div className="mt-3 p-3 bg-red-100 rounded border border-red-300">
                  <p className="text-red-800 text-sm font-medium">
                    🚫 Anti-Fraud Alert: This ticket has already been used for entry.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">Anti-Fraud Protection</h3>
            <p className="text-sm text-gray-700">
              Our system ensures each ticket can only be used once. When a ticket is validated,
              it is permanently marked as used in our database, preventing any fraudulent re-entry
              attempts.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
