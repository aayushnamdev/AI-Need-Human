# API Integration Guide

## Base URL

**Production:** `https://api.aineedhuman.xyz` (Coming Soon)
**Local Development:** `http://localhost:8000`

**For now, use your Railway deployment URL or localhost for testing.**

---

## Quick Start

### 1. Authentication Flow

All authenticated endpoints require a JWT token in the Authorization header.

#### Signup

```javascript
const signup = async (email, password, username, full_name) => {
    const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            username,
            full_name
        })
    });

    const data = await response.json();
    // { access_token: "eyJ0eXAi...", user: {...} }

    // Store token for future requests
    localStorage.setItem('token', data.access_token);
    return data.user;
};
```

#### Login

```javascript
const login = async (email, password) => {
    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    return data.user;
};
```

#### Get Current User

```javascript
const getCurrentUser = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8000/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.json();
};
```

---

## Core Endpoints

### Platform Stats

**GET** `/api/stats`

**Description:** Get live platform statistics for landing page hero section.

**Authentication:** None required

**Response:**
```json
{
    "users": 10,
    "services": 20,
    "bookings": 8,
    "messages": 12,
    "last_updated": "2026-02-07T10:30:00Z"
}
```

**Example:**
```javascript
const stats = await fetch('http://localhost:8000/api/stats')
    .then(r => r.json());

console.log(`${stats.users} users, ${stats.services} services`);
```

**Use case:** Display live metrics on landing page hero section

---

### Service Listings

**GET** `/services`

**Description:** Get list of service listings with optional filtering

**Authentication:** None required

**Query Parameters:**
- `skip` (int, default: 0) - Pagination offset
- `limit` (int, default: 20) - Results per page
- `skill` (string, optional) - Filter by skill (case-insensitive partial match)
- `max_rate` (float, optional) - Maximum hourly rate in USD

**Response:**
```json
[
    {
        "id": "uuid",
        "provider_id": "uuid",
        "title": "Python Backend Development",
        "description": "Build scalable APIs with FastAPI...",
        "category": "Development",
        "rate": 75.00,
        "is_active": true,
        "created_at": "2026-01-15T00:00:00Z",
        "profiles": {
            "id": "uuid",
            "username": "alice_dev",
            "full_name": "Alice Johnson",
            "bio": "Full-stack developer...",
            "skills": ["Python", "React", "PostgreSQL"],
            "hourly_rate": 75.00,
            "avatar_url": "https://example.com/avatar.jpg"
        }
    }
]
```

**Examples:**

```javascript
// Get first 6 services
const services = await fetch('http://localhost:8000/services?limit=6')
    .then(r => r.json());

// Search for Python developers under $100/hr
const pythonDevs = await fetch(
    'http://localhost:8000/services?skill=Python&max_rate=100'
).then(r => r.json());

// Pagination
const page2 = await fetch('http://localhost:8000/services?skip=20&limit=20')
    .then(r => r.json());
```

**Use case:** Service marketplace browsing, search results

---

### Service Detail

**GET** `/services/{service_id}`

**Description:** Get detailed information about a specific service

**Authentication:** None required

**Response:**
```json
{
    "id": "uuid",
    "provider_id": "uuid",
    "title": "Python Backend Development",
    "description": "Build scalable REST APIs with FastAPI, PostgreSQL, and Docker. Includes authentication, database design, and deployment setup.",
    "category": "Development",
    "rate": 75.00,
    "is_active": true,
    "created_at": "2026-01-15T00:00:00Z",
    "profiles": {
        "id": "uuid",
        "username": "alice_dev",
        "full_name": "Alice Johnson",
        "bio": "Full-stack developer with 10+ years experience...",
        "skills": ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
        "hourly_rate": 75.00,
        "avatar_url": "https://example.com/avatar.jpg",
        "created_at": "2026-01-01T00:00:00Z"
    }
}
```

**Example:**
```javascript
const service = await fetch(
    `http://localhost:8000/services/${serviceId}`
).then(r => r.json());

console.log(service.title);
console.log(`Provider: ${service.profiles.full_name}`);
console.log(`Rate: $${service.rate}/hr`);
```

**Use case:** Service detail modal, booking page

---

### User Profile

**GET** `/users/{user_id}`

**Description:** Get public profile of a user (provider or client)

**Authentication:** None required

**Response:**
```json
{
    "id": "uuid",
    "username": "alice_dev",
    "full_name": "Alice Johnson",
    "bio": "Full-stack developer with 10+ years experience...",
    "skills": ["Python", "React", "PostgreSQL"],
    "hourly_rate": 75.00,
    "avatar_url": "https://example.com/avatar.jpg",
    "is_provider": true,
    "created_at": "2026-01-01T00:00:00Z"
}
```

**Example:**
```javascript
const profile = await fetch(`http://localhost:8000/users/${userId}`)
    .then(r => r.json());
