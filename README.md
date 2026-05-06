# AI Passenger Sentiment Analysis Platform

**Real-time Operational Intelligence System for Transjakarta Bus Service**

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-blue)

## 🎯 Overview

This project demonstrates a production-ready operational intelligence platform that monitors customer sentiment across social media channels in real-time. Using AI-powered analysis (Gemini Flash 2.5) and modern system design patterns, the platform helps transit operators detect service issues faster and make data-driven improvements.

**Why This Matters:** Public transportation serves millions daily. Real-time sentiment monitoring enables rapid response to customer complaints, identifies systemic issues (overcrowding, delays), and drives continuous service improvement.

---

## ✨ Key Features

### 🤖 AI-Powered Sentiment Analysis
- **Sentiment Classification**: Automatic categorization (Positive/Neutral/Negative) with confidence scoring
- **Issue Extraction**: Identifies specific pain points (overcrowding, delays, cleanliness, etc.)
- **Severity Assessment**: Classifies issues as low/medium/high/critical for prioritization
- Built with Google Gemini Flash 2.5 API for accuracy and speed

### 📊 Real-Time Dashboard
- **Customer Satisfaction Score**: 7/30/90-day trend tracking
- **Issue Frequency Distribution**: Visual breakdown of top problems
- **Sentiment Heatmap**: Identify problem areas by bus line
- **Critical Alerts**: Instant notifications for service quality drops
- **Actionable Insights**: Automatic summaries for operations teams

