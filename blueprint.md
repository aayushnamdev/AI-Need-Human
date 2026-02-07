# Rent a Human Clone - MVP Demo for Crypto Fundraising

## Context

**Goal**: Build an impressive demo marketplace in 1 week to showcase on crypto fundraising platforms and attract initial funding.

**Key Insight**: This is NOT a production app - it's a proof-of-concept demo that demonstrates all the hype tech (MCP, AI agents, crypto payments, real-time features) in a polished, working prototype.

**Target Audience**: Crypto investors looking for the next AI x Web3 project. They want to see:
- ✅ Working demo with real tech (MCP, blockchain integration)
- ✅ Professional UI/UX that looks production-ready
- ✅ Buzzwords: "AI Agents", "Model Context Protocol", "Web3", "DeFi", "Autonomous Agents"
- ✅ GitHub repo with clean code (shows technical credibility)
- ✅ Demo video showing the full user journey

**What This Means**:
- Focus on the "wow factor" and demo-ability over robust production features
- Seed data is perfectly acceptable (demo listings, fake users)
- Simulate complex flows (payments can be testnet or simulated)
- Basic MCP integration that works is enough (2-3 tools, not 20)
- Skip: Scaling, security hardening, error handling edge cases, production monitoring

**Timeline**: 7 days to working demo + pitch materials

---

## Tech Stack (Optimized for Speed + Hype Factor)

### Frontend (Next.js) - **Teammate Focus**
- **Framework**: Next.js 15 (App Router) - ✅ Modern, fast, SEO-friendly
- **Styling**: Tailwind CSS + Shadcn/ui - ✅ Beautiful UI components out-of-the-box
- **Auth**: Supabase Auth (email + Google OAuth) - ✅ 30-minute setup
- **Animations**: Framer Motion - ✅ Polished interactions for demo
- **Icons**: Lucide Icons - ✅ Professional icon set
- **Deployment**: Vercel - ✅ Free, instant deploys, perfect for demos

### Backend (Python FastAPI) - **Your Focus**
- **Framework**: FastAPI - ✅ Auto-generated API docs (impressive for investors)
- **Database**: Supabase PostgreSQL - ✅ Free tier, managed, real-time
- **Auth**: Supabase Python Client - ✅ JWT validation
- **MCP**: FastMCP (Python SDK) - ✅ Quick MCP server setup
- **Web3**: Web3.py - ✅ Polygon testnet integration (free transactions)
- **Deployment**: Railway - ✅ $5 free credit, easy Python deployment

### Hype Tech Features (The Money Makers)

1. **✨ MCP Integration** - "AI agents can hire humans autonomously"
   - Basic FastMCP server with 3 tools (search, book, get_profile)
   - Works with Claude Desktop (live demo capability)
   - Shows protocol innovation

2. **💰 Web3 Payments** - "Decentralized, trustless payments"
   - Wallet connection (MetaMask/WalletConnect)
   - USDC on Polygon testnet (free gas, real blockchain)
   - Show transaction hashes (proof of blockchain integration)

3. **⚡ Real-time Features** - "Live marketplace dynamics"
   - Supabase Realtime for chat
   - Live booking updates
   - Typing indicators

4. **🤖 AI-First Design** - "Built for autonomous agents"
   - Landing page emphasizes AI agent use cases
   - MCP tools documented with examples
   - "The Uber for AI agents" positioning

---

## 1-Week Demo Development Plan

### Day 1: Foundation + Landing Page

**Backend (You ):**
```bash
✅ Clone boilerplate: AtticusZeller/fastapi_supabase_template
✅ Setup Railway deployment
✅ Configure Supabase connection
✅ Create database schema (users, services, bookings, messages)
✅ Auth endpoints: /auth/signup, /auth/login, /auth/me
✅ Seed script for demo data (10 demo users, 20 services)
```

**Frontend (Teammate):**
```bash
✅ Clone Next.js + Supabase template (Vercel template)
✅ Build landing page:
   - Hero section: "Hire Humans for AI Agents"
   - Feature showcase (MCP, crypto, real-time)
   - "How it Works" section with animations
   - "For AI Agents" and "For Humans" sections
   - CTA: "Launch Demo" button
✅ Setup Supabase client
✅ Auth pages (login/signup with Google OAuth)
```

**Deliverable**: Landing page + working auth

---

### Day 2: Marketplace UI + Profiles

