# AirBand
AI-Powered Early Respiratory Health Assistant

*A next-generation multimodal health system built using iPhone sensors + HuggingFace HEAR.*

AirBand is a real-time respiratory screening tool that uses only an iPhone microphone and accelerometer to detect early signs of respiratory irregularity. It is designed for hackathons and rapid prototyping where functional, working systems are required.

AirBand combines AI cough analysis + breathing rhythm detection to produce a unified respiratory health score.

---

## Why AirBand?

Most respiratory conditions reveal early biomarkers through:

### 1. Airflow Sound Patterns
Changes in cough acoustics indicate airway obstruction, inflammation, and respiratory stress.  
We use Google's HEAR audio embedding model, trained on hundreds of millions of audio samples, to extract clinically relevant features from cough sounds.

### 2. Breathing Mechanics
Breathing rhythm can be detected via chest movement using the iPhone accelerometer, enabling:
- Breath counting  
- Stability measurement  
- Irregularity detection  

Combining both signals gives a holistic, medically supported profile — without specialized hardware.

---

## Key Features

### 1. Cough Analysis (Audio AI)

- Records ~2 seconds of cough audio  
- Converts to 16 kHz mono  
- Extracts a HEAR acoustic embedding (e.g., 512 dimensions)  
- Computes anomaly scores and classifications

### 2. Breathing Rhythm Detection (Motion AI)

- User places phone on chest
- Collects ~10 seconds of accelerometer data (x, y, z, t)
#### Performs:
- Peak detection
- Breaths per minute (BPM)
- Irregularity index
- Stability metrics

### 3. Combined AirBand Score

Both signals are fused into a single AirBand Score (0–100) with an interpretable risk level:
- Low Risk
- Moderate Risk
- High Risk

## System Architecture
             ┌────────────────────────────┐
             │        iPhone App          │
             │  • Cough recorder          │
             │  • Motion sensor capture   │
             └──────────────┬─────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │     FastAPI      │
                  │  (Processing)    │
                  └──────────────────┘
                        /        \
                       /          \
                      ▼            ▼
         ┌────────────────┐   ┌──────────────────┐
         │  Cough Engine  │   │ Breathing Engine │
         │ (HEAR Embeds)  │   │ (Accelerometer)  │
         └──────┬─────────┘   └─────────┬────────┘
                ▼                       ▼
          ┌────────────────────────────────────┐
          │        AirBand Scoring Engine      │
          └────────────────────────────────────┘
                            │
                            ▼
          ┌───────────────────────────────────┐
          │    UI: Score + Risk + Insights    │
          └───────────────────────────────────┘

## Team Members
- Akshay
- Akshay
- Kunal
- Joevita
- Harini
