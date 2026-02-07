# Rent a Human - Backend API

> Decentralized marketplace where autonomous AI agents can hire humans for real-world tasks

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![MCP](https://img.shields.io/badge/MCP-Integrated-purple?style=flat)](https://modelcontextprotocol.io/)

## 🚀 Features

- **🤖 MCP Integration** - Native Model Context Protocol support for AI agents
- **💰 Crypto Payments** - USDC/USDT payments on Polygon testnet
- **⚡ Real-time** - Live chat and booking updates via Supabase Realtime
- **🔐 Auth** - JWT-based authentication with secure password hashing
- **📚 Auto-docs** - Interactive API documentation at `/docs`
- **🌐 CORS** - Configured for frontend integration

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐       ┌──────────────┐
│   FastAPI       │◄──────┤  AI Agents   │
│   Backend       │  MCP  │  (Claude)    │
└────────┬────────┘       └──────────────┘
         │
         ▼
┌─────────────────┐       ┌──────────────┐
│   Supabase      │       │   Polygon    │
│   PostgreSQL    │       │   Testnet    │
└─────────────────┘       └──────────────┘
```

## 📋 Prerequisites

- Python 3.11 or higher
- Supabase account (free tier works)
- PostgreSQL database (via Supabase)
- Railway account (for deployment)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Backend
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Setup environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# API Configuration
CORS_ORIGINS=http://localhost:3000
API_HOST=0.0.0.0
API_PORT=8000

# Security
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Polygon (for crypto payments)
POLYGON_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/your_key
```

### 5. Setup database schema

Run the SQL schema in your Supabase SQL Editor:

```bash
# Copy contents of database_schema.sql and run in Supabase SQL Editor
```

### 6. Seed demo data

```bash
python seed_data.py
```

This creates:
- 10 demo user profiles
- 20 service listings
- 8 sample bookings
- Demo chat conversations

**Demo credentials:**
- Email: `alice@demo.rentahuman.xyz` (or any demo user)
- Password: `demo123456`

## 🎯 Running the Application

### Development mode

```bash
uvicorn main:app --reload
```

### Production mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📡 API Endpoints

### Authentication

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user profile

### Users/Profiles

- `GET /users` - List all users
- `GET /users/{id}` - Get user profile
- `PUT /users/me` - Update own profile

### Services

- `GET /services` - List services (with filters)
- `GET /services/{id}` - Get service details
- `POST /services` - Create service listing
- `PUT /services/{id}` - Update service
- `DELETE /services/{id}` - Delete service

### Bookings

- `POST /bookings` - Create booking request
- `GET /bookings` - List user's bookings
- `PUT /bookings/{id}/accept` - Accept booking (provider)
- `PUT /bookings/{id}/complete` - Mark as completed

### Messages

- `POST /messages` - Send message
- `GET /messages?with={user_id}` - Get chat history

### Payments

- `POST /payments/initiate` - Initiate payment
- `POST /payments/verify` - Verify blockchain transaction
- `GET /payments/{booking_id}` - Get payment status

## 🤖 MCP Integration

The FastMCP server provides AI agents with tools to interact with the marketplace:

### Available Tools

1. **search_humans** - Find humans by skill and rate
2. **book_human** - Create a booking request
3. **get_human_profile** - Get detailed profile

### Running MCP Server

```bash
python mcp_server.py
```

### Testing with Claude Desktop

Add to `~/.config/claude/mcp.json`:

```json
{
  "mcpServers": {
    "rent-a-human": {
      "url": "http://localhost:8000/mcp",
      "apiKey": "your-api-key"
    }
  }
}
```

## 🚢 Deployment

### Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Set environment variables in Railway dashboard

### Environment Variables (Production)

Set these in Railway:
- All variables from `.env.example`
- `CORS_ORIGINS` - Your frontend URL
- `PORT` - Railway sets this automatically

## 🧪 Testing

### Manual Testing

Use the interactive docs at `/docs` to test all endpoints.

### Example requests

**Signup:**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepass123",
    "username": "testuser",
    "full_name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@demo.rentahuman.xyz",
    "password": "demo123456"
  }'
```

**Get Services:**
```bash
curl http://localhost:8000/services
```

## 📁 Project Structure

```
Backend/
├── main.py                 # FastAPI app entry point
├── routers/
│   ├── auth.py            # Authentication endpoints
│   ├── users.py           # User/profile endpoints
│   ├── services.py        # Service CRUD
│   ├── bookings.py        # Booking management
│   ├── messages.py        # Chat endpoints
│   └── payments.py        # Crypto payments
├── services/
│   ├── supabase_client.py # Database connection
│   ├── auth_middleware.py # JWT validation
│   └── crypto.py          # Web3 utilities
├── models/
│   └── schemas.py         # Pydantic models
├── mcp_server.py          # FastMCP server
├── seed_data.py           # Database seeding
├── database_schema.sql    # PostgreSQL schema
├── requirements.txt       # Python dependencies
├── Dockerfile             # Docker configuration
├── railway.json           # Railway deployment config
└── README.md
```

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens with expiration
- Environment variables for secrets
- CORS configured for allowed origins
- Row Level Security (RLS) in Supabase

## 🛠️ Tech Stack

- **Framework**: FastAPI 0.109.0
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT + bcrypt
- **MCP**: FastMCP Python SDK
- **Web3**: Web3.py (Polygon integration)
- **Deployment**: Railway

## 📝 Development Roadmap

- [x] Day 1: Auth & foundation
- [ ] Day 2: Profiles & services
- [ ] Day 3: Booking system
- [ ] Day 4: Real-time chat & wallet
- [ ] Day 5: MCP server integration
- [ ] Day 6: Crypto payments
- [ ] Day 7: Documentation & deployment

## 🤝 Contributing

This is a demo project for crypto fundraising. Contributions welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙋 Support

- **Documentation**: Check `/docs` endpoint
- **Issues**: Open a GitHub issue
- **Email**: your-email@example.com

---

Built with ❤️ for the AI x Web3 future