**Backend (You ):**
```bash
✅ Profile endpoints: GET /users, GET /users/:id, PUT /users/me
✅ Service endpoints: GET /services, GET /services/:id
✅ Image upload to Supabase Storage (avatars)
✅ Advanced seed data:
   - 10 diverse profiles (developers, designers, researchers, assistants)
   - 20 services with realistic descriptions
   - Profile photos (use Unsplash API or placeholders)
```

**Frontend (Teammate):**
```bash
✅ Marketplace page:
   - Grid view of service listings
   - Beautiful service cards (image, title, rate, skills)
   - Search bar (even if basic)
   - Filter sidebar (by rate, skills)
✅ Service detail page:
   - Hero image
   - Provider profile card
   - Service description
   - "Book Now" CTA
   - Availability calendar (can be fake/visual only)
✅ Profile pages:
   - Public profile view
   - Edit profile form
   - Avatar upload
```

**Deliverable**: Beautiful marketplace that looks production-ready

---

### Day 3: Booking System + Demo Flow

**Backend (You + ):**
```bash
✅ Booking endpoints:
   - POST /bookings (create booking)
   - GET /bookings (list user bookings)
   - PUT /bookings/:id/accept
   - PUT /bookings/:id/complete
✅ Booking status: pending, accepted, completed
✅ Pre-populate 5-10 bookings in seed data (show activity)
```

**Frontend (Teammate):**
```bash
✅ Booking flow:
   - Booking request modal (date picker, duration, message)
   - Booking confirmation page
   - My Bookings dashboard (beautiful cards with status badges)
   - Provider booking management (accept/decline buttons)
✅ Add animations (Framer Motion):
   - Page transitions
   - Card hover effects
   - Loading states with skeleton screens
```

**Deliverable**: Complete booking flow (request → accept → complete)

---

### Day 4: Real-time Chat + Crypto Wallet

**Backend (You + ):**
```bash
✅ Message endpoints:
   - POST /messages (send message)
   - GET /messages?with=:userId (chat history)
✅ Configure Supabase Realtime subscriptions
✅ Seed chat data (pre-populate conversations for demo)
✅ Wallet verification endpoint:
   - POST /wallet/verify (verify wallet signature)
```

**Frontend (Teammate):**
```bash
✅ Chat UI:
   - Chat page with sidebar (list of conversations)
   - Message list (WhatsApp-style)
   - Input with send button
   - Typing indicators (Supabase Realtime)
   - Pre-load demo conversations
✅ Wallet integration:
   - WalletConnect/RainbowKit setup
   - "Connect Wallet" button (navbar)
   - Wallet address display (shortened)
   - Network switcher (Polygon testnet)
   - Balance display (USDC/USDT)
```

**Deliverable**: Working chat + wallet connection

---

### Day 5: MCP Server + AI Demo

**Backend (You + ):**
```bash
✅ Create FastMCP server (mcp_server.py):

@mcp.tool()
def search_humans(
    skill: str,
    max_rate: int = 100
) -> list:
    """Search for available humans by skill and rate"""
    # Query services table
    # Return list of matching providers

@mcp.tool()
def book_human(
    provider_id: str,
    date: str,
    duration: int,
    task_description: str
) -> dict:
    """Book a human for a specific task"""
    # Create booking in database
    # Return booking confirmation

@mcp.tool()
def get_human_profile(
    provider_id: str
) -> dict:
    """Get detailed profile of a human provider"""
    # Query users table
    # Return profile with skills, rate, availability

✅ Test MCP server with Claude Desktop
✅ Deploy MCP server to Railway
✅ Create MCP documentation page (for website)
```

**Frontend (Teammate):**
```bash
✅ MCP showcase page:
   - "For AI Agents" section
   - MCP protocol explanation (visual diagrams)
   - Code examples showing tool usage
   - Live demo embed (Claude Desktop screencast)
   - Installation instructions for developers
✅ Add "AI Agent Demo" button that shows MCP tools in action
```

**Deliverable**: Working MCP server that Claude can use

---

### Day 6: Crypto Payments + Demo Polish

**Backend (You + Claude):**
```bash
✅ Payment verification (Polygon testnet):
   - POST /payments/initiate (generate payment request)
   - POST /payments/verify (verify transaction hash)
   - GET /payments/:bookingId (payment status)
✅ Setup Polygon testnet RPC (Alchemy/Infura)
✅ USDC contract interaction (Web3.py)
✅ Test with testnet USDC (get from faucet)
✅ Payment webhook (listen for confirmations)
```

