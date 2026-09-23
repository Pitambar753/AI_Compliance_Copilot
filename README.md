# AI Compliance Copilot — Enterprise Regulatory Drift Engine (Bank of India)

An automated, multi-agent AI system designed for Indian Banks and BFSI institutions to monitor regulatory circulars from **SEBI** and **RBI**, detect policy drift against internal Bank of India Standard Operating Procedures (SOPs), and generate compliance tickets and policy patches.

[![AWS Deployed](https://img.shields.io/badge/AWS-ap--south--1%20Mumbai-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](http://localhost:8001)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](http://localhost:5173)
[![Airflow](https://img.shields.io/badge/Apache_Airflow-017CEE?style=for-the-badge&logo=apache-airflow&logoColor=white)](http://localhost:8080)
[![Milvus](https://img.shields.io/badge/Milvus_Vector_DB-00A4E4?style=for-the-badge&logo=milvus&logoColor=white)]()

---

## 🚀 Live Cloud Deployment & Endpoints

* **AWS Cloud Live Production URL**: `http://<YOUR-EC2-IP>` *(Deployed on AWS EC2)*
* **Local Web Application**: `http://localhost:5173`
* **Local FastAPI REST Service**: `http://localhost:8001`
* **Apache Airflow Dashboard**: `http://localhost:8080`
* **Demo Access Roles**:
  * **Compliance Officer**: `officer@example.com` / `Officer123!` *(Full Policy & Ticket Access)*
  * **Read-Only Auditor**: `auditor@example.com` / `Auditor123!` *(Read-Only Inspection Mode)*
  * **System Admin**: `admin@example.com` / `Admin123!` *(System & User Management)*

---

## 🛠️ Comprehensive Tech Stack Deep-Dive

### 1. 🤖 AI Multi-Agent & Orchestration Engine
* **LangGraph**: Orchestrates a 3-agent state graph pipeline for regulatory classification, policy drift scoring, and automated compliance ticket generation.
* **vLLM / Llama 3.1 & 3.3**: Serves high-throughput LLM reasoning for regulatory gap analysis, executive summaries, and clause-level policy patch generation.

### 2. ⚡ Vector Search & RAG Embeddings
* **Milvus Vector DB**: Enterprise distributed vector database utilizing HNSW graph indexing for high-speed vector retrieval across policy chunks (`src/milvus_engine.py`).
* **BAAI/bge-large-en-v1.5**: 768-dimensional dense vector embedding model for semantic similarity representation (`src/embeddings.py`).
* **BAAI/bge-reranker-large**: Cross-encoder reranking model that scores retrieved candidate chunks against SEBI & RBI queries to maximize precision.
* **BM25 Hybrid Retrieval**: Combines sparse keyword search with dense vector embeddings for hybrid retrieval.

### 3. ☁️ AWS Cloud Infrastructure (`ap-south-1` Mumbai)
* **AWS RDS PostgreSQL (`boi-compliance-rds`)**: Managed relational database storing all metadata, circular queue items, active compliance tickets, policy patches, and audit logs.
* **AWS S3 (`boi-compliance-raw-documents`)**: Object storage bucket staging all raw Bank of India internal policy PDFs and ingested regulatory circular files.
* **AWS EC2 (`<YOUR-EC2-IP>`)**: Production Ubuntu Linux server running Nginx reverse proxy, Systemd API daemons, and automated deployments.

### 4. 👁️ Document Extraction & Deep Learning OCR
* **PyMuPDF (`fitz`)**: Fast digital text extraction for structured PDF documents.
* **PaddleOCR**: State-of-the-art deep learning optical character recognition engine (`from paddleocr import PaddleOCR`) for extracting text from scanned PDF pages, complex financial tables, and diagrams with angle classification (`src/processor.py`).
* **spaCy (`en_core_web_sm`)**: Linguistic preprocessor for sentence segmentation and overlapping text chunking.

### 5. ⏱️ Automation & Workflow Scheduling
* **Apache Airflow**: Automated 6-hour cron scheduler (`0 */6 * * *`) that triggers end-to-end ingestion, OCR text processing, vector synchronization, and multi-agent execution (`dags/compliance_dag.py`).

### 6. ⚛️ Frontend & Design System
* **React 19 + Vite**: Modern single-page web application featuring mixed typography, dark glassmorphism styling (`#07080C` obsidian background), live metrics ticker, and high-contrast text rendering.
* **JWT & Role-Based Access Control (RBAC)**: Enforces role-tailored dashboards for Compliance Officers, Auditors, and System Admins (`src/auth.py`).

---

## 🏛️ 5-Layer Enterprise System Architecture

```
+-----------------------------------------------------------------------------------+
| LAYER 1: DATA INGESTION (src/ingestion.py & src/s3_storage.py)                    |
| - Live SEBI & RBI RSS Ingestion                                                   |
| - SHA-256 Deduplication                                                           |
| - AWS S3 Raw PDF Storage (s3://boi-compliance-raw-documents/)                     |
| - AWS RDS PostgreSQL Circular Queue (boi-compliance-rds)                          |
+-----------------------------------------------------------------------------------+
                                      |
                                      v
+-----------------------------------------------------------------------------------+
| LAYER 2: DOCUMENT PROCESSING & OCR (src/processor.py)                             |
| - PyMuPDF Page-by-Page Digital Text Extraction                                    |
| - PaddleOCR Deep Learning Engine for Scanned Pages & Tables                      |
| - spaCy Sentence Tokenization & Overlapping 400-Word Chunking                     |
+-----------------------------------------------------------------------------------+
                                      |
                                      v
+-----------------------------------------------------------------------------------+
| LAYER 3: RAG & HYBRID VECTOR STORE (src/embeddings.py & src/milvus_engine.py)     |
| - BAAI/bge-large-en-v1.5 Dense Embeddings (768-dim)                               |
| - Milvus HNSW Vector Indexing                                                     |
| - BAAI/bge-reranker-large Cross-Encoder Scoring                                  |
+-----------------------------------------------------------------------------------+
                                      |
                                      v
+-----------------------------------------------------------------------------------+
| LAYER 4: MULTI-AGENT LANGGRAPH ENGINE (src/agents.py)                             |
| - Agent 1: Classifier Agent (Domain & Directive Tagging)                          |
| - Agent 2: Policy Mapper Agent (Drift Score D in [0.0, 1.0])                      |
| - Agent 3: Advisor Agent (Policy Patch & Compliance Ticket Generation)            |
| - Audit Logger: Writes to compliance_audit Table                                  |
+-----------------------------------------------------------------------------------+
                                      |
                                      v
+-----------------------------------------------------------------------------------+
| LAYER 5: AIRFLOW SCHEDULER & REACT UI (dags/compliance_dag.py & frontend/)        |
| - Apache Airflow 6-Hour Cron Scheduler (0 */6 * * *)                              |
| - React 19 Dark Glassmorphic Dashboard                                            |
| - Executive Summaries, Gap Assessments, and Policy Patch Editors                  |
+-----------------------------------------------------------------------------------+
```

---

## 📁 Repository Structure

```
AI_Compliance_Copilot/
├── dags/
│   └── compliance_dag.py            # Apache Airflow 6-Hour Pipeline DAG
├── data/
│   └── bank_policies/              # Internal Bank of India Policy PDFs
├── frontend/                       # React 19 + Vite Single Page Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminView.jsx       # System Admin & User Management
│   │   │   ├── AuditView.jsx       # Regulatory Audit Trail & CSV Export
│   │   │   ├── ChatView.jsx        # RAG AI Conversational Copilot
│   │   │   ├── DriftView.jsx       # Drift Analytics & Heatmaps
│   │   │   ├── LandingView.jsx     # Nexa Landing & Feature Showcase
│   │   │   ├── LoginView.jsx       # Enterprise JWT RBAC Login
│   │   │   ├── Navbar.jsx          # Header with Live Airflow Reverse Timer
│   │   │   ├── TicketsView.jsx     # Compliance Tickets & Policy Patch Editor
│   │   │   └── UploadAuditView.jsx # Audit Policy & Target Regulation Selector
│   │   ├── App.jsx                 # View Mode & Navigation Controller
│   │   ├── index.css               # Dark Glassmorphic Design Tokens
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── scripts/
│   ├── backfill_s3.py              # AWS S3 Bulk Upload Script
│   ├── deploy_aws_rds.py           # AWS RDS PostgreSQL Provisioner
│   ├── migrate_sqlite_to_rds.py    # SQLite to AWS RDS Migration Script
│   └── reset_and_run.py            # Reset Queue & Run Multi-Agent Engine
├── src/
│   ├── agents.py                   # LangGraph 3-Agent Workflow
│   ├── api.py                      # FastAPI REST API Backend
│   ├── auth.py                     # JWT Authentication & RBAC Engine
│   ├── db.py                       # AWS RDS PostgreSQL & SQLite Manager
│   ├── embeddings.py               # BGE Embeddings & Reranker Engine
│   ├── evaluation.py               # Dynamic RAGAS Benchmark Engine
│   ├── ingestion.py                # Layer 1 SEBI & RBI Crawler
│   ├── milvus_engine.py            # Milvus HNSW Vector DB Connection
│   ├── processor.py                # PyMuPDF & PaddleOCR Text Extractor
│   └── s3_storage.py               # AWS S3 Storage Manager
├── requirements.txt                # Python Dependencies
├── start_airflow.bat               # 1-Click Local Airflow Launcher
└── README.md
```

---

## ⚡ Quickstart Setup

### 1. Install Dependencies
```bash
# Install Python backend packages
pip install -r requirements.txt

# Install React frontend packages
cd frontend
npm install
```

### 2. Start FastAPI Backend Server
```bash
# Starts backend server on http://localhost:8001
uvicorn src.api:app --host 0.0.0.0 --port 8001
```

### 3. Start React Frontend Dashboard
```bash
cd frontend
npm run dev
# Dashboard opens on http://localhost:5173
```

### 4. Launch Airflow 6-Hour Automated Scheduler
```cmd
start_airflow.bat
# Opens Airflow UI on http://localhost:8080
```