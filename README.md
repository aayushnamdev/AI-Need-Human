# AI Need Human 🤖🤝👤

> The first marketplace where AI agents can autonomously hire human expertise through the Model Context Protocol (MCP).

[![API Status](https://img.shields.io/badge/API-Development-yellow)](http://localhost:8000/docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)](https://fastapi.tiangolo.com)
[![MCP](https://img.shields.io/badge/MCP-Integrated-purple)](https://modelcontextprotocol.io)
[![Token Launch](https://img.shields.io/badge/bags.fm-Launching%20Soon-orange)](https://bags.fm)

---

## 🪙 Token Launch

**We're launching on [bags.fm](https://bags.fm) this weekend!**

**Why invest:**
- ✅ First MCP-native marketplace for AI x Human collaboration
- ✅ Untapped market: AI agents will need human help at scale
- ✅ Strong technical team with working MVP
- ✅ Clear 16-week roadmap to profitability
- ✅ Professional documentation and active development

**Current Status:**
- ✅ MVP backend with authentication framework
- ✅ Database schema designed
- ✅ Live API documentation at `/docs`
- ✅ Comprehensive technical architecture
- 🚧 MCP server implementation (Week 3)
- 🚧 Solana payments (Week 4)
- 📅 Public beta launch (Week 11)

---

## 📊 For Investors

### Quick Links

- 📐 [**Architecture**](docs/architecture/ARCHITECTURE.md) - System design and technical approach
- 🗺️ [**Roadmap**](docs/planning/ROADMAP.md) - 16-week development timeline with milestones
- 🤖 [**MCP Integration**](docs/guides/MCP_INTEGRATION.md) - AI agent integration technical details
- 🔧 [**API Guide**](docs/guides/API_GUIDE.md) - Frontend integration examples
- 📝 [**Changelog**](CHANGELOG.md) - Version history and planned features

### Demo Access

**API Base URL:** `http://localhost:8000` (local development)

**Live Endpoints:**
- **API Docs:** http://localhost:8000/docs (Interactive Swagger UI)
- **Health Check:** http://localhost:8000/
- **Platform Stats:** http://localhost:8000/api/stats
- **Services List:** http://localhost:8000/services

---

## 🎯 Vision

AI Need Human bridges the gap between autonomous AI agents and human expertise by enabling agents to:
- 🔍 **Search** for skilled humans across diverse domains
- 📅 **Book** human time autonomously through MCP
- 💰 **Pay** seamlessly with crypto escrow
- 💬 **Communicate** in real-time with human providers

---

## 📁 Project Structure

```
Rent_a_human/
├── docs/                           # All documentation
│   ├── architecture/               # System architecture
│   │   └── ARCHITECTURE.md
│   ├── guides/                     # Integration guides
│   │   ├── API_GUIDE.md
│   │   └── MCP_INTEGRATION.md
│   ├── planning/                   # Development planning
│   │   ├── ROADMAP.md
│   │   └── IMPLEMENTATION_SUMMARY.md
│   └── archive/                    # Historical docs
│
├── backend/                        # FastAPI backend
│   ├── app/                        # Application code
│   │   ├── routers/               # API endpoints
│   │   ├── services/              # Business logic
│   │   ├── models/                # Data models
│   │   ├── static/                # Static files
│   │   └── main.py               # Entry point
│   ├── scripts/                   # Utility scripts
│   ├── tests/                     # Test suite
│   ├── requirements.txt          # Dependencies
│   └── README.md                 # Backend docs
│
├── .github/                        # GitHub configuration
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
│
├── CHANGELOG.md                    # Version history
├── README.md                       # This file
└── railway.json                   # Deployment config
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Supabase account (free tier)
- Node.js 18+ (for frontend, coming soon)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
cd app
uvicorn main:app --reload
```

**Backend API:** http://localhost:8000
**API Docs:** http://localhost:8000/docs

See [backend/README.md](backend/README.md) for detailed setup.

---

## 🔧 Tech Stack

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **Database:** Supabase PostgreSQL
- **Auth:** JWT + Supabase
- **MCP:** FastMCP Python SDK
- **Blockchain:** Solana (SPL tokens)
- **Deployment:** Railway

### Frontend (Coming Soon)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Auth:** Supabase Auth
- **Blockchain:** Solana Web3.js
- **Deployment:** Vercel

---

## 🤖 MCP Integration

AI agents interact with the platform through the Model Context Protocol.

### Available Tools

```python
@mcp.tool()
def search_humans(skill: str, max_rate: int = 1000) -> list:
    """Search for human providers by skill and budget"""

@mcp.tool()
def book_human(provider_id: str, date: str, duration: int, task: str) -> dict:
    """Create a booking with a human provider"""

@mcp.tool()
def get_human_profile(provider_id: str) -> dict:
    """Get detailed profile of a provider"""
```

See [MCP Integration Guide](docs/guides/MCP_INTEGRATION.md) for full documentation.

---

## 🎨 Key Features

### For Humans (Providers)
- ✅ Create service listings
- ✅ Manage bookings
- 🚧 Real-time chat (Week 5)
- 🚧 Crypto payments (Week 4)
- 📅 Reputation system (Week 6)

### For AI Agents (Clients)
- ✅ Search humans by skill via MCP
- 🚧 Autonomous booking (Week 3)
- 🚧 Trustless payments (Week 4)
- 🚧 Programmatic access (Week 3)

### Platform
- ✅ Health check endpoints
- ✅ Platform statistics API
- ✅ Service listing with filters
- ✅ Auto-generated API docs
- 🚧 Authentication (Week 2)
- 🚧 Real-time messaging (Week 5)

---

## 🗺️ Development Roadmap

### Pre-Launch (Week 1) ✅
- [x] Backend API structure
- [x] Database schema
- [x] Platform stats endpoint
- [x] Service listing endpoints
- [x] Comprehensive documentation

### Phase 1: Token Launch & MVP (Week 2-3)
- [ ] Enhanced service filtering
- [ ] Booking creation and management
- [ ] **MCP server** (Week 3)
- [ ] Demo video

### Phase 2: Web3 & Real-Time (Week 4-6)
- [ ] **Solana integration** (Week 4)
- [ ] **Real-time chat** (Week 5)
- [ ] Review/rating system

### Phase 3: Platform Maturity (Week 7-10)
- [ ] Advanced MCP tools
- [ ] Security audit
- [ ] Performance optimization

### Phase 4: Public Beta (Week 11-16)
- [ ] Open user registration
- [ ] Enterprise features
- [ ] DAO governance prep

See [ROADMAP.md](docs/planning/ROADMAP.md) for complete 16-week plan.

---

## 🚀 Deployment

### Backend (Railway)

```bash
# Deploy to Railway
railway login
railway init
railway up
```

**Environment variables** (set in Railway dashboard):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `SUPABASE_JWT_SECRET`
- `CORS_ORIGINS`

---

## 📊 API Documentation

Interactive API documentation available at:
- **Local:** http://localhost:8000/docs
- **Production:** (Coming after Railway deployment)

Features:
- All available endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication requirements

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](docs/archive/CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) - Claude and MCP protocol
- [Supabase](https://supabase.com) - Database and auth platform
- [Railway](https://railway.app) - Backend hosting
- [Solana](https://solana.com) - Blockchain infrastructure

---

## 📧 Contact

- **GitHub Issues:** [Report bugs or request features](https://github.com/yourusername/AI-Need-Human/issues)
- **Documentation:** See [docs/](docs/) folder
- **Email:** support@aineedhuman.xyz (coming soon)

---

**Built with ❤️ for the future of AI x Human collaboration**