**Frontend (Teammate):**
```bash
✅ Payment flow:
   - Payment modal (triggered after booking accepted)
   - Show payment details (amount in USDC, receiver address)
   - MetaMask transaction popup
   - Loading state ("Confirming transaction...")
   - Success state (show transaction hash, link to Polygonscan)
✅ Polish all pages:
   - Consistent spacing/typography
   - Mobile responsive (basic)
   - Loading states everywhere
   - Empty states (no bookings yet, etc.)
   - Error messages (user-friendly)
✅ Add social proof:
   - Fake testimonials (with photos)
   - "Featured Humans" section
   - Stats counter (animated): "150+ Humans", "1,200+ Tasks", "$50K+ Paid"
```

**Deliverable**: Full payment flow (wallet → approve → confirm)

---

### Day 7: Demo Video + Pitch Materials

**Backend (You + ):**
```bash
✅ API documentation:
   - FastAPI auto-docs at /docs (beautiful Swagger UI)
   - Add descriptions to all endpoints
   - Example requests/responses
✅ GitHub repo cleanup:
   - Clean README with architecture diagram
   - Installation instructions
   - Environment variables documented
   - License file (MIT)
   - Contribution guidelines (looks professional)
✅ Final deployment check:
   - Test all endpoints in production
   - Verify MCP server works from external clients
   - Check Supabase RLS policies (users can't see others' bookings)
```

**Frontend (Teammate):**
```bash
✅ Final polish:
   - Dark mode toggle (instant credibility)
   - Smooth animations on all interactions
   - Fix any mobile responsive issues
   - Add "Beta" badge (set expectations)
✅ Create demo flow script:
   1. Landing page → "Launch Demo"
   2. Sign up with Google
   3. Browse marketplace
   4. Click service → Book
   5. Accept booking (switch accounts)
   6. Pay with crypto (testnet)
   7. Chat with provider
   8. Show MCP interaction (Claude Desktop)
✅ Footer links:
   - GitHub repo
   - API docs (/docs)
   - MCP documentation
   - Twitter/Discord (even if not active)
```

**Both:**
```bash
✅ Record demo video (5-7 minutes):
   - Use Loom or OBS
   - Show complete user flow
   - Highlight MCP integration with Claude
   - Show blockchain transaction
   - Professional voiceover or captions
✅ Create pitch deck (10 slides):
   - Problem: AI agents lack physical presence
   - Solution: Human marketplace for AI agents
   - Tech: MCP, Web3, Real-time
   - Demo: Screenshots + video link
   - Traction: "Pre-launch, seeking $XXX funding"
   - Team: Your backgrounds
   - Roadmap: Q1-Q4 2026 milestones
   - Token economics (if applicable)
   - Ask: Funding amount and use of funds
✅ Deploy everything:
   - Vercel (frontend): yourapp.vercel.app
   - Railway (backend): api.yourapp.railway.app
   - Buy domain (optional): rentahuman.xyz ($10/year)
   - Point domain to deployments
```

**Deliverable**: Deployed demo + video + pitch deck

---

## Database Schema (Supabase PostgreSQL)

```sql
-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  hourly_rate DECIMAL(10,2),
  skills TEXT[],
  wallet_address TEXT,
  is_demo BOOLEAN DEFAULT FALSE, -- Flag demo accounts
  created_at TIMESTAMP DEFAULT NOW()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  rate DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id),
  client_id UUID REFERENCES profiles(id),
  provider_id UUID REFERENCES profiles(id),
  booking_date DATE,
  duration INTEGER, -- hours
  status TEXT DEFAULT 'pending', -- pending, accepted, completed
  task_description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments (Polygon testnet)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  from_address TEXT,
  to_address TEXT,
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USDC',
  tx_hash TEXT UNIQUE,
  network TEXT DEFAULT 'polygon-testnet',
  status TEXT DEFAULT 'pending', -- pending, confirmed
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed Data Script (run on Day 1)
INSERT INTO profiles (id, username, full_name, bio, hourly_rate, skills, wallet_address, is_demo) VALUES
  ('demo-user-1', 'alice_dev', 'Alice Johnson', 'Full-stack developer specializing in Python and React', 75.00, ARRAY['Python', 'React', 'PostgreSQL'], '0xAbc123...', TRUE),
  ('demo-user-2', 'bob_designer', 'Bob Chen', 'UI/UX designer with 10 years experience', 100.00, ARRAY['Figma', 'UI Design', 'Prototyping'], '0xDef456...', TRUE),
  -- ... 8 more demo users
;

INSERT INTO services (user_id, title, description, category, rate) VALUES
  ('demo-user-1', 'Python Backend Development', 'I can build scalable APIs and backend services', 'Development', 75.00),
  ('demo-user-2', 'Mobile App Design', 'Beautiful UI/UX for iOS and Android apps', 'Design', 100.00),
  -- ... 18 more demo services
;
```

