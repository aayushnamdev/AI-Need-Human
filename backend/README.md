# AI Need Human - Backend API

FastAPI backend for the AI Need Human marketplace.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
cd app
uvicorn main:app --reload
```

**API Docs:** http://localhost:8000/docs

## Project Structure

```
backend/
├── app/                    # Application code
│   ├── routers/           # API endpoints
│   │   ├── auth.py       # Authentication
│   │   ├── users.py      # User management
│   │   ├── services.py   # Service listings
│   │   ├── bookings.py   # Booking management
│   │   ├── messages.py   # Messaging
│   │   └── payments.py   # Payment handling
│   ├── services/         # Business logic
│   │   └── supabase.py  # Database client
│   ├── models/           # Data models
│   ├── static/           # Static files
│   └── main.py          # Application entry point
├── scripts/              # Utility scripts
│   ├── seed_data.py     # Seed demo data
│   └── setup_wizard.py  # Setup assistant
├── tests/                # Test suite
├── requirements.txt      # Python dependencies
└── .env.example         # Environment template
```

## Available Endpoints

### Live Endpoints
- `GET /` - Health check
- `GET /health` - Detailed health check
- `GET /api/stats` - Platform statistics
- `GET /services` - List services (with filters)
- `GET /services/{id}` - Get service details
- `GET /docs` - Interactive API documentation

### Coming Soon
- Authentication (signup, login)
- Booking management
- User profiles
- Messaging
- Payments

## Environment Variables

See `.env.example` for required configuration.

## Documentation

- [Architecture](../docs/architecture/ARCHITECTURE.md)
- [API Guide](../docs/guides/API_GUIDE.md)
- [MCP Integration](../docs/guides/MCP_INTEGRATION.md)
- [Roadmap](../docs/planning/ROADMAP.md)
