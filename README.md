# AirBand
AI-Powered Early Respiratory Health Assistant

*A next-generation multimodal health system built using iPhone sensors*

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
         │ (Grok Embeds)  │   │ (Accelerometer)  │
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
- Akshay Kumaran
- Akshay Keerthi
- Kunal
- Joevita
- Harini