---

## Critical Files Structure

```
Backend/
├── main.py                    # FastAPI app entry, CORS, routes
├── routers/
│   ├── auth.py               # Auth endpoints (signup, login)
│   ├── users.py              # Profile endpoints
│   ├── services.py           # Service CRUD
│   ├── bookings.py           # Booking management
│   ├── messages.py           # Chat endpoints
│   └── payments.py           # Crypto payment verification
├── mcp_server.py             # FastMCP server with tools
├── services/
│   ├── supabase_client.py    # Supabase connection
│   ├── crypto.py             # Web3.py utilities
│   └── auth_middleware.py    # JWT validation
├── models/
│   └── schemas.py            # Pydantic models
├── seed_data.py              # Generate demo data
├── requirements.txt
├── Dockerfile                # Railway deployment
└── README.md

Frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── marketplace/
│   │   └── page.tsx          # Browse services
│   ├── services/
│   │   └── [id]/page.tsx     # Service detail
│   ├── bookings/
│   │   └── page.tsx          # My bookings dashboard
│   ├── chat/
│   │   └── page.tsx          # Real-time chat
│   ├── profile/
│   │   └── page.tsx          # User profile
│   └── mcp/
│       └── page.tsx          # MCP documentation
├── components/
│   ├── ServiceCard.tsx
│   ├── BookingModal.tsx
│   ├── ChatInterface.tsx
│   ├── WalletButton.tsx
│   └── PaymentModal.tsx
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── wagmi.ts              # Web3 config
└── README.md
```

---

## Pitch Materials Checklist

### 1. Demo Website Features

**Landing Page Must-Haves:**
- [ ] Hero section with clear value prop ("AI Agents Hire Humans")
- [ ] "How It Works" with 3-4 steps (animated)
- [ ] Feature grid (MCP, Crypto, Real-time, AI-first)
- [ ] Demo video embed or GIF
- [ ] "Try Demo" CTA button (leads to signup)
- [ ] Social proof (stats, testimonials even if fake)
- [ ] Footer with GitHub, API docs, MCP docs links

**Marketplace Must-Haves:**
- [ ] 20+ demo service listings (diverse skills)
- [ ] Beautiful cards with hover effects
- [ ] Search that actually works
- [ ] Filters (by skill, rate)
- [ ] Mobile responsive
- [ ] Fast loading (<2 seconds)

**MCP Integration Page:**
- [ ] What is MCP? (simple explanation)
- [ ] Code examples (show tool definitions)
- [ ] Installation instructions
- [ ] Live demo or screencast
- [ ] Link to GitHub MCP server code
- [ ] API documentation link

### 2. Demo Video Script (5-7 minutes)

**Part 1: Problem & Solution (1 min)**
- Show current state: AI agents can't interact with physical world
- Introduce solution: Rent a Human marketplace

**Part 2: User Flow (3 min)**
- Sign up with Google OAuth
- Browse marketplace (show filters, search)
- Select service, view provider profile
- Create booking request
- (Switch to provider account) Accept booking
- Chat in real-time
- Payment with MetaMask (Polygon testnet)
- Show transaction on Polygonscan

**Part 3: AI Agent Integration (2 min)**
- Open Claude Desktop
- Connect MCP server
- Show AI agent searching for humans
- AI agent creates booking autonomously
- Show booking appears in marketplace

**Part 4: Tech Stack (1 min)**
- Flash architecture diagram
- Highlight: Next.js, FastAPI, MCP, Supabase, Web3, Polygon
- Show GitHub repo (code credibility)
- Show API docs (FastAPI auto-docs)

### 3. Pitch Deck (10 Slides)

**Slide 1: Title**
- [Your App Name] - The Human Layer for AI Agents
- Tagline: "Autonomous agents hiring humans for real-world tasks"

**Slide 2: Problem**
- AI agents are powerful but lack physical presence
- Can't attend meetings, pick up packages, test hardware
- Current solutions: Human intervention breaks autonomy

**Slide 3: Solution**
- Decentralized marketplace connecting AI agents with human workers
- MCP protocol for seamless agent integration
- Crypto payments for trustless transactions

