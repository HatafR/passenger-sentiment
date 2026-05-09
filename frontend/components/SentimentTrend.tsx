'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SentimentTrend() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metrics = await api.getMetrics(7);
        const chartData = metrics.sentiment_trend_7days.map((item: any) => ({
          date: item.date,
          sentiment: (item.avg_sentiment * 100).toFixed(1),
        }));
        setData(chartData);
      } catch (err) {
        console.error('Error fetching trend:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sentiment Trend (7 Days)</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sentiment" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Satisfaction %"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}