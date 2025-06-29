
# 🏥 AIHealthCheck - Intelligent e-Health Platform

AIHealthCheck is a smart e-health platform developed by IT SERV that leverages artificial intelligence to enhance access to healthcare services. The platform integrates state-of-the-art technologies such as Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and medical data visualization to deliver personalized and reliable health assistance.

## 🚀 Features

- ✅ **Symptom Checker**: Provides accurate and fast pre-diagnostic suggestions using NLP and AI.
- 🧠 **Medical Chatbot**: A bilingual (Arabic/French or Arabic/English) conversational agent powered by LLMs.
- 📍 **Healthcare Geolocation**: Helps users locate nearby medical professionals and services.
- 📊 **Data Visualization Dashboard**: For health statistics and symptom trends.
- 🔐 **Secure Medical Data Storage** using MongoDB and advanced data processing pipelines.

## 🧰 Tech Stack

| Component         | Technology                            |
|------------------|----------------------------------------|
| Backend           | Python, FastAPI                       |
| AI / NLP          | HuggingFace Transformers, FAISS, RAG  |
| Data Storage      | MongoDB                               |
| Frontend          | React + TailwindCSS                   |
| Authentication    | OAuth2 / JWT                          |

## 📁 Project Structure

```

AIHealthCheck/
├── app/                  # FastAPI app and endpoints
├── models/               # LLM and RAG implementation
├── data/                 # Medical datasets (e.g., Mayo Clinic)
├── dashboard/            # Visualization UI (e.g., Streamlit)
├── frontend/             # React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── utils/                # Preprocessing and helpers
├── .env.example          # Environment variables
├── requirements.txt      # Python backend dependencies
└── README.md

````

## ⚙️ Installation

### 🔧 Backend Setup

```bash
# Clone the repo
git clone https://github.com/your-username/AIHealthCheck.git
cd AIHealthCheck

# Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
````

### 💻 Frontend Setup (React)

```bash
# Move into the frontend directory
cd aihealthcheck

# Install Node.js dependencies
npm install

# Start the React app
npm run dev
```

> ⚠️ Make sure to update the API base URL in the frontend config (`/src/services/api.js` or `.env`) to point to your backend.

## 🧪 Running the App

```bash
# Start FastAPI backend
cd backend
uvicorn app.main:app --reload

# In another terminal, start the React frontend
cd frontend
npm run dev


```

## 🛡️ Security & Privacy

* Follows HIPAA-compliant practices for health data handling.
* Token-based authentication for user access.
* Anonymized and encrypted patient records.

## 📌 Future Improvements

* Expand to mobile platforms
* Integrate electronic health record (EHR) systems
* Voice-based chatbot interface

## 🤝 Contributors

* Mohamed Amine Missaoui — Data & AI Engineer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> 💬 For questions or support, please contact: [missaouimuhamedamine@gmail.com](mailto:missaouimuhamedamine@gmail.com)