**Slide 4: How It Works**
- Visual: AI agent → MCP → Marketplace → Human → Task completion
- Example: "Claude needs someone to test hardware → Finds engineer on platform → Books + pays → Task done"

**Slide 5: Tech Stack**
- MCP (Model Context Protocol) - First marketplace to integrate
- Web3 payments (USDC on Polygon)
- Real-time communication (WebSockets)
- Modern stack: Next.js, FastAPI, Supabase

**Slide 6: Demo**
- Screenshots of marketplace
- Screenshot of MCP integration
- Screenshot of crypto payment
- Link to live demo + video

**Slide 7: Market Opportunity**
- AI agent market growing (cite reports)
- Gig economy $400B+ (Upwork, Fiverr)
- Intersection: AI x Gig economy = untapped
- Target: $XXB TAM

**Slide 8: Business Model**
- Transaction fees (10-15% per booking)
- Premium features (priority listings, verification)
- Enterprise API (for companies building agents)
- Token utility (optional: platform token)

**Slide 9: Roadmap**
- Q1 2026: Launch MVP, onboard 100 humans
- Q2 2026: Multi-chain support (Ethereum, Solana), mobile app
- Q3 2026: Enterprise partnerships, API licensing
- Q4 2026: Autonomous escrow, dispute resolution, DAO governance

**Slide 10: The Ask**
- Seeking: $XXX,XXX (seed funding amount)
- Use of funds: Development 40%, Marketing 30%, Operations 20%, Legal 10%
- Milestones: 1,000 humans, 5,000 tasks, $100K GMV
- Contact: [email], [telegram], [twitter]

### 4. GitHub Repo (Professional Setup)

**README.md Structure:**
```markdown
# [Your App Name] - Decentralized Human Marketplace for AI Agents

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://yourapp.vercel.app)
[![API Docs](https://img.shields.io/badge/API-docs-blue)](https://api.yourapp.railway.app/docs)
[![MCP](https://img.shields.io/badge/MCP-integrated-purple)](https://modelcontextprotocol.io)

> The first marketplace where autonomous AI agents can hire humans for real-world tasks

## Features

- 🤖 **MCP Integration** - Native Model Context Protocol support
- 💰 **Crypto Payments** - USDC/USDT on Polygon
- ⚡ **Real-time** - Live chat and booking updates
- 🔐 **Decentralized** - Web3 authentication and payments

## Architecture

[Include diagram: Frontend → API → MCP Server → AI Agents]

## Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, Supabase
**Backend:** FastAPI, Python, Supabase, Web3.py
**MCP:** FastMCP Python SDK
**Blockchain:** Polygon (USDC/USDT)

## Quick Start

[Installation instructions]

## MCP Integration

[Code examples for AI agents]

## API Documentation

Available at: https://api.yourapp.railway.app/docs

## License

MIT
```

**Key Files to Include:**
- [ ] Clean, commented code
- [ ] Environment variable examples (.env.example)
- [ ] Installation instructions
- [ ] Architecture diagram (draw.io or Excalidraw)
- [ ] API documentation (FastAPI generates this)
- [ ] MCP tool definitions
- [ ] License file (MIT)
- [ ] Contributing guidelines

### 5. Social Presence (Optional but Helpful)

**Twitter/X:**
- [ ] Create account @YourAppName
- [ ] Pin tweet with demo video
- [ ] 3-5 tweets about features (MCP, crypto, AI agents)
- [ ] Engage with crypto/AI communities

**Product Hunt (Launch on Day 7):**
- [ ] Create product listing
- [ ] Screenshots + demo video
- [ ] Description emphasizing AI x Web3
- [ ] Ask: "What tasks would you hire a human for?"

**Crypto Listing Sites:**
- [ ] CoinGecko (if you have a token)
- [ ] DeFi Llama (if DeFi features)
- [ ] CryptoRank
- [ ] DappRadar

---

## Work Assignment

### Your Responsibilities (Backend + MCP)

**Day 1:**
- Setup FastAPI from boilerplate
- Configure Supabase connection
- Auth endpoints (signup, login, JWT middleware)
- Seed script for demo data
- Deploy to Railway

**Day 2:**
- User/profile endpoints
- Service endpoints (CRUD)
- Image upload to Supabase Storage
- Generate realistic seed data (10 users, 20 services)

**Day 3:**
- Booking endpoints (create, accept, list)
- Booking status management
- Pre-populate demo bookings

