# AI Need Human - System Architecture

## Overview

AI Need Human is a marketplace connecting AI agents with human service providers through the Model Context Protocol (MCP). The platform enables autonomous AI agents to search for, book, and pay human experts for tasks requiring human creativity, judgment, or physical presence.

**High-Level Architecture:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Client Layer                                │
├─────────────────┬───────────────────────┬───────────────────────────┤
│  Web Frontend   │   AI Agents (MCP)     │   Mobile (Future)         │
│  (Next.js)      │   (Claude, GPT, etc)  │   (React Native)          │
└────────┬────────┴──────────┬────────────┴──────────┬────────────────┘
         │                   │                        │
         └───────────────────┼────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │   API Gateway    │
                    │   (FastAPI)      │
                    └────────┬─────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐      ┌───────▼────────┐  ┌──────▼─────┐
    │  Auth   │      │  MCP Server    │  │  Payment   │
    │ Service │      │  (FastMCP)     │  │  Service   │
    └────┬────┘      └───────┬────────┘  └──────┬─────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    ┌────────▼─────────┐
                    │    Database      │
                    │  (Supabase PG)   │
                    └──────────────────┘
                             │
                    ┌────────▼─────────┐
                    │   Blockchain     │
                    │   (Solana)       │
                    └──────────────────┘
