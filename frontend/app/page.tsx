'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import SentimentGauge from '@/components/SentimentGauge';
import TopIssues from '@/components/TopIssues';
import SentimentTrend from '@/components/SentimentTrend';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.healthCheck();
        setConnected(true);
      } catch (err) {
        console.error('Backend not connected:', err);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900">
            AI Passenger Sentiment Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring platform for Transjakarta
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        {loading ? (
          <div className="bg-blue-100 text-blue-800 p-4 rounded">
            Checking connection...
          </div>
        ) : connected ? (
          <div className="bg-green-100 text-green-800 p-4 rounded">
            ✅ Connected to backend
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 p-4 rounded">
            ❌ Backend not responding. Make sure backend is running: uvicorn main:app --reload
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Sentiment Gauge */}
          <div>
            <SentimentGauge />
          </div>

          {/* Right: Top Issues */}
          <div>
            <TopIssues />
          </div>
        </div>

        {/* Full Width: Sentiment Trend */}
        <div className="mb-8">
          <SentimentTrend />
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Dashboard Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Backend Status</p>
              <p className="text-lg font-semibold text-green-600">
                {connected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">API Base URL</p>
              <p className="text-lg font-semibold text-blue-600">
                http://localhost:8000
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Update Frequency</p>
              <p className="text-lg font-semibold text-purple-600">
                Every 30 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}