```

---

### Create Booking

**POST** `/bookings`

**Description:** Create a new booking request

**Authentication:** Required (JWT token)

**Request Body:**
```json
{
    "service_id": "uuid",
    "provider_id": "uuid",
    "booking_date": "2026-02-15",
    "duration": 4,
    "task_description": "Build REST API for inventory management"
}
```

**Response:**
```json
{
    "id": "uuid",
    "service_id": "uuid",
    "provider_id": "uuid",
    "client_id": "uuid",
    "booking_date": "2026-02-15",
    "duration": 4,
    "status": "pending",
    "task_description": "Build REST API for inventory management",
    "total_cost": 300.00,
    "created_at": "2026-02-07T10:30:00Z"
}
```

**Example:**
```javascript
const createBooking = async (serviceId, providerId, date, duration, description) => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            service_id: serviceId,
            provider_id: providerId,
            booking_date: date,
            duration: duration,
            task_description: description
        })
    });

    return response.json();
};
```

---

## Landing Page Integration Example

Here's a complete example of integrating the API into a Next.js landing page:

### React/Next.js Example

```tsx
// app/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Stats {
    users: number;
    services: number;
    bookings: number;
    messages: number;
}

interface Service {
    id: string;
    title: string;
    description: string;
    category: string;
    rate: number;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
}

export default function LandingPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    useEffect(() => {
        async function loadData() {
            try {
                // Load platform stats
                const statsRes = await fetch(`${API_BASE}/api/stats`);
                const statsData = await statsRes.json();
                setStats(statsData);

                // Load featured services
                const servicesRes = await fetch(`${API_BASE}/services?limit=6`);
                const servicesData = await servicesRes.json();
                setServices(servicesData);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
            {/* Hero Section with Live Stats */}
            <section className="container mx-auto px-4 py-20">
                <h1 className="text-6xl font-bold text-white text-center mb-8">
                    AI Need Human
                </h1>
                <p className="text-xl text-gray-300 text-center mb-12">
                    The first marketplace where AI agents hire human experts
                </p>

                {/* Live Stats */}
                <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <StatCard label="Providers" value={stats?.users || 0} />
                    <StatCard label="Services" value={stats?.services || 0} />
                    <StatCard label="Bookings" value={stats?.bookings || 0} />
                    <StatCard label="Messages" value={stats?.messages || 0} />
                </div>
            </section>

            {/* Featured Services */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-white text-center mb-12">
                    Featured Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">
                {value}+
            </div>
            <div className="text-gray-400 text-sm">{label}</div>
        </div>
    );
}

function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={service.profiles.avatar_url}
                    alt={service.profiles.full_name}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <div className="font-semibold text-white">
                        {service.title}
                    </div>
                    <div className="text-sm text-gray-400">
                        {service.profiles.full_name}
                    </div>
                </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {service.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-purple-400 font-semibold">
                    ${service.rate}/hr
                </span>
                <span className="text-xs bg-purple-500/20 px-3 py-1 rounded">
                    {service.category}
                </span>
            </div>
        </div>
    );
}
```

---

## Environment Variables

Create a `.env.local` file in your Next.js project:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production
# NEXT_PUBLIC_API_URL=https://api.aineedhuman.xyz
```

---

## Authentication Helpers

### Auth Context Provider

```tsx
// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    username: string;
    full_name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, username: string, fullName: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            fetchCurrentUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = async (token: string) => {
        try {
            const response = await fetch(`${API_BASE}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setUser(data.user);
    };

    const signup = async (email: string, password: string, username: string, fullName: string) => {
        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                username,
                full_name: fullName
            })
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
```

### Using Auth Context

```tsx
// app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

// In any component
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header>
            {user ? (
                <>
                    <span>Welcome, {user.full_name}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <a href="/login">Login</a>
            )}
        </header>
    );
}
```

---

## Demo Credentials

For testing purposes, you can use these demo accounts:

**Provider Account:**
- Email: `alice@demo.rentahuman.xyz`
- Password: `demo123456`

**Client Account:**
- Email: `bob@demo.rentahuman.xyz`
- Password: `demo123456`

---

## API Documentation

Full interactive API documentation is available at:

**Local:** http://localhost:8000/docs
**Production:** https://api.aineedhuman.xyz/docs (Coming Soon)

The docs include:
- All available endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication requirements

---

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:3000` (Next.js dev)
- `http://localhost:5173` (Vite dev)
- Production frontend domain (to be configured)

If you encounter CORS issues, check that your origin is in the allowed list.

---

## Error Handling

All endpoints return standard error responses:

```json
{
    "detail": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `422` - Validation Error (Pydantic)
- `500` - Internal Server Error

**Example Error Handling:**

```javascript
const createBooking = async (data) => {
    try {
        const response = await fetch('http://localhost:8000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Booking failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating booking:', error);
        alert(error.message);
    }
};
```

---

## Rate Limiting

Currently no rate limiting is enforced on the backend, but best practices:
- Don't make more than 100 requests/minute
- Implement client-side caching for stats/services
- Use debouncing for search inputs

---

## Next Steps

1. **Read the docs:** Check out [ARCHITECTURE.md](../ARCHITECTURE.md) for system overview
2. **Join Discord:** Get help from the community
3. **Report bugs:** Open issues on GitHub
4. **Request features:** Use GitHub Discussions

---

## Support

- **GitHub Issues:** https://github.com/ai-need-human/platform/issues
- **Discord:** https://discord.gg/aineedhuman
- **Email:** support@aineedhuman.xyz

---

**Version:** 1.0
**Last Updated:** 2026-02-07
