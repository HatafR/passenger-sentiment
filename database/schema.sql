CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    source VARCHAR(50),
    source_id VARCHAR(255) UNIQUE,
    author VARCHAR(255),
    created_at TIMESTAMP,
    collected_at TIMESTAMP DEFAULT NOW()
  );
  
  CREATE TABLE sentiment_analysis (
    id SERIAL PRIMARY KEY,
    feedback_id INTEGER REFERENCES feedback(id),
    sentiment VARCHAR(20),
    confidence FLOAT,
    issues JSONB,
    severity VARCHAR(20),
    actionable_feedback TEXT,
    analyzed_at TIMESTAMP DEFAULT NOW()
  );
  
  CREATE TABLE daily_metrics (
    id SERIAL PRIMARY KEY,
    analysis_date DATE,
    avg_sentiment FLOAT,
    positive_count INTEGER,
    negative_count INTEGER,
    neutral_count INTEGER,
    issue_distribution JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  );
  
  -- Create indexes for performance
  CREATE INDEX idx_feedback_created_at ON feedback(created_at);
  CREATE INDEX idx_sentiment_analysis_feedback_id ON sentiment_analysis(feedback_id);