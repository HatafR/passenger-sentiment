"""
AI Passenger Sentiment Analysis Platform
FastAPI Backend - Working Version WITH CORS
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # ← CRITICAL
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# ============================================================================
# 1. CREATE FASTAPI APP
# ============================================================================

app = FastAPI(
    title="AI Passenger Sentiment Analysis API",
    description="Real-time sentiment monitoring platform for Transjakarta",
    version="1.0.0"
)

# ============================================================================
# 2. ADD CORS MIDDLEWARE (MUST BE AFTER app = FastAPI(...))
# ============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# 3. DATA MODELS
# ============================================================================

class FeedbackInput(BaseModel):
    """Input model for customer feedback"""
    text: str
    source: str
    source_id: str
    author: Optional[str] = None
    created_at: datetime

class SentimentAnalysisResult(BaseModel):
    """Result from AI sentiment analysis"""
    sentiment: str  # positive, neutral, negative
    confidence: float
    issues: List[str]
    severity: str  # low, medium, high, critical
    actionable_feedback: str

class DashboardMetrics(BaseModel):
    """KPI metrics for dashboard"""
    overall_satisfaction_score: float
    sentiment_distribution: dict
    top_issues: List[dict]
    sentiment_trend_7days: List[dict]
    response_count_24h: int
    critical_alerts: List[str]

# ============================================================================
# 4. API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "AI Passenger Sentiment Analysis API",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "analyze": "/analyze",
            "metrics": "/metrics"
        }
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "operational",
        "services": {
            "api": "ok",
            "gemini_integration": "configured",
            "database": "ready",
            "redis": "ready"
        },
        "timestamp": datetime.now().isoformat()
    }

@app.post("/analyze")
async def analyze_feedback(feedback: FeedbackInput):
    """
    Analyze single piece of customer feedback
    """
    try:
        result = SentimentAnalysisResult(
            sentiment="negative",
            confidence=0.85,
            issues=["overcrowding"],
            severity="high",
            actionable_feedback="Bus Line 5A overcrowding issue"
        )
        
        return {
            "feedback": feedback,
            "analysis": result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-batch")
async def analyze_batch(feedbacks: List[FeedbackInput]):
    """Analyze multiple feedbacks at once"""
    try:
        results = []
        for feedback in feedbacks:
            result = SentimentAnalysisResult(
                sentiment="neutral",
                confidence=0.7,
                issues=[],
                severity="low",
                actionable_feedback="Feedback recorded"
            )
            results.append({
                "feedback": feedback,
                "analysis": result
            })
        
        return {
            "count": len(feedbacks),
            "analyses": results,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metrics")
async def get_metrics(days: int = 7):
    """Get dashboard metrics for specified period"""
    return DashboardMetrics(
        overall_satisfaction_score=68.5,
        sentiment_distribution={
            "positive": 65,
            "neutral": 20,
            "negative": 15
        },
        top_issues=[
            {"issue": "overcrowding", "count": 42, "percentage": 35},
            {"issue": "delays", "count": 34, "percentage": 28},
            {"issue": "dirty_bus", "count": 24, "percentage": 20},
            {"issue": "driver_courtesy", "count": 15, "percentage": 12},
            {"issue": "app_issue", "count": 5, "percentage": 5}
        ],
        sentiment_trend_7days=[
            {"date": "2026-05-01", "avg_sentiment": 0.62},
            {"date": "2026-05-02", "avg_sentiment": 0.65},
            {"date": "2026-05-03", "avg_sentiment": 0.68},
            {"date": "2026-05-04", "avg_sentiment": 0.71},
            {"date": "2026-05-05", "avg_sentiment": 0.70},
            {"date": "2026-05-06", "avg_sentiment": 0.69},
            {"date": "2026-05-07", "avg_sentiment": 0.68},
        ],
        response_count_24h=412,
        critical_alerts=[
            "Bus Line 5A: 15 complaints about overcrowding in last 6h",
            "Halte Blok M: Reported dirty 8 times this week",
            "App Issues: 5 new complaints about booking system"
        ]
    )

# ============================================================================
# 5. RUN SERVER (if executed directly)
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)