```

## Core Components

### 1. Frontend Layer (Next.js)

**Technology Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js
- Supabase Client

**Responsibilities:**
- User authentication and registration
- Service browsing and search UI
- Booking management interface
- Real-time messaging
- Wallet integration (Phantom, Solflare)
- Responsive design for mobile/desktop

**Key Pages:**
- Landing page with live stats
- Service marketplace with filters
- User profiles (provider/client)
- Booking dashboard
- Messaging interface
- Settings and wallet management

### 2. Backend API (FastAPI)

**Technology Stack:**
- FastAPI 0.109+
- Python 3.11+
- Pydantic for validation
- Supabase Python client
- JWT authentication

**Architecture Pattern:**
- RESTful API design
- Router-based modularization
- Dependency injection for database/auth
- Automatic OpenAPI documentation

**Core Routers:**

**Auth Router** (`/auth/*`)
- POST `/auth/signup` - User registration
- POST `/auth/login` - JWT token generation
- GET `/auth/me` - Current user info
- PUT `/auth/profile` - Update profile

**Services Router** (`/services/*`)
- GET `/services` - List services (with filters)
- GET `/services/{id}` - Service details
- POST `/services` - Create service (providers only)
- PUT `/services/{id}` - Update service
- DELETE `/services/{id}` - Deactivate service

**Bookings Router** (`/bookings/*`)
- POST `/bookings` - Create booking request
- GET `/bookings` - User's bookings
- GET `/bookings/{id}` - Booking details
- PUT `/bookings/{id}/accept` - Accept booking (provider)
- PUT `/bookings/{id}/complete` - Mark complete
- PUT `/bookings/{id}/cancel` - Cancel booking

**Users Router** (`/users/*`)
- GET `/users/{id}` - Public profile
- GET `/users/me/stats` - User statistics
- PUT `/users/me/wallet` - Update wallet address

**Stats Router** (`/api/stats`)
- GET `/api/stats` - Platform metrics (users, services, bookings)

**Security Features:**
- JWT token validation middleware
- Rate limiting (100 req/min per user)
- CORS configuration
- Input validation via Pydantic
- SQL injection prevention (Supabase client)

### 3. Database Layer (Supabase PostgreSQL)

**Why Supabase:**
- Managed PostgreSQL with real-time subscriptions
- Row-Level Security (RLS) policies
- Built-in authentication
- Auto-generated REST API
- Vector search capabilities (future AI matching)

**Schema Design:**

**profiles** (Users)
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    skills TEXT[], -- Array of skills
    hourly_rate DECIMAL(10,2),
    avatar_url TEXT,
    wallet_address VARCHAR(255),
    is_provider BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);
```

**services** (Offerings)
```sql
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES profiles(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    rate DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);
```

**bookings** (Transactions)
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id),
    provider_id UUID REFERENCES profiles(id),
    client_id UUID REFERENCES profiles(id),
    booking_date DATE NOT NULL,
    duration INT NOT NULL, -- hours
    status VARCHAR(20) DEFAULT 'pending',
    task_description TEXT,
    total_cost DECIMAL(10,2),
    tx_hash VARCHAR(255), -- Solana transaction
    created_at TIMESTAMP DEFAULT now()
);
```

**messages** (Chat)
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    sender_id UUID REFERENCES profiles(id),
    recipient_id UUID REFERENCES profiles(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);
```

**Row-Level Security (RLS) Policies:**
- Users can only read/update their own profiles
- Services visible to all, editable only by owner
- Bookings visible to involved parties only
- Messages visible only to sender/recipient

**Indexes:**
- `profiles(email, username)` - Fast lookup
- `services(provider_id, category, is_active)` - Search optimization
- `bookings(client_id, provider_id, status)` - Dashboard queries
- `messages(booking_id, created_at)` - Chat ordering

### 4. MCP Server (FastMCP)

**Purpose:** Enable AI agents to autonomously interact with the platform using the Model Context Protocol.

**Technology Stack:**
- FastMCP Python SDK
- Hosted separately from main API (scalability)
- REST endpoints called internally

**MCP Tools:**

**1. search_humans(skill, max_rate)**
```python
@mcp.tool()
def search_humans(skill: str, max_rate: int = 1000):
    """Search for human providers by skill and budget"""
    # Calls GET /services?skill={skill}&max_rate={max_rate}
    # Returns list of matching providers with services
```

**2. book_human(provider_id, service_id, date, duration, task_description, client_id)**
```python
@mcp.tool()
def book_human(provider_id, service_id, date, duration, task_description, client_id):
    """Create a booking with a human provider"""
    # Calls POST /bookings
    # Returns booking confirmation with ID and total cost
```

**3. get_human_profile(provider_id)**
```python
@mcp.tool()
def get_human_profile(provider_id: str):
    """Get detailed profile of a provider"""
    # Calls GET /users/{provider_id}
    # Returns full profile with stats, services, reviews
```

**Architecture:**
```
AI Agent (Claude Desktop)
    ↓ MCP Protocol (stdio/HTTP)
FastMCP Server (Python)
    ↓ HTTP Requests
Backend API (FastAPI)
    ↓ SQL Queries
Supabase Database
```

**Deployment:**
- Separate Railway service from main API
- Environment variables for API base URL
- API key authentication for security
- Rate limiting per MCP client

### 5. Blockchain Layer (Solana)

**Why Solana:**
- Low transaction fees (~$0.00025)
- Fast finality (400ms)
- High throughput (65k TPS)
- Strong ecosystem for SPL tokens
- AI agent-friendly (programmatic signing)

**Token Architecture:**

**Platform Token (SPL Token)**
```rust
// Simplified token structure
pub struct PlatformToken {
    pub mint: Pubkey,
    pub decimals: 9,
    pub supply: u64, // Total supply
    pub authority: Pubkey,
}
```

**Escrow Mechanism:**
```rust
// Booking escrow account
pub struct BookingEscrow {
    pub booking_id: String,
    pub client: Pubkey,
    pub provider: Pubkey,
    pub amount: u64,
    pub status: EscrowStatus, // Pending, Released, Refunded
    pub created_at: i64,
}
```

**Payment Flow:**
1. Client creates booking → escrow account created
2. Client deposits tokens → escrow holds funds
3. Provider completes work → marks booking complete
4. Client confirms completion → escrow releases to provider
5. Dispute → manual resolution or timeout logic

**Smart Contracts:**
- Token mint program (SPL Token)
- Escrow program (Anchor framework)
- Dispute resolution (future)

**Integration Points:**
- Frontend: Wallet connection (Phantom/Solflare)
- Backend: Transaction verification via Solana RPC
- MCP: Programmatic signing for AI agents

## Data Flow Examples

### User Booking Flow

```
1. User searches for "Python developer"
   Frontend → GET /services?skill=Python → Database
   Database → Returns matching services → Frontend

2. User views service details
   Frontend → GET /services/{id} → Database
   Database → Returns service + provider profile → Frontend

3. User creates booking
   Frontend → POST /bookings → Backend validates
   Backend → Inserts booking → Database (status: pending)
   Backend → Returns booking ID → Frontend

4. User deposits payment
   Frontend → Wallet.signTransaction(escrow_tx)
   Wallet → Submits to Solana → Blockchain
   Blockchain → Confirms → Frontend
   Frontend → PUT /bookings/{id} (tx_hash) → Backend

5. Provider accepts booking
   Provider Frontend → PUT /bookings/{id}/accept → Backend
   Backend → Updates status to 'accepted' → Database
   Database → Triggers notification → Provider/Client

6. Work completion
   Provider → PUT /bookings/{id}/complete → Backend
   Backend → Updates status to 'completed' → Database
   Backend → Calls Solana escrow.release() → Blockchain
   Blockchain → Transfers tokens to provider
```

### AI Agent Booking Flow (MCP)

```
1. AI agent needs help
   Claude → "I need a Python developer"
   Claude → Calls search_humans(skill="Python") via MCP

2. MCP searches platform
   MCP Server → GET /services?skill=Python → Backend API
   Backend → Queries database → Returns results
   MCP → Formats for Claude → Claude receives list

3. Claude selects provider
   Claude → Calls book_human(provider_id, date, duration, task)
   MCP Server → POST /bookings → Backend API
   Backend → Creates booking → Returns booking ID

4. MCP handles payment
   MCP Server → Signs transaction with agent wallet
   MCP Server → Submits to Solana → Escrow created
   MCP Server → Confirms to Claude → "Booking confirmed"

5. Provider completes work
   Provider → Uploads deliverables
   Provider → Marks complete
   Backend → Releases escrow → Claude notified
```

## Security Architecture

### Authentication
- **JWT Tokens:** HS256 algorithm, 24-hour expiry
- **Refresh Tokens:** Future implementation for long sessions
- **Password Hashing:** Bcrypt with salt rounds

### Authorization
- **Role-Based:** Provider vs Client permissions
- **Resource Ownership:** Users can only modify own resources
- **RLS Policies:** Database-level security

### API Security
- **Rate Limiting:** 100 requests/min per user (Redis)
- **CORS:** Whitelist frontend domains
- **Input Validation:** Pydantic models prevent injection
- **SQL Injection:** Parameterized queries via Supabase client

### Blockchain Security
- **Escrow Smart Contract:** Audited Anchor program
- **Multi-Signature:** Optional for high-value bookings
- **Transaction Verification:** Backend verifies on-chain before status update

### Data Security
- **Encryption at Rest:** Supabase managed encryption
- **HTTPS Only:** TLS 1.3 for all connections
- **Environment Variables:** Secrets in Railway/Vercel, not code
- **No PII in Logs:** Sanitize logging

## Scalability Strategy

### Horizontal Scaling
- **Stateless API:** No in-memory sessions, scale via Railway
- **Load Balancing:** Railway auto-scaling based on traffic
- **Database Pooling:** PgBouncer connection pooling (100 connections)

### Caching Layer (Future - Phase 3)
- **Redis:** Cache popular services, user profiles
- **CDN:** Static assets via Vercel Edge Network
- **Database Caching:** Supabase query caching

### Database Optimization
- **Indexes:** All foreign keys and query columns
- **Partitioning:** Bookings table by date (future)
- **Read Replicas:** Supabase read replicas for analytics

### MCP Server Scaling
- **Separate Deployment:** Independent scaling from main API
- **Multiple Instances:** Round-robin load balancing
- **Caching:** Cache provider profiles, service listings

## Deployment Architecture

### Production Environment

**Frontend:**
- **Platform:** Vercel
- **Regions:** Global edge deployment
- **Features:** Auto-scaling, HTTPS, CDN
- **Environment Variables:** API URL, Supabase public key

**Backend API:**
- **Platform:** Railway
- **Regions:** US-West (expandable)
- **Features:** Auto-deploy from GitHub, HTTPS, monitoring
- **Environment Variables:** Supabase credentials, JWT secret

**MCP Server:**
- **Platform:** Railway (separate service)
- **Regions:** Same as backend for low latency
- **Features:** Independent scaling, health checks

**Database:**
- **Platform:** Supabase (managed)
- **Regions:** US-West primary
- **Backup:** Automated daily backups, point-in-time recovery

**Blockchain:**
- **Network:** Solana Mainnet-Beta
- **RPC:** Helius/QuickNode (dedicated endpoints)
- **Backup:** Multiple RPC providers for redundancy

### Development Environment
- **Local:** Docker Compose (API + Supabase local)
- **Staging:** Railway preview environments per PR
- **Testing:** Solana Devnet for token testing

### CI/CD Pipeline
```
GitHub Push → Railway Auto-Deploy
    ↓
Run Tests (pytest)
    ↓
Lint/Type Check (ruff, mypy)
    ↓
Deploy to Production
    ↓
Health Check
    ↓
Rollback if Failed
```

## Monitoring & Observability

### Metrics
- **API Performance:** Response times, error rates (Railway metrics)
- **Database:** Query performance, connection pool (Supabase dashboard)
- **Blockchain:** Transaction success rate, gas costs (Solscan)

### Logging
- **Application Logs:** Structured JSON logs (Railway)
- **Error Tracking:** Sentry integration (future)
- **Audit Logs:** User actions, booking events

### Alerts
- **API Down:** Railway health checks
- **High Error Rate:** >5% errors trigger alert
- **Database Issues:** Connection pool exhaustion

## Technology Choices Rationale

### FastAPI vs Flask/Django
- **Pro:** Auto-generated OpenAPI docs, async support, type safety
- **Pro:** Fast development with Pydantic validation
- **Con:** Smaller ecosystem than Django

### Supabase vs Self-Hosted PostgreSQL
- **Pro:** Real-time subscriptions, built-in auth, managed backups
- **Pro:** RLS policies simplify security
- **Con:** Vendor lock-in (mitigated by standard PostgreSQL)

### Solana vs Ethereum
- **Pro:** 1000x cheaper fees, faster finality
- **Pro:** Better for micropayments (small bookings)
- **Con:** Smaller ecosystem, more network outages historically

### Next.js vs React (CRA)
- **Pro:** SSR for SEO, API routes, image optimization
- **Pro:** Better performance, built-in routing
- **Con:** More complex than SPA

## Future Architecture Enhancements

### Phase 2 (Month 2-3)
- **Redis Caching:** Popular services, user sessions
- **WebSocket Server:** Real-time chat, notifications
- **CDN Integration:** Cloudflare for static assets

### Phase 3 (Month 4-6)
- **Microservices:** Split payment, messaging into services
- **Event Bus:** RabbitMQ/Kafka for async processing
- **Vector Database:** Pinecone for AI-powered matching

### Phase 4 (Month 6+)
- **Multi-Chain:** Ethereum, Polygon support
- **GraphQL API:** Alternative to REST for complex queries
- **Mobile Backend:** Optimize for mobile app
- **AI Recommendation Engine:** ML-based provider matching

## Appendix: External Dependencies

**Third-Party Services:**
- Supabase (database, auth)
- Railway (hosting)
- Vercel (frontend hosting)
- Helius/QuickNode (Solana RPC)
- Bags.fm (token launch platform)

**Open Source Libraries:**
- FastAPI, Pydantic (backend)
- Next.js, React (frontend)
- Solana Web3.js (blockchain)
- FastMCP (AI agent integration)

**Development Tools:**
- GitHub (version control, CI/CD)
- VS Code (IDE)
- Postman (API testing)
- Excalidraw (architecture diagrams)

---

**Version:** 1.0
**Last Updated:** 2026-02-07
**Author:** AI Need Human Team