**Day 4:**
- Message endpoints (send, list)
- Configure Supabase Realtime
- Wallet verification endpoint
- Seed demo conversations

**Day 5:**
- **Build MCP server (critical day)**
- 3 MCP tools: search_humans, book_human, get_profile
- Test with Claude Desktop
- Deploy MCP server to Railway
- Document MCP integration

**Day 6:**
- Payment verification (Polygon testnet)
- Web3.py integration (USDC contract)
- Test with testnet USDC
- Transaction hash tracking

**Day 7:**
- API documentation polish (FastAPI /docs)
- GitHub repo cleanup
- Final deployment checks
- Record backend portion of demo video

### Teammate Responsibilities (Frontend)

**Day 1:**
- Setup Next.js from template
- Build landing page (hero, features, how it works)
- Auth UI (login, signup, Google OAuth)
- Deploy to Vercel

**Day 2:**
- Marketplace page (grid, search, filters)
- Service detail page
- Profile pages (view, edit)
- Avatar upload UI

**Day 3:**
- Booking flow (modal, confirmation)
- My Bookings dashboard
- Animations with Framer Motion
- Status badges

**Day 4:**
- Chat UI (sidebar, message list, input)
- Supabase Realtime integration
- Wallet integration (WalletConnect/RainbowKit)
- Wallet button in navbar

**Day 5:**
- MCP documentation page
- Code examples for developers
- "For AI Agents" section
- Visual protocol diagrams

**Day 6:**
- Payment modal (MetaMask transaction)
- Success/error states
- Polish all pages (spacing, typography)
- Mobile responsive fixes
- Add social proof (testimonials, stats)

**Day 7:**
- Final UI polish (dark mode, animations)
- Create demo flow script
- Record frontend portion of demo video
- Create pitch deck (Canva/Figma)

---

## Demo Data Strategy (Makes It Look Real)

### Demo User Profiles (10 Users)

1. **alice_dev** - Full-stack Developer ($75/hr)
   - Skills: Python, React, PostgreSQL
   - Bio: "10+ years building scalable web apps"
   - Avatar: Professional headshot

2. **bob_designer** - UI/UX Designer ($100/hr)
   - Skills: Figma, UI Design, Prototyping
   - Bio: "Award-winning product designer"

3. **carol_writer** - Technical Writer ($50/hr)
   - Skills: Documentation, API Docs, Tutorials
   - Bio: "Making complex tech simple"

4. **david_researcher** - AI Researcher ($150/hr)
   - Skills: Machine Learning, Data Science, Research
   - Bio: "PhD in ML, published papers"

5. **emily_assistant** - Virtual Assistant ($30/hr)
   - Skills: Scheduling, Email Management, Admin
   - Bio: "Organized and reliable"

6. **frank_hardware** - Hardware Engineer ($120/hr)
   - Skills: IoT, Raspberry Pi, Hardware Testing
   - Bio: "Building physical prototypes"

7. **grace_translator** - Translator ($60/hr)
   - Skills: English, Spanish, French
   - Bio: "Native multilingual translator"

8. **henry_lawyer** - Legal Advisor ($200/hr)
   - Skills: Contract Review, IP Law
   - Bio: "Tech law specialist"

9. **iris_marketer** - Marketing Specialist ($80/hr)
   - Skills: SEO, Content Marketing, Social Media
   - Bio: "Growth hacker"

10. **jack_videographer** - Videographer ($90/hr)
    - Skills: Video Editing, Filming, Post-production
    - Bio: "Cinematic storytelling"

### Demo Services (20 Services)

- "Python API Development" (alice_dev)
- "React Frontend Development" (alice_dev)
- "Mobile App UI Design" (bob_designer)
- "Landing Page Design" (bob_designer)
- "Technical Documentation" (carol_writer)
- "API Reference Writing" (carol_writer)
- "Machine Learning Consulting" (david_researcher)
- "Data Analysis" (david_researcher)
- "Calendar Management" (emily_assistant)
- "Email Inbox Management" (emily_assistant)
- "IoT Device Testing" (frank_hardware)
- "Hardware Prototype Review" (frank_hardware)
- "Spanish to English Translation" (grace_translator)
- "Contract Review" (henry_lawyer)
- "Terms of Service Writing" (henry_lawyer)
- "SEO Audit" (iris_marketer)
- "Social Media Strategy" (iris_marketer)
- "Product Demo Video" (jack_videographer)
- "Event Coverage" (jack_videographer)
- "Interview Recording" (jack_videographer)

