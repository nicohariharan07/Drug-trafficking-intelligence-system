# AI-Based Cross-Platform Drug Trafficking Intelligence System

## 🎯 Project Overview

A professional, intelligence-grade web application designed for final-year engineering major project submission. This system provides AI-based decision support for law enforcement agencies to identify suspicious behavioral patterns across multiple online platforms.

## 🚀 Features

### ✅ Complete Pages
1. **Login Page** - Secure authentication with @drugcommision.com validation
2. **Dashboard** - Real-time intelligence overview with summary cards and charts
3. **Reports** - Detailed cluster analysis with color-coded risk indicators
4. **Networks** - Behavioral correlation visualization
5. **Alerts** - Security alerts with severity filtering
6. **Trends** - Temporal analysis with interactive charts
7. **About/Ethics** - Comprehensive ethical guidelines and privacy commitments

### 🎨 Design Features
- **Dark, Cinematic Theme** - Black/dark gray gradients with glassmorphism effects
- **Color-Coded Risk Levels**:
  - 🔴 Red = High Risk
  - 🟡 Yellow = Medium Risk
  - 🟢 Green = Low Risk
- **Smooth Animations** - Professional fade-in transitions
- **Responsive Design** - Works on desktop and tablet devices

### 🔐 Authentication
- Email validation requiring @drugcommision.com domain
- Protected routes with automatic redirect
- Session persistence with localStorage

### 🔌 Backend Integration
All pages are configured to fetch data from REST APIs:

```javascript
GET http://localhost:5000/api/summary    // Dashboard data
GET http://localhost:5000/api/alerts     // Alert notifications
GET http://localhost:5000/api/reports    // Cluster reports
GET http://localhost:5000/api/network    // Network visualization data
GET http://localhost:5000/api/trends     // Temporal trends data
```

**Fallback:** Mock data is provided if backend is unavailable

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **React Router DOM** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Professional icons

### Build Tools
- **Vite** - Fast development server
- **PostCSS** - CSS processing

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation Steps

1. **Install Dependencies**
```bash
pnpm install
# or
npm install
```

2. **Start Development Server**
```bash
pnpm run dev
# or
npm run dev
```

3. **Build for Production**
```bash
pnpm run build
# or
npm run build
```

## 🎓 Usage for Project Demo

### Login Credentials
- **Email:** Any email ending with `@drugcommision.com`
- **Example:** `agent@drugcommision.com`
- **Password:** Any password (for demo purposes)

### Demo Flow
1. Start at login page
2. Enter authorized email (e.g., `officer@drugcommision.com`)
3. Access dashboard with real-time intelligence
4. Navigate through all sections using sidebar
5. View charts, reports, alerts, and trends
6. Review ethics and privacy commitments

## 🔗 Backend Integration Guide

### Expected API Response Formats

**GET /api/summary**
```json
{
  "totalFlagged": 1247,
  "highRisk": 89,
  "mediumRisk": 234,
  "platformsMonitored": 12,
  "riskDistribution": {
    "high": 89,
    "medium": 234,
    "low": 924
  }
}
```

**GET /api/alerts**
```json
[
  {
    "id": "ALT-001",
    "severity": "Critical",
    "message": "Suspicious behavioral pattern detected",
    "timestamp": "2026-02-01T10:30:00Z",
    "platform": "Platform A"
  }
]
```

**GET /api/reports**
```json
[
  {
    "clusterId": "CLU-001",
    "platform": "Platform A",
    "riskScore": 92,
    "confidence": 88,
    "status": "Active"
  }
]
```

## 📊 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Layout.tsx           # Main layout with navbar & sidebar
│   │   └── ui/                  # Reusable UI components
│   ├── pages/
│   │   ├── LoginPage.tsx        # Authentication page
│   │   ├── DashboardPage.tsx    # Main dashboard
│   │   ├── ReportsPage.tsx      # Reports & clusters
│   │   ├── NetworksPage.tsx     # Network visualization
│   │   ├── AlertsPage.tsx       # Security alerts
│   │   ├── TrendsPage.tsx       # Temporal analysis
│   │   └── AboutPage.tsx        # Ethics & info
│   ├── utils/
│   │   └── api.ts               # API integration functions
│   └── App.tsx                  # Main router component
└── styles/
    ├── theme.css                # Design tokens
    └── tailwind.css             # Tailwind config
```

## 🛡️ Privacy & Ethics

### Core Principles
✅ Public data usage only  
✅ No private chat access  
✅ No identity detection  
✅ Human-in-the-loop decision support  
✅ Compliance with privacy regulations

### Disclaimer
This system provides AI-based decision support using publicly available and synthetic data only. Final decisions are made by authorized human analysts.

## 🎯 Suitable For
- Final-year engineering project submission
- University viva presentation
- Hackathon demonstrations
- Portfolio showcase
- Academic research

## 📝 Key Features for Evaluation

### Technical Excellence
- Modern React architecture with TypeScript
- RESTful API integration
- Responsive design
- Error handling and loading states
- Clean, maintainable code

### UI/UX Quality
- Professional intelligence-grade interface
- Intuitive navigation
- Clear data visualization
- Accessibility considerations

### Project Documentation
- Comprehensive README
- Inline code comments
- API documentation
- Ethical guidelines

## 🔄 Future Enhancements (Optional)
- Real-time WebSocket integration
- Advanced network graph visualization (D3.js)
- Export functionality (PDF reports)
- Multi-language support
- Advanced filtering and search
- User role management

## 📞 Support & Feedback

For questions about implementation or customization:
- Review inline code comments
- Check API utility functions in `/src/app/utils/api.ts`
- Examine component structure in `/src/app/components/`

## ⚖️ Legal & Ethical Notice

This project is designed for **educational purposes only** as part of a final-year engineering major project. It demonstrates technical capabilities for behavioral pattern analysis using publicly available data.

**Important:**
- No real law enforcement data is used
- No personal identities are tracked
- All analysis uses synthetic/mock data
- System is for decision support only, not autonomous action

## 📄 License

Educational/Academic Project - Not for commercial deployment

---

**Version:** 2.0.0  
**Last Updated:** February 2026  
**Project Type:** Final Year Engineering Major Project  
**Domain:** AI-Based Intelligence Systems
