# 🏗️ Technical Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐        │  │
│  │  │  Login   │  │Dashboard │  │ Reports  │   ...  │  │
│  │  │  Page    │  │   Page   │  │   Page   │        │  │
│  │  └──────────┘  └──────────┘  └──────────┘        │  │
│  │                                                    │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │        React Router (Client Routing)        │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                                                    │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │     API Utility Layer (api.ts)              │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/HTTPS
                          │ (fetch API)
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Backend Server (localhost:5000)             │
│  ┌───────────────────────────────────────────────────┐  │
│  │                 RESTful API                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐        │  │
│  │  │   /api/  │  │  /api/   │  │  /api/   │   ...  │  │
│  │  │ summary  │  │  alerts  │  │ reports  │        │  │
│  │  └──────────┘  └──────────┘  └──────────┘        │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │              ML/AI Processing Layer                │  │
│  │  • Pattern Recognition                             │  │
│  │  • Behavioral Analysis                             │  │
│  │  • Risk Scoring                                    │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                  Database Layer                    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Component Hierarchy

```
App.tsx (Router Root)
│
├── LoginPage
│   └── Glassmorphism Card
│       ├── Email Input (validated)
│       ├── Password Input
│       └── Submit Button
│
└── Layout (Protected Routes)
    ├── Navbar (Top)
    │   ├── Logo & Title
    │   └── Logout Button
    │
    ├── Sidebar (Left)
    │   ├── Navigation Links
    │   └── Footer Info
    │
    └── Main Content (Right)
        ├── DashboardPage
        │   ├── Summary Cards (4)
        │   ├── PieChart (Risk Distribution)
        │   └── Alerts Feed
        │
        ├── ReportsPage
        │   ├── Stats Cards (3)
        │   └── Data Table
        │
        ├── NetworksPage
        │   ├── Privacy Notice
        │   ├── Stats (3)
        │   └── Visualization Container
        │
        ├── AlertsPage
        │   ├── Severity Stats (4)
        │   ├── Filter Buttons
        │   └── Alert Cards List
        │
        ├── TrendsPage
        │   ├── Statistics (3)
        │   ├── Line/Area Chart
        │   └── Platform Distribution
        │
        └── AboutPage
            ├── Disclaimer Banner
            ├── Ethical Principles Grid
            ├── System Overview
            └── Privacy Commitments
```

---

## Data Flow

### 1. Authentication Flow
```
User enters email + password
      ↓
LoginPage validates email domain
      ↓
Check if ends with @drugcommision.com
      ↓
   Valid? ─── No ──→ Show error message
      │
     Yes
      ↓
Store auth state in localStorage
      ↓
Navigate to /dashboard
      ↓
ProtectedRoute checks auth
      ↓
Render protected content
```

### 2. API Data Flow
```
Page Component mounts
      ↓
useEffect hook triggers
      ↓
Call API utility function
      ↓
fetch() to backend endpoint
      ↓
Backend returns JSON
      ↓
   Success? ─── No ──→ Use mock data
      │                      ↓
     Yes                     │
      ↓                      │
Parse JSON response ◄────────┘
      ↓
Update state with data
      ↓
Re-render with new data
```

### 3. Navigation Flow
```
User clicks sidebar link
      ↓
React Router intercepts
      ↓
ProtectedRoute wrapper checks auth
      ↓
   Authenticated? ─── No ──→ Redirect to /
      │
     Yes
      ↓
Render target page component
      ↓
Component fetches its data
      ↓
Display content
```

---

## State Management

### Component-Level State
Each page manages its own state using React hooks:

```typescript
// Example: DashboardPage
const [summary, setSummary] = useState<SummaryData | null>(null);
const [alerts, setAlerts] = useState<Alert[]>([]);
const [loading, setLoading] = useState(true);
```

### Global State
- **Authentication:** `localStorage.getItem('authenticated')`
- **Current Route:** React Router's `useLocation()`

---

## API Integration Layer

### Location
`/src/app/utils/api.ts`

### Functions

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `fetchSummary()` | `GET /api/summary` | Dashboard metrics |
| `fetchAlerts()` | `GET /api/alerts` | Security alerts |
| `fetchReports()` | `GET /api/reports` | Cluster reports |
| `fetchNetwork()` | `GET /api/network` | Network graph data |
| `fetchTrends()` | `GET /api/trends` | Temporal trends |

### Error Handling Strategy
```typescript
try {
  const response = await fetch(`${API_BASE_URL}/endpoint`);
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
} catch (error) {
  console.error('Error:', error);
  // Return mock data as fallback
  return mockData;
}
```

---

## Styling Architecture

### Tailwind CSS v4
- Utility-first approach
- Custom dark theme tokens
- Glassmorphism effects via backdrop-blur

### Color System

#### Risk Levels
```css
High Risk:    red-600 (#dc2626)
Medium Risk:  yellow-600 (#ca8a04)
Low Risk:     green-600 (#16a34a)
```

#### Background
```css
Base:         black
Gradients:    black → zinc-950 → black
Cards:        black/40 with backdrop-blur
Borders:      zinc-800/50 (semi-transparent)
```

#### Accents
```css
Primary:      red-900 (borders, buttons)
Secondary:    zinc-800 (neutral)
Interactive:  red-950 (hover states)
```

### Custom Animations
```css
.animate-pulse       /* Pulsing effect */
.animate-fade-in     /* Fade in on mount */
.delay-75/100/150    /* Staggered animations */
```

---

## Routing Configuration

### Public Routes
- `/` → LoginPage (no auth required)

### Protected Routes
All require authentication via `ProtectedRoute` wrapper:
- `/dashboard` → DashboardPage
- `/reports` → ReportsPage
- `/networks` → NetworksPage
- `/alerts` → AlertsPage
- `/trends` → TrendsPage
- `/about` → AboutPage