### Demo Bookings (5-10 Bookings)

**Show different statuses:**
- 3 pending bookings (show activity)
- 3 accepted bookings (show commitment)
- 2 completed bookings (show track record)

### Demo Chats (3-5 Conversations)

**Pre-populate realistic conversations:**
```
Alice to Client: "Hi! I'd be happy to help with your API project. When would you like to schedule a call?"
Client to Alice: "Great! How about tomorrow at 2pm?"
Alice to Client: "Perfect, I'll send you a calendar invite."
```

---

## Technical Implementation Details

### FastMCP Server (mcp_server.py)

```python
from fastmcp import FastMCP
from supabase import create_client
import os

# Initialize MCP server
mcp = FastMCP("rent-a-human")

# Supabase client
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

@mcp.tool()
def search_humans(skill: str, max_rate: int = 1000) -> list:
    """
    Search for available human providers by skill and maximum hourly rate.

    Args:
        skill: The skill to search for (e.g., "Python", "Design", "Writing")
        max_rate: Maximum hourly rate in USD (default: 1000)

    Returns:
        List of matching providers with their profiles
    """
    response = supabase.from_("services") \
        .select("*, profiles(*)") \
        .lte("rate", max_rate) \
        .ilike("title", f"%{skill}%") \
        .eq("is_active", True) \
        .execute()

    return response.data

@mcp.tool()
def book_human(
    provider_id: str,
    date: str,
    duration: int,
    task_description: str,
    client_id: str
) -> dict:
    """
    Create a booking request with a human provider.

    Args:
        provider_id: UUID of the provider
        date: Booking date (YYYY-MM-DD format)
        duration: Duration in hours
        task_description: Description of the task
        client_id: UUID of the client (AI agent's user ID)

    Returns:
        Booking confirmation with details
    """
    booking_data = {
        "provider_id": provider_id,
        "client_id": client_id,
        "booking_date": date,
        "duration": duration,
        "task_description": task_description,
        "status": "pending"
    }

    response = supabase.from_("bookings").insert(booking_data).execute()
    return response.data[0]

@mcp.tool()
def get_human_profile(provider_id: str) -> dict:
    """
    Get detailed profile of a specific human provider.

    Args:
        provider_id: UUID of the provider

    Returns:
        Provider profile with skills, rate, bio, and availability
    """
    response = supabase.from_("profiles") \
        .select("*, services(*)") \
        .eq("id", provider_id) \
        .single() \
        .execute()

    return response.data

# Run MCP server
if __name__ == "__main__":
    mcp.run()
```

**Deploy to Railway:**
```bash
# Procfile
web: uvicorn mcp_server:mcp --host 0.0.0.0 --port $PORT
```

**Test with Claude Desktop:**
```json
// ~/.config/claude/mcp.json
{
  "mcpServers": {
    "rent-a-human": {
      "url": "https://your-mcp-server.railway.app",
      "apiKey": "your-api-key"
    }
  }
}
```

### Web3 Payment Verification (services/crypto.py)

```python
from web3 import Web3
import os

# Connect to Polygon testnet
w3 = Web3(Web3.HTTPProvider(os.getenv("POLYGON_RPC_URL")))

# USDC contract on Polygon testnet
USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
USDC_ABI = [...] # ERC-20 ABI

usdc_contract = w3.eth.contract(address=USDC_ADDRESS, abi=USDC_ABI)

def verify_payment(tx_hash: str, expected_amount: float, recipient: str) -> bool:
    """
    Verify a USDC payment transaction on Polygon.

    Args:
        tx_hash: Transaction hash from MetaMask
        expected_amount: Expected amount in USDC
        recipient: Expected recipient address

    Returns:
        True if transaction is valid, False otherwise
    """
    try:
        # Get transaction receipt
        tx = w3.eth.get_transaction(tx_hash)
        receipt = w3.eth.get_transaction_receipt(tx_hash)

        # Check if transaction succeeded
        if receipt['status'] != 1:
            return False

        # Decode transfer event
        transfer_event = usdc_contract.events.Transfer().process_receipt(receipt)

        if not transfer_event:
            return False

        event = transfer_event[0]['args']

        # Verify recipient and amount
        amount_usdc = event['value'] / 10**6  # USDC has 6 decimals

        if event['to'].lower() != recipient.lower():
            return False

        if amount_usdc < expected_amount * 0.99:  # Allow 1% tolerance
            return False

        return True

    except Exception as e:
        print(f"Payment verification error: {e}")
        return False
```

