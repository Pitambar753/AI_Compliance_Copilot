# AI Compliance Copilot

This repository contains the code for a group project focused on automating the monitoring of RBI and SEBI regulatory documents. The system leverages Retrieval-Augmented Generation (RAG), multi-agent LLM workflows, and data pipelines to ingest, process, and analyze financial regulations against internal bank policies.

## Problem Statement

Financial institutions must constantly monitor and adapt to regulatory updates from authorities like the Reserve Bank of India (RBI) and the Securities and Exchange Board of India (SEBI). Manually reading, analyzing, and mapping these circulars to internal Standard Operating Procedures (SOPs) is time-consuming and prone to human error, potentially leading to compliance violations.

## Solution

We developed a multi-agent AI system that automates the regulatory compliance workflow. The system runs scheduled pipelines to ingest new circulars, extracts text from unstructured documents using OCR, and indexes the content in a vector database. A LangGraph-based multi-agent workflow then retrieves relevant policy chunks and uses LLMs to compare the new regulations against internal policies, generating drift scores and compliance tickets.

## Key Features

- **Automated Data Ingestion**: Scheduled pipelines to fetch and deduplicate regulatory circulars from RBI and SEBI.
- **Document Processing Pipeline**: Extracts text from PDFs and scanned documents using PyMuPDF and PaddleOCR, followed by NLP-based sentence chunking.
- **Vector Search & RAG**: Uses BAAI/bge embeddings and Milvus for high-speed semantic retrieval and cross-encoder reranking.
- **Multi-Agent Analysis**: A LangGraph orchestrated workflow with specialized agents for classification, policy mapping, and ticket generation.
- **Automated Workflow Orchestration**: Apache Airflow DAGs schedule the end-to-end pipeline.

## Architecture / Workflow

Regulatory Documents
        ?
Document Ingestion (RSS/Scrapers)
        ?
OCR / Text Extraction (PyMuPDF, PaddleOCR, spaCy)
        ?
Chunking + Embeddings (BGE-large)
        ?
Milvus Vector Database
        ?
RAG Retrieval (Hybrid BM25 + Dense Search)
        ?
LangGraph / Agent Workflow
        ?
LLM Analysis (vLLM / Llama 3)
        ?
Compliance Output / API / Interface

## Technology Stack

### AI / GenAI
- **LLM & Orchestration**: LangChain, LangGraph, vLLM, Llama 3
- **Embeddings & Search**: BAAI/bge-large-en-v1.5, BAAI/bge-reranker-large
- **NLP & Document Processing**: spaCy, PaddleOCR, PyMuPDF

### Data Engineering & Backend
- **Data Pipeline**: Apache Airflow
- **Backend API**: FastAPI, Python
- **Database / Vector Database**: Milvus (Vector Search), AWS RDS PostgreSQL (Relational Metadata), SQLite (Local)
- **Cloud Storage**: AWS S3 (Raw Documents), AWS EC2 (Hosting)

### Frontend
- **Interface**: React, Vite (used primarily to interact with the backend APIs and display generated compliance tickets)

## Project Structure

- dags/ - Apache Airflow DAGs for scheduling data pipelines.
- data/ - Contains sample internal bank policies and raw ingested documents.
- src/ - Core Python backend containing the RAG engine, Milvus DB connection, text processors, and LangGraph agents.
- scripts/ - Cloud deployment scripts for AWS RDS and EC2 instances.
- 	ests/ - Unit tests.
- rontend/ - React frontend application.

## Setup

1. **Install Python dependencies:**
   ``bash
   pip install -r requirements.txt
   ``

2. **Setup Frontend (Optional):**
   ``bash
   cd frontend
   npm install
   ``

## Environment Variables

Create a .env file in the root directory based on .env.example. Do not commit your real .env file. 

Example configuration placeholders:
``env
OLLAMA_BASE_URL=http://localhost:11434
LLM_MODEL=llama3.1:latest
EMBEDDING_MODEL=nomic-embed-text
DB_PATH=db/compliance.db
VECTORSTORE_DIR=vectorstore
POLLING_INTERVAL_HOURS=6
MILVUS_HOST=localhost
MILVUS_PORT=19530
``

## Running the Project

1. **Start the FastAPI Backend:**
   ``bash
   uvicorn src.api:app --host 0.0.0.0 --port 8001
   ``

2. **Start the Airflow Scheduler (Windows):**
   ``cmd
   start_airflow.bat
   ``

3. **Start the Frontend Dashboard:**
   ``bash
   cd frontend
   npm run dev
   ``

## Project Status

The project successfully demonstrates an end-to-end automated compliance pipeline from data ingestion to ticket generation. 

## Team

This project was developed collaboratively as a group project to explore the applications of Generative AI, RAG, and Data Engineering in the RegTech domain.