### Catch-All
- `*` → Redirect to `/`

---

## Security Features

### 1. Email Domain Validation
```typescript
if (!email.endsWith('@drugcommision.com')) {
  setError('Access Denied: Invalid email domain');
  return;
}
```

### 2. Route Protection
```typescript
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  if (!isAuthenticated) return <Navigate to="/" />;
  return <>{children}</>;
}
```

### 3. Session Persistence
- Uses `localStorage` for auth state
- Persists across page refreshes
- Cleared on logout

---

## Performance Optimizations

### 1. Code Splitting
React Router automatically code-splits routes

### 2. Lazy Loading
Components load on-demand when routes are accessed

### 3. Memoization
- Charts render with `ResponsiveContainer`
- List items use unique `key` props

### 4. Efficient State Updates
- Minimal re-renders
- State updates batched by React

---

## Data Visualization

### Library: Recharts

#### Dashboard: PieChart
```typescript
<PieChart>
  <Pie data={riskDistribution} />
  <Tooltip />
  <Legend />
</PieChart>
```

#### Trends: LineChart / AreaChart
```typescript
<LineChart data={trendsData}>
  <CartesianGrid />
  <XAxis dataKey="date" />
  <YAxis />
  <Line dataKey="Platform A" stroke="#dc2626" />
</LineChart>
```

---

## Type Safety

### TypeScript Interfaces

```typescript
interface SummaryData {
  totalFlagged: number;
  highRisk: number;
  mediumRisk: number;
  platformsMonitored: number;
  riskDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}

interface Alert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;
  timestamp: string;
  platform: string;
}
```

Benefits:
- Compile-time error detection
- IDE autocomplete
- Self-documenting code
- Refactoring safety

---

## Build & Deployment

### Development
```bash
pnpm run dev
# Starts Vite dev server on http://localhost:5173
```

### Production Build
```bash
pnpm run build
# Outputs to /dist folder
# Ready for static hosting (Vercel, Netlify, etc.)
```

### File Size Optimization
- Tree-shaking removes unused code
- Minification reduces file size
- Gzip compression enabled

---

## Browser Compatibility

### Supported Browsers
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Required Features
- ES6+ JavaScript
- CSS Grid
- CSS Backdrop Filter (for glassmorphism)
- Fetch API
- LocalStorage

---

## Testing Strategy (Future Enhancement)

### Unit Tests
- Component rendering
- API utility functions
- Validation logic

### Integration Tests
- Authentication flow
- API integration
- Navigation

### E2E Tests
- Complete user journeys
- Cross-browser testing

---

## Scalability Considerations

### Current Setup
- Client-side rendering
- API calls on page load
- Mock data fallback

### Future Enhancements
1. **Server-Side Rendering (SSR)**
   - Next.js migration
   - Improved SEO
   - Faster initial load

2. **State Management**
   - Redux/Zustand for global state
   - Better data caching
   - Optimistic updates

3. **Real-Time Updates**
   - WebSocket integration
   - Live alert notifications
   - Streaming data

4. **Progressive Web App (PWA)**
   - Offline functionality
   - Push notifications
   - Mobile app experience

---

## Monitoring & Logging (Production)

### Error Tracking
- Console logs for development
- Sentry/LogRocket for production
- API error monitoring

### Analytics
- Google Analytics for usage
- Custom event tracking
- Performance monitoring

---

## Dependencies

### Core
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `react-router-dom` ^7.13.0
- `typescript` (via peerDeps)

### UI & Styling
- `tailwindcss` ^4.1.12
- `lucide-react` ^0.487.0
- `recharts` ^2.15.2

### Build Tools
- `vite` ^6.3.5
- `@vitejs/plugin-react` ^4.7.0

---

## File Structure Explanation

```
src/
├── app/
│   ├── components/
│   │   ├── Layout.tsx              # Navbar + Sidebar wrapper
│   │   ├── figma/                  # Figma-specific utilities
│   │   └── ui/                     # Reusable UI components
│   ├── pages/
│   │   ├── LoginPage.tsx           # Authentication
│   │   ├── DashboardPage.tsx       # Main overview
│   │   ├── ReportsPage.tsx         # Cluster reports
│   │   ├── NetworksPage.tsx        # Network visualization
│   │   ├── AlertsPage.tsx          # Security alerts
│   │   ├── TrendsPage.tsx          # Temporal analysis
│   │   └── AboutPage.tsx           # Ethics & info
│   ├── utils/
│   │   └── api.ts                  # Backend integration
│   └── App.tsx                     # Main router
└── styles/
    ├── tailwind.css                # Tailwind config + custom CSS
    ├── theme.css                   # Design tokens
    ├── index.css                   # Global styles
    └── fonts.css                   # Font imports
```

---

## API Contract Documentation

### Summary Endpoint
**GET** `/api/summary`

**Response:**
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

### Alerts Endpoint
**GET** `/api/alerts`

**Response:**
```json
[
  {
    "id": "ALT-001",
    "severity": "Critical" | "High" | "Medium" | "Low",
    "message": "Alert description",
    "timestamp": "ISO 8601 date string",
    "platform": "Platform name"
  }
]
```

### Reports Endpoint
**GET** `/api/reports`

**Response:**
```json
[
  {
    "clusterId": "CLU-001",
    "platform": "Platform name",
    "riskScore": 0-100,
    "confidence": 0-100,
    "status": "Active" | "Monitoring" | "Resolved"
  }
]
```

---

**Last Updated:** February 2026  
**Version:** 2.0.0  
**Architecture:** Client-Server (React SPA + RESTful API)