---

## Deployment Configuration

### Railway (Backend)

**Environment Variables:**
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
SUPABASE_JWT_SECRET=xxx
POLYGON_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/xxx
CORS_ORIGINS=https://yourapp.vercel.app
```

**railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Vercel (Frontend)

**Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_API_URL=https://api.yourapp.railway.app
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=xxx
```

**vercel.json:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

---

## Success Criteria (End of Day 7)

### Must-Have (MVP Demo):
- [ ] Live website at yourapp.vercel.app
- [ ] Working auth (email + Google)
- [ ] 20+ demo services in marketplace
- [ ] Booking flow works (create → accept)
- [ ] Real-time chat works
- [ ] Wallet connects (MetaMask)
- [ ] Payment with testnet USDC completes
- [ ] MCP server responds to Claude
- [ ] Demo video recorded (5-7 min)
- [ ] Pitch deck created (10 slides)
- [ ] GitHub repo public with README

### Nice-to-Have (Extra Polish):
- [ ] Dark mode toggle
- [ ] Mobile fully responsive
- [ ] Product Hunt launch
- [ ] Twitter account active
- [ ] Domain purchased (yourapp.xyz)
- [ ] Advanced animations
- [ ] Email notifications (basic)

---

## Risk Mitigation

### High-Risk Items:

**1. MCP Server (Day 5)**
- **Risk**: MCP protocol is new, might not work as expected
- **Mitigation**: Start with 1 simple tool (search_humans), test early with Claude Desktop
- **Plan B**: If MCP fails, show REST API with "MCP integration coming soon" banner

**2. Crypto Payments (Day 6)**
- **Risk**: Web3.py complexity, testnet faucets might be dry
- **Mitigation**: Use Polygon testnet (free gas), get testnet USDC early
- **Plan B**: Simulate payment flow with UI only, skip blockchain verification

**3. Demo Video (Day 7)**
- **Risk**: Recording quality, audio issues, screen recording failures
- **Mitigation**: Use Loom (easy screen recording), write script beforehand
- **Plan B**: Use screenshots + text overlay instead of video

### Time-Saving Strategies:

1. **Use boilerplates** (saves 1-2 days)
2. **Seed data > Real users** (saves testing time)
3. **Polygon testnet > Ethereum mainnet** (free gas)
4. **Pre-made components** (Shadcn/ui saves UI time)
5. **FastAPI auto-docs** (no need to write API docs)
6. **Skip edge cases** (focus on happy path demo)
7. **Use AI tools** (Claude for code, ChatGPT for copy, Midjourney for images)

---

## Post-Launch (After Week 1)

### Week 2: Gather Feedback
- Share on crypto Twitter, Product Hunt
- Join AI/Web3 Discord communities
- Get feedback on demo
- Track: signups, demo views, video watches

### Week 3: Iterate
- Fix critical bugs from feedback
- Improve MCP integration (add more tools)
- Add features users request
- Prepare for funding conversations

### Week 4: Fundraising
- Reach out to VCs, angel investors
- Apply to accelerators (Y Combinator, etc.)
- Post on funding platforms
- Network at crypto events

---

## Recommended Resources

### Boilerplates to Clone:
1. **Backend**: [AtticusZeller/fastapi_supabase_template](https://github.com/AtticusZeller/fastapi_supabase_template)
2. **Frontend**: [Vercel Next.js + Supabase Template](https://vercel.com/templates/next.js/supabase)

### Learning Resources:
- **FastAPI**: https://fastapi.tiangolo.com/tutorial/
- **MCP Python SDK**: https://modelcontextprotocol.github.io/python-sdk/
- **Web3.py**: https://web3py.readthedocs.io/
- **Supabase**: https://supabase.com/docs

### Demo Inspiration:
- Watch other crypto project demos on YouTube
- Study successful Product Hunt launches
- Review Y Combinator demo day presentations

---

## Final Notes

**This is a demo, not production.** Focus on:
- ✅ Looking impressive
- ✅ Demonstrating core tech (MCP, crypto, real-time)
- ✅ Clear value proposition
- ✅ Professional presentation

**You don't need:**
- ❌ Perfect security (no real money)
- ❌ Scalability (no real users yet)
- ❌ Edge case handling (demo happy path only)
- ❌ Full test coverage (manual testing is fine)

**Remember:** The goal is to raise funding, not launch a product. Once funded, you can rebuild properly with more time and resources.

**Good luck! 🚀**
