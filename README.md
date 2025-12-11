# **SUMA AI – News and Video Summarizer**
A multimodal AI system for summarizing long news articles and video content using Whisper and a fine tuned BART model.

---

## **📌 Overview**

SUMA AI is a multimodal summarization system designed to simplify information consumption. It generates concise summaries from long news articles or video content through an end to end pipeline that integrates OpenAI Whisper for speech transcription and a fine tuned BART model for abstractive summarization.

Users can paste a news URL or upload a video file, and SUMA AI will produce a structured and readable summary.

---

## **🚀 Features**

### **Text Summarization**
- Summarizes long news articles into compact, coherent outputs.
- Powered by a fine tuned BART summarization model.

### **Video Summarization**
- Extracts audio from uploaded videos.
- Whisper Small transcribes speech into text.
- BART generates an abstractive summary from the transcription.

### **Full Stack Implementation**
- **Frontend:** Next.js with a modern UI, loading states, progress indicators.
- **Backend:** FastAPI for efficient inference and file processing.
- **Model Hosting:** HuggingFace Hub.
- **Deployment:** Vercel for frontend and HuggingFace Spaces for backend.

---
## **🧠 System Architecture**

### **1. User Input**
- News article link  
- Video upload (MP4, MOV, MKV, WAV)

### **2. Processing**
- Text: extract and clean article content  
- Video: extract audio and transcribe using Whisper  

### **3. Summarization**
- BART model generates an abstractive summary from text or transcription.

### **4. Output**
- Summary returned to the frontend, displayed in a clean and readable layout.

---

## **🛠 Technologies Used**

### **Frontend**
- Next.js  
- React  
- TypeScript  
- TailwindCSS  
- Axios  

### **Backend**
- FastAPI  
- Python  
- PyTorch  
- HuggingFace Transformers  
- Whisper ASR  

### **Model**
- Fine tuned **BART-base**  
- **Whisper Small** for speech-to-text  

### **Deployment**
- Vercel (Frontend)  
- HuggingFace Spaces (Backend)  
- HuggingFace Hub (Model hosting)

---

## **📊 Model Training**

### **Dataset**
- CNN/DailyMail  
- Train: 95k samples  
- Validation: 13k samples  
- Test: 11k samples  

### **Training Setup**
- GPU: NVIDIA RTX 3060  
- Optimizer: Adafactor  
- Epochs: 6  
- FP16 mixed precision  
- Max input length: 768  
- Max summary length: 256  

### **Evaluation Metrics**
| Model                     | ROUGE-1 | ROUGE-2 | ROUGE-L | ROUGE-Lsum |
|--------------------------|---------|---------|----------|--------------|
| Fine Tuned BART          | 35.98   | 15.59   | 26.21    | 33.20       |
| Pretrained BART Baseline | 30.51   | 12.79   | 19.98    | 24.58       |

The fine tuned model shows clear improvement across all ROUGE metrics.

---

## **📘 Example Workflow**

**Video Input → Audio Extraction → Whisper Transcription → BART Summary → Output**  
**News URL Input → Scraping → Cleaning → BART Summary → Output**

---

## **👥 Team Contribution**

**I Kadek Defa Danuarta**  
Front end developer and UI UX designer.

**Kevin Joseph Handoyo**  
AI engineer and backend developer.

**Kristian Binsar Pardamean Pasaribu**  
Researcher, report writer, and DevOps engineer.

---

## **📎 Documentation**

Full project documentation and implementation details are included in the **Final Report**.

All code and training scripts are available in this repository.
