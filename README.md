# 🏡 Flex Living | Reviews Management Suite

A full-stack technical assessment project featuring a premium Manager Dashboard and a high-end consumer property details page. This application demonstrates API integration, data normalization, and a "Product-First" design approach.

## 🚀 Live Demo Flow
1. **Manager Dashboard**: Moderate reviews, track property performance, and spot cleanliness trends.
2. **Persistence**: Toggling visibility saves the state to a local JSON database.
3. **Property Page**: View a cinematic carousel and verified guest reviews (only those approved by the manager).

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (Premium Navy/White Theme)
- **Icons**: Lucide React
- **Persistence**: Node.js File System (`fs`) with JSON-based storage
- **Integration**: Hostaway API & Google Places API Exploration

---

## 🧠 Key Design & Logic Decisions

### **1. Data Normalization Engine**
Hostaway and Google use different scoring metrics (10-point categories vs. 5-star integers). I implemented a custom normalization layer on the backend to:
- Aggregate sub-category scores (Cleanliness, Communication, etc.).
- Standardize all ratings into a unified 5-star UI system.
- Format dates and source branding (Google/Hostaway) into a consistent schema.

### **2. Manager Moderation Workflow**
To bridge the internal and external views, I built a persistence bridge:
- **Admin Context**: Dashboard updates the local `reviews.json` via a POST route.
- **Public Context**: The `/property/[id]` page performs a Server-Side filter to ensure unapproved reviews never reach the client, maintaining brand safety.

### **3. Cinematic UX (Bento & Carousel)**
Focusing on the "High-end" requirement, the property page features:
- **Responsive Carousel**: Optimized for large laptop screens and mobile touch-gestures (PWA ready).
- **Adaptive Grid**: A layout that breathes, utilizing generous whitespace and a minimalist aesthetic inspired by the Flex Living brand.

---

## 🔍 Technical Exploration: Google Integration

### **Google Reviews**
- **Findings**: Implementation is feasible via the **Google Places API (New)** for real-time "Top 5" fetching. For enterprise-scale features (replies, full history), the **Google Business Profile API** is required.
- **Implementation**: The current architecture is "Channel-Agnostic." The UI is ready to render Google branding as soon as the API key is connected.

### **Google Maps**
- **Findings**: Essential for location context.
- **Architectural Decision**: I recommend using a grayscale-filtered map overlay to maintain brand minimalism. I have documented the required CSS filters in the code to ensure the map doesn't clash with the primary brand palette.

---

## 📡 API Behavior

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/hostaway` | `GET` | Authenticates with Hostaway, fetches data, and normalizes it. |
| `/api/hostaway/update` | `POST` | Persists manager approval states to the JSON database. |
| `/api/property/[id]` | `GET` | Fetches listing-specific data, filtering only approved reviews. |

---

## ⚙️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone [your-repo-link]
   cd flex-reviews

   Install dependencies:

npm install

Environment Setup: Create a .env.local if using real API keys:

Code snippet

NEXT_PUBLIC_BASE_URL=http://localhost:3000
Run development server:

npm run dev
Access the application:

Dashboard: http://localhost:3000/dashboard

Property View: http://localhost:3000/property/7453

📂 Project Structure
/app/api: Serverless functions for Hostaway and Property logic.

/app/dashboard: Internal moderation tools.

/app/property/[id]: Dynamic public property pages.

/data: Local persistence storage.
