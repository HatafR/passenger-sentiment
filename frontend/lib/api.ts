import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  // Health check
  healthCheck: async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  },

  // Get metrics
  getMetrics: async (days: number = 7) => {
    const response = await axios.get(`${API_BASE}/metrics?days=${days}`);
    return response.data;
  },

  // Analyze feedback
  analyzeFeedback: async (text: string, source: string) => {
    const response = await axios.post(`${API_BASE}/analyze`, {
      text,
      source,
      source_id: `${Date.now()}`,
      author: 'user',
      created_at: new Date().toISOString(),
    });
    return response.data;
  },
};