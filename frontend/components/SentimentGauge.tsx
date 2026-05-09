'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function SentimentGauge() {
  const [score, setScore] = useState<number>(68.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.getMetrics(7);
        setScore(data.overall_satisfaction_score);
        setError(null);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (score >= 70) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getTextColor = () => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Satisfaction</h2>
      
      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getColor()}
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 283} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getTextColor()}`}>
                  {score.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg">7-day average</p>
        </div>
      )}
    </div>
  );
}