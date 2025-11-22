# HackIndia2026
Official Repo for HackIndia 2026 submission
RAKSHAK — AI-Powered Phishing & Malicious URL Detection System

Rakshak is an AI-driven cybersecurity tool designed to detect phishing, malware, defacement, and other malicious URLs. It combines Machine Learning, Sandboxing, Behavioral Analysis, and Explainable AI to provide enterprise-grade security for users and organizations.

🔥 Key Features
1. AI-Based URL Classification

Deep learning LSTM/CNN model

Character-level tokenization for URLs

Trained on large phishing datasets

Supports multiple labels: benign, phishing, malware, defacement

2. Sandboxed URL Execution

Rakshak safely opens suspicious URLs inside a fully isolated and temporary sandbox:

Browser automation

System call tracing

Network request inspection

JavaScript behavior monitoring

Redirection chain tracking

The sandbox is destroyed immediately after every analysis.

🔐 Rakshak’s Own Security (Defense-in-Depth)
1. Identity & Access Security

MFA + SSO authentication

Strict role-based access control (RBAC)

Just-in-time admin access

Secrets stored securely using Vault / Cloud KMS

2. Infrastructure Hardening

Immutable servers with Infrastructure-as-Code

Non-privileged containers with seccomp and AppArmor

MicroVM-based sandboxing (Firecracker / gVisor)

Read-only root filesystem

3. Network Security

Segmented networks (API / Sandbox / Model Training)

WAF and DDoS protection

Proxy-based outbound monitoring

Egress allowlists

4. AI & Model Security

Model artifact signing and verification

Dataset provenance tracking

Drift and poisoning detection systems

Canary + shadow deployment for model updates

5. CI/CD & Supply Chain Security

Signed build pipelines

Dependency and image vulnerability scanning

Automatic patching of vulnerable components

Mandatory code review

6. Monitoring & Incident Response

Centralized logging with SIEM

Real-time alerts for anomalies

Endpoint detection on critical nodes

Full incident response runbook & disaster recovery plan

🤖 Technical Pipeline
1. Data Processing

URL → Cleaning → Character Tokenization → Sequence → Embedding → LSTM/CNN → Classification

2. Sandbox Behavioral Analysis

Launch URL inside isolated virtual environment

Capture behavioral IOCs

Score malicious actions

3. Final Verdict

The final decision combines:

ML prediction

Sandbox behavior score

Heuristics and rule-based indicators

💻 Tech Stack

Python, TensorFlow, Scikit-Learn

FastAPI backend

Docker, Firecracker, gVisor

Puppeteer for browser-based behavior analysis

Vault/KMS for secret management

Elasticsearch/Loki for SIEM

📁 Project Structure
PROJECT_RAKSHAK/
│
├── models/               # Trained models & signatures
├── sandbox/              # Virtual sandbox environment
├── api/                  # FastAPI backend
├── ml/                   # Tokenizer, training scripts
├── utils/                # Logging & security utilities
├── README.md
└── requirements.txt

🚀 Deployment
1. Train Model