### 🏗️ Enterprise-Grade Architecture
- **Scalable Backend**: FastAPI with async processing
- **Efficient Data Layer**: PostgreSQL + Redis caching
- **Real-time Updates**: WebSocket support for live dashboards
- **Containerized Deployment**: Docker + Docker Compose for consistency
- **API-First Design**: RESTful endpoints with OpenAPI documentation

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend** | FastAPI (Python) | High-performance API server |
| **AI/ML** | Google Gemini Flash 2.5 | Sentiment analysis & issue extraction |
| **Frontend** | Next.js + React + Recharts | Interactive dashboard & visualization |
| **Database** | PostgreSQL | Persistent data storage |
| **Cache** | Redis | Session management & performance optimization |
| **Containerization** | Docker + Docker Compose | Consistent deployment across environments |
| **Deployment** | Vercel (frontend) + Railway (backend) | Production hosting |

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- Python 3.11+ (if running without Docker)
- Node.js 18+ (for frontend development)
- Google Gemini API Key ([Get here](https://ai.google.dev/))

### Option 1: Docker (Recommended)
```bash
# Clone repository
git clone https://github.com/yourusername/ai-passenger-sentiment-analysis.git
cd ai-passenger-sentiment-analysis

# Create environment file
cp .env.example .env
# Edit .env with your GEMINI_API_KEY

# Start all services
docker-compose up --build

# Services available at:
# API: http://localhost:8000
# Dashboard: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

### Option 2: Local Development
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (in new terminal)
cd frontend
npm install
npm run dev

# Access at http://localhost:3000
```

---

## 📋 API Documentation

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.yourdomain.com`

Interactive API documentation available at `/docs` (Swagger UI)

### Key Endpoints

#### Analyze Single Feedback
```bash
POST /analyze
Content-Type: application/json

{
  "text": "Bus 5A sangat penuh, tidak bisa naik. Halte juga kotor.",
  "source": "twitter",
  "source_id": "tweet_12345",
  "author": "user123",
  "created_at": "2026-05-06T10:30:00Z"
}

Response:
{
  "feedback": { ... },
  "analysis": {
    "sentiment": "negative",
    "confidence": 0.92,
    "issues": ["overcrowding", "dirty_halte"],
    "severity": "high",
    "actionable_feedback": "Bus Line 5A capacity issue and halte maintenance needed"
  },
  "timestamp": "2026-05-06T10:35:00Z"
}
```

#### Batch Analysis
```bash
POST /analyze-batch
Content-Type: application/json

{
  "feedbacks": [
    { "text": "...", "source": "twitter", ... },
    { "text": "...", "source": "instagram", ... }
  ]
}
```

#### Get Dashboard Metrics
```bash
GET /metrics?days=7

Response:
{
  "overall_satisfaction_score": 68.5,
  "sentiment_distribution": {
    "positive": 65,
    "neutral": 20,
    "negative": 15
  },
  "top_issues": [
    {"issue": "overcrowding", "count": 42, "percentage": 35},
    {"issue": "delays", "count": 34, "percentage": 28},
    ...
  ],
  "sentiment_trend_7days": [ ... ],
  "critical_alerts": [ ... ]
}
```

Full API documentation in `/docs` endpoint.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│          DATA COLLECTION LAYER                          │
│  • Social Media Scrapers (Twitter, Instagram, etc)      │
│  • API Integrations (Google Maps Reviews)               │
│  • Direct Feedback Forms                                │
└────────────────┬────────────────────────────────────────┘
                 │ Raw Feedback
┌────────────────▼────────────────────────────────────────┐
│        AI PROCESSING LAYER (FastAPI)                    │
│  • Gemini Flash 2.5 Sentiment Classification            │
│  • Issue Extraction & Categorization                    │
│  • Severity Scoring & Trend Detection                   │
└────────────────┬────────────────────────────────────────┘
                 │ Analyzed Data
┌────────────────▼────────────────────────────────────────┐
│        DATA MANAGEMENT LAYER                            │
│  • PostgreSQL: Persistent storage                       │
│  • Redis: Caching & real-time updates                   │
│  • Elasticsearch: Full-text search (optional)           │
└────────────────┬────────────────────────────────────────┘
                 │ Metrics & Insights
┌────────────────▼────────────────────────────────────────┐
│      PRESENTATION LAYER (Next.js Dashboard)             │
│  • Real-time Metrics Visualization                      │
│  • Interactive Charts & Heatmaps                        │
│  • Alert Management System                              │
│  • Report Generation & Export                           │
└─────────────────────────────────────────────────────────┘
```

---

## 💾 Database Schema

### Core Tables

**feedback** (raw customer feedback)
```sql
id (PK) | text | source | source_id | author | created_at | collected_at
```

**sentiment_analysis** (AI analysis results)
```sql
id (PK) | feedback_id (FK) | sentiment | confidence | issues | severity | actionable_feedback | analyzed_at
```

**daily_metrics** (aggregated KPIs)
```sql
id (PK) | date | avg_sentiment | positive_count | negative_count | issue_distribution | created_at
```

**alerts** (critical issues)
```sql
id (PK) | title | description | severity | status | created_at | resolved_at
```

See `database/schema.sql` for complete schema definition.

---

## 📊 Dashboard Features

### Real-Time Monitoring
- **Live Sentiment Gauge**: Current satisfaction score with visual indicator
- **Issue Frequency**: Top problems this week/month with trends
- **Sentiment Timeline**: 7/30/90-day trend chart
- **Bus Line Heatmap**: Identify which routes have quality issues
- **Alert Bell**: Critical issues requiring immediate attention

### Reporting
- **Export Metrics**: Download as PDF or CSV
- **Custom Date Range**: Analyze any time period
- **Comparison View**: Week-over-week / Month-over-month analysis
- **Issue Drill-Down**: Click issue to see all related feedback

---

## 🔒 Security Features

- **JWT Authentication**: Secure API access
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Pydantic schema validation
- **Environment Variables**: Sensitive data never hardcoded
- **HTTPS/TLS**: Encrypted data in transit
- **Database Security**: SQL injection prevention via SQLAlchemy ORM

---

## 📈 Performance Optimization

- **Redis Caching**: Dashboard metrics cached for 1 hour
- **Batch Processing**: Handle 1000+ feedback items efficiently
- **Database Indexing**: Optimized queries on frequently accessed columns
- **Async I/O**: Non-blocking API calls to Gemini
- **Connection Pooling**: Reuse database/Redis connections

**Benchmarks** (local testing):
- Single feedback analysis: ~800ms (including API call)
- Batch processing (100 items): ~12s
- Dashboard metric generation: <200ms (from cache)
- Real-time update delivery: <100ms

---

## 🧪 Testing

```bash
# Run unit tests
pytest tests/unit/

# Run integration tests
pytest tests/integration/

# Generate coverage report
pytest --cov=app tests/

# Load testing with Locust
locust -f tests/load/locustfile.py
```

---

## 📚 Project Structure

```
ai-passenger-sentiment-analysis/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── services/
│   │   ├── sentiment_analyzer.py
│   │   ├── data_collector.py
│   │   └── dashboard_service.py
│   ├── models/
│   │   ├── database.py        # SQLAlchemy models
│   │   └── schemas.py         # Pydantic schemas
│   ├── routes/
│   │   ├── sentiment.py
│   │   ├── metrics.py
│   │   └── health.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── pages/
│   │   ├── index.tsx          # Main dashboard
│   │   ├── _app.tsx
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── MetricsCard.tsx
│   │   ├── SentimentChart.tsx
│   │   └── AlertBell.tsx
│   ├── styles/
│   ├── package.json
│   ├── Dockerfile
│   └── .env.local.example
│
├── database/
│   ├── schema.sql             # Database schema
│   └── migrations/
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

## 🚢 Deployment

### Deploy to Vercel (Frontend)
```bash
# Connect GitHub repository to Vercel project
# Set environment variables (NEXT_PUBLIC_API_URL)
# Automatic deployment on push to main branch
```

### Deploy Backend to Railway (or similar)
```bash
# Create new project
# Connect GitHub repository
# Set environment variables
# Deploy from docker-compose.yml
```

### Environment Variables Required
```
GEMINI_API_KEY=<your_key>
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
ENVIRONMENT=production
```

---

## 📝 API Request Examples

### cURL
```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Bus sangat penuh dan kotor",
    "source": "twitter",
    "source_id": "tweet_123",
    "created_at": "2026-05-06T10:00:00Z"
  }'
```

### Python
```python
import httpx

async with httpx.AsyncClient() as client:
    response = await client.post(
        "http://localhost:8000/analyze",
        json={
            "text": "Bus sangat penuh",
            "source": "twitter",
            "source_id": "tweet_123",
            "created_at": "2026-05-06T10:00:00Z"
        }
    )
    print(response.json())
```

### JavaScript/Node.js
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: "Bus sangat penuh",
    source: "twitter",
    source_id: "tweet_123"
  })
});
```

---

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Fatah Rizqi Safrudin**
- 📧 Email: rizz.fatah@gmail.com
- 💼 LinkedIn: [linkedin.com/in/fatah-rizqi-safrudin/](https://linkedin.com/in/fatah-rizqi-safrudin/)
- 🌐 Portfolio: [bit.ly/fatahrizqis-portofolio](https://bit.ly/fatahrizqis-portofolio)

---

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- FastAPI for excellent web framework
- React & Next.js communities
- Transjakarta for inspiration

---

## 📞 Support

For questions or issues:
1. Check [FAQ](docs/FAQ.md)
2. Review [existing issues](../../issues)
3. Open a [new issue](../../issues/new)

---

**⭐ If this project helped you, please consider giving it a star!**

Last Updated: May 2026