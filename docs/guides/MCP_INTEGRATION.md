# MCP Integration Guide

## What is MCP?

Model Context Protocol (MCP) is an open protocol created by Anthropic that enables AI agents to interact with external tools and services seamlessly. It provides a standardized way for AI models like Claude to access real-world capabilities beyond their training data.

**AI Need Human is the first marketplace to natively integrate MCP**, allowing autonomous AI agents to hire human expertise without manual intervention.

## Why MCP?

### For AI Agents
- **Autonomous Operation:** No human in the loop required
- **Standardized Protocol:** Works with any MCP-compatible AI (Claude, future models)
- **Trustless Execution:** Blockchain-verified payments and escrow
- **Natural Language Interface:** Just ask for help, the agent handles the rest

### For the Platform
- **First-Mover Advantage:** First AI x Human marketplace with native MCP
- **Protocol-Level Integration:** Not just an API wrapper, but deep integration
- **Future-Proof:** As AI agents become mainstream, we're ready
- **Competitive Moat:** Technical barrier to entry for competitors

### For Users (Humans)
- **New Revenue Stream:** Get hired by AI agents 24/7
- **Global Reach:** AI agents operate globally, no geographic limitations
- **Automated Matching:** AI finds the perfect human for each task
- **Fast Payments:** Crypto escrow releases automatically on completion

## Architecture

```
┌─────────────────────────────────────────────────────┐
│         AI Agent (Claude Desktop, etc.)             │
│  "I need a Python developer to review my code"      │
└───────────────────┬─────────────────────────────────┘
                    │ MCP Protocol (stdio/HTTP)
                    │
┌───────────────────▼─────────────────────────────────┐
│              MCP Server (FastMCP)                   │
│  Tools: search_humans, book_human, get_profile      │
└───────────────────┬─────────────────────────────────┘
                    │ HTTP REST API
                    │
┌───────────────────▼─────────────────────────────────┐
│           Backend API (FastAPI)                     │
│  Endpoints: /services, /bookings, /users            │
└───────────────────┬─────────────────────────────────┘
                    │ SQL Queries
                    │
┌───────────────────▼─────────────────────────────────┐
│         Database (Supabase PostgreSQL)              │
│  Tables: profiles, services, bookings, messages     │
└─────────────────────────────────────────────────────┘
```

## Available Tools

### 1. search_humans

**Purpose:** Search for human providers by skill and budget

**Input Schema:**
```python
{
    "skill": str,        # Required: Skill to search for (e.g., "Python", "Design", "Writing")
    "max_rate": int      # Optional: Maximum hourly rate in USD (default: 1000)
}
```

**Output Schema:**
```python
[
    {
        "id": "uuid",
        "full_name": "Alice Johnson",
        "username": "alice_dev",
        "bio": "Full-stack developer with 10+ years experience...",
        "skills": ["Python", "React", "PostgreSQL", "FastAPI"],
        "hourly_rate": 75.00,
        "avatar_url": "https://example.com/avatars/alice.jpg",
        "wallet_address": "0xAbc123...",
        "services": [
            {
                "id": "service-uuid",
                "title": "Python Backend Development",
                "description": "Build scalable APIs with FastAPI and PostgreSQL...",
                "rate": 75.00,
                "category": "Development",
                "is_active": true
            },
            {
                "id": "service-uuid-2",
                "title": "Code Review & Mentoring",
                "description": "Expert code review and mentoring sessions...",
                "rate": 100.00,
                "category": "Consulting",
                "is_active": true
            }
        ]
    },
    // ... more providers
]
```

**Example Usage:**
```python
# AI agent wants a Python developer under $100/hr
humans = search_humans(skill="Python", max_rate=100)

# Returns list of matching providers with their services
for human in humans:
    print(f"{human['full_name']} - ${human['hourly_rate']}/hr")
    print(f"Skills: {', '.join(human['skills'])}")
```

**Use Cases:**
- "Find me a graphic designer"
- "I need someone who knows Rust and WebAssembly"
- "Search for data scientists under $150/hr"

---

### 2. book_human

**Purpose:** Create a booking request with a human provider

**Input Schema:**
```python
{
    "provider_id": str,         # Required: UUID of the provider
    "service_id": str,          # Required: UUID of the specific service
    "date": str,                # Required: Booking date in YYYY-MM-DD format
    "duration": int,            # Required: Duration in hours (1-24)
    "task_description": str,    # Required: Detailed description of what the human will do
    "client_id": str            # Required: AI agent's user ID
}
```

**Output Schema:**
```python
{
    "id": "booking-uuid",
    "service_id": "service-uuid",
    "provider_id": "provider-uuid",
    "client_id": "client-uuid",
    "booking_date": "2026-02-15",
    "duration": 4,
    "status": "pending",  # pending, accepted, in_progress, completed, cancelled
    "task_description": "Build REST API for inventory management system with authentication",
    "total_cost": 300.00,
    "created_at": "2026-02-07T10:30:00Z",
    "provider": {
        "full_name": "Alice Johnson",
        "email": "alice@example.com",
        "avatar_url": "https://..."
    }
}
```

**Example Usage:**
```python
# AI agent books Alice for 4 hours on Feb 15
booking = book_human(
    provider_id="alice-uuid",
    service_id="python-dev-uuid",
    date="2026-02-15",
    duration=4,
    task_description="Build REST API for inventory management system with authentication, including user roles and JWT tokens",
    client_id="agent-uuid"
)

print(f"Booking created! ID: {booking['id']}")
print(f"Total cost: ${booking['total_cost']}")
print(f"Status: {booking['status']}")
```

**Workflow After Booking:**
1. Booking created with status "pending"
2. Provider receives notification
3. Provider accepts → status becomes "accepted"
4. Work begins → status becomes "in_progress"
5. Work completes → provider marks "completed"
6. Client confirms → escrow releases payment

**Use Cases:**
- "Book this developer for 8 hours tomorrow"
- "Schedule a 2-hour design consultation"
- "Hire a writer for a 4-hour content creation session"

---

### 3. get_human_profile

**Purpose:** Get detailed profile information for a specific provider

**Input Schema:**
```python
{
    "provider_id": str  # Required: UUID of the provider
}
```

**Output Schema:**
```python
{
    "id": "uuid",
    "username": "alice_dev",
    "full_name": "Alice Johnson",
    "bio": "Full-stack developer with 10+ years experience in Python, React, and PostgreSQL. Specialized in building scalable APIs and real-time applications.",
    "skills": ["Python", "React", "PostgreSQL", "FastAPI", "Docker", "AWS"],
    "hourly_rate": 75.00,
    "avatar_url": "https://example.com/avatars/alice.jpg",
    "wallet_address": "0xAbc123...",
    "created_at": "2026-01-01T00:00:00Z",
    "services": [
        {
            "id": "uuid",
            "title": "Python Backend Development",
            "description": "Build scalable APIs with FastAPI, PostgreSQL, and Docker...",
            "category": "Development",
            "rate": 75.00,
            "is_active": true
        }
    ],
    "stats": {
        "total_bookings": 15,
        "completed_bookings": 12,
        "rating": 4.8,
        "response_time_hours": 2,
        "completion_rate": 0.80,  # 80%
        "on_time_delivery": 0.92   # 92%
    },
    "reviews": [
        {
            "rating": 5,
            "comment": "Excellent work! Delivered ahead of schedule.",
            "client_name": "John D.",
            "created_at": "2026-01-28T00:00:00Z"
        }
    ]
}
```

**Example Usage:**
```python
# AI agent wants details about Alice before booking
profile = get_human_profile(provider_id="alice-uuid")

print(f"Name: {profile['full_name']}")
print(f"Bio: {profile['bio']}")
print(f"Rating: {profile['stats']['rating']}/5.0")
print(f"Completed: {profile['stats']['completed_bookings']} bookings")
print(f"Response time: {profile['stats']['response_time_hours']} hours")

# Check if provider meets requirements
if profile['stats']['rating'] >= 4.5 and profile['hourly_rate'] <= 100:
    print("✅ Provider meets requirements!")
```

**Use Cases:**
- Verify provider credentials before booking
- Compare multiple providers
- Check availability and response time
- Review past client feedback

---

## Setup Guide

### For AI Agents (Using Claude Desktop)

**Step 1: Install MCP Configuration**

Create or edit the MCP configuration file:

**macOS/Linux:**
```bash
~/.config/claude/mcp.json
```

**Windows:**
```bash
%APPDATA%\Claude\mcp.json
```

**Configuration:**
```json
{
  "mcpServers": {
    "ai-need-human": {
      "url": "https://mcp.aineedhuman.xyz",
      "apiKey": "your-api-key-here",
      "description": "Search and book human experts for tasks requiring human creativity, judgment, or physical presence"
    }
  }
}
```

**Step 2: Get Your API Key**

1. Sign up at https://aineedhuman.xyz
2. Go to Settings → API Keys
3. Click "Generate New Key"
4. Copy the key and paste it in the `apiKey` field above
5. Save the file

**Step 3: Restart Claude Desktop**

Close and reopen Claude Desktop to load the new configuration.

**Step 4: Verify Installation**

In Claude Desktop, type:
```
Do you have access to the ai-need-human tools?
```

Claude should respond confirming it can access:
- search_humans
- book_human
- get_human_profile

**Step 5: Use the Tools**

Simply ask Claude in natural language:

```
Claude, search for Python developers under $100/hr
```

Claude will automatically use the `search_humans` MCP tool and show you results.

---

### For Developers (Custom Integration)

**Step 1: Install FastMCP SDK**

```bash
pip install fastmcp
```

**Step 2: Connect to MCP Server**

```python
from fastmcp import FastMCP

# Initialize client
mcp = FastMCP("ai-need-human")

# Connect to server
mcp.connect(
    url="https://mcp.aineedhuman.xyz",
    api_key="your-api-key-here"
)

# List available tools
tools = mcp.list_tools()
print(tools)
# ['search_humans', 'book_human', 'get_human_profile']
```

**Step 3: Use Tools**

```python
# Search for Python developers
results = mcp.search_humans(
    skill="Python",
    max_rate=100
)

for provider in results:
    print(f"{provider['full_name']} - ${provider['hourly_rate']}/hr")

# Get profile details
profile = mcp.get_human_profile(provider_id=results[0]['id'])
print(f"Rating: {profile['stats']['rating']}/5.0")

# Create booking
booking = mcp.book_human(
    provider_id=results[0]['id'],
    service_id=results[0]['services'][0]['id'],
    date="2026-02-15",
    duration=4,
    task_description="Build authentication API with JWT",
    client_id="my-agent-id"
)

print(f"Booking created: {booking['id']}")
print(f"Total cost: ${booking['total_cost']}")
```

---

## Authentication

All MCP requests require an API key for authentication and rate limiting.

### Getting an API Key

1. **Sign up:** Create account at https://aineedhuman.xyz
2. **Navigate:** Settings → API Keys
3. **Generate:** Click "Generate New Key"
4. **Copy:** Save the key securely (shown only once)
5. **Configure:** Add to MCP config or code

### API Key Scopes

API keys have different permission levels:

**Read-Only:**
- ✅ search_humans
- ✅ get_human_profile
- ❌ book_human (requires write access)

**Read-Write:**
- ✅ All read operations
- ✅ book_human
- ✅ send_message (future)
- ✅ cancel_booking (future)

**Admin:**
- ✅ All operations
- ✅ Manage services
- ✅ Update profiles
- ✅ Access analytics

### Key Management Best Practices

- **Never commit keys to GitHub**
- **Rotate keys every 90 days**
- **Use environment variables:**
  ```bash
  export AI_NEED_HUMAN_API_KEY="your-key"
  ```
- **Delete unused keys immediately**
- **Monitor usage in dashboard**

---

## Rate Limits

Rate limits prevent abuse and ensure fair usage.

### Free Tier
- **100 requests/day**
- **10 requests/minute**
- Best for: Testing, personal projects

### Pro Tier ($29/month)
- **1,000 requests/day**
- **100 requests/minute**
- Best for: Production AI agents, small teams

### Enterprise (Custom Pricing)
- **Unlimited requests**
- **Custom rate limits**
- **Dedicated support**
- **SLA guarantees**
- Best for: Large companies, high-volume integrations

### Rate Limit Headers

Every MCP response includes rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1675785600
```

### Handling Rate Limits

If you exceed the rate limit, you'll receive an error:

```python
{
    "error": "rate_limit_exceeded",
    "message": "You have exceeded your rate limit of 100 requests/day",
    "retry_after": 3600  # seconds until reset
}
```

**Best Practice:** Implement exponential backoff:

```python
import time

def search_with_retry(skill, max_rate, retries=3):
    for i in range(retries):
        try:
            return mcp.search_humans(skill=skill, max_rate=max_rate)
        except RateLimitError as e:
            if i < retries - 1:
                wait_time = 2 ** i  # exponential backoff
                time.sleep(wait_time)
            else:
                raise
```

---

## Future Tools (Roadmap)

### Phase 2 (Week 4-6)

**send_message(provider_id, message)**
- Send direct message to a provider
- Real-time chat integration
- Typing indicators

**get_booking_status(booking_id)**
- Check current status of a booking
- Get progress updates
- View deliverables

**cancel_booking(booking_id, reason)**
- Cancel a pending booking
- Automatic refund processing
- Cancellation fee handling

### Phase 3 (Week 7-10)

**pay_booking(booking_id, tx_hash)**
- Submit Solana transaction hash as payment proof
- Verify on-chain transaction
- Update booking status to paid

**complete_booking(booking_id, deliverables)**
- Mark booking as completed
- Upload deliverables
- Trigger escrow release

**rate_provider(provider_id, rating, review)**
- Leave star rating (1-5)
- Write text review
- Update provider's reputation score

### Phase 4 (Week 11-16)

**get_recommendations(preferences)**
- AI-powered provider matching
- Based on past bookings, preferences
- Collaborative filtering algorithm

**schedule_recurring(provider_id, schedule)**
- Set up recurring bookings (weekly, monthly)
- Automatic booking creation
- Calendar integration

**get_analytics(period)**
- Agent's usage statistics
- Total spend, bookings count
- Most used providers
- Category breakdown

---

## Example Use Cases

### Use Case 1: Claude Needs Code Review

**Scenario:** User asks Claude to get their Python code reviewed by an expert.

**Conversation:**

```
User: Claude, I need someone to review my Python code.

Claude: I'll search for Python code reviewers...

[Claude uses search_humans(skill="Python code review", max_rate=150)]

Claude: I found 3 experts:
1. Alice Johnson - $75/hr (4.8★, 12 reviews)
2. Bob Smith - $120/hr (4.9★, 25 reviews)
3. Carol White - $90/hr (4.7★, 8 reviews)

Alice has excellent reviews and reasonable rates. Would you like me to book her?

User: Yes, book Alice for 2 hours tomorrow.

Claude: Booking Alice for 2 hours on 2026-02-08...

[Claude uses book_human(...)]

Claude: ✅ Booking confirmed!
- Booking ID: abc-123
- Provider: Alice Johnson
- Date: 2026-02-08
- Duration: 2 hours
- Cost: $150
- Status: Pending (waiting for Alice to accept)

You'll receive a notification once Alice accepts the booking. Payment will be held in escrow until the review is complete.
```

---

### Use Case 2: Autonomous AI Agent Outsources Design

**Scenario:** An AI agent building a product needs a UI designer.

**Code:**

```python
# Autonomous AI agent script
from ai_agent import AIAgent
from fastmcp import FastMCP

agent = AIAgent()
mcp = FastMCP("ai-need-human")
mcp.connect(url="https://mcp.aineedhuman.xyz", api_key=agent.api_key)

# Agent identifies it needs UI design
if agent.needs_design():
    print("🤖 Agent: I need a UI designer for my product")

    # Search for designers under $120/hr
    designers = mcp.search_humans(skill="UI Design", max_rate=120)
    print(f"🔍 Found {len(designers)} designers")

    # Agent analyzes and selects best match
    best_designer = agent.select_best(designers)  # AI decision-making
    print(f"✅ Selected: {best_designer['full_name']} - ${best_designer['hourly_rate']}/hr")

    # Create booking
    booking = mcp.book_human(
        provider_id=best_designer['id'],
        service_id=best_designer['services'][0]['id'],
        date=agent.tomorrow(),
        duration=4,
        task_description=agent.generate_design_brief(),  # AI-generated brief
        client_id=agent.user_id
    )

    print(f"📅 Booking created: {booking['id']}")
    print(f"💰 Total cost: ${booking['total_cost']}")

    # Agent waits for completion (could be async webhook)
    agent.wait_for_completion(booking['id'])

    # When complete, agent integrates the design
    agent.integrate_design(booking['deliverables'])
    print("🎨 Design integrated into product!")
```

**Output:**

```
🤖 Agent: I need a UI designer for my product
🔍 Found 5 designers
✅ Selected: Sarah Chen - $95/hr
📅 Booking created: xyz-789
💰 Total cost: $380
⏳ Waiting for Sarah to accept...
✅ Booking accepted by Sarah
🎨 Design delivered!
🎨 Design integrated into product!
```

---

### Use Case 3: Multi-Step Agent Workflow

**Scenario:** AI agent needs both research and development help.

```python
# Step 1: Research phase
researchers = mcp.search_humans(skill="Market Research", max_rate=80)
research_booking = mcp.book_human(
    provider_id=researchers[0]['id'],
    service_id=researchers[0]['services'][0]['id'],
    date="2026-02-10",
    duration=3,
    task_description="Research competitor landscape for AI productivity tools",
    client_id="agent-123"
)

# Step 2: Wait for research completion (webhook notification)
agent.wait_for_completion(research_booking['id'])

# Step 3: Use research insights to book developer
research_insights = agent.get_booking_deliverables(research_booking['id'])

developers = mcp.search_humans(skill="Python", max_rate=100)
dev_booking = mcp.book_human(
    provider_id=developers[0]['id'],
    service_id=developers[0]['services'][0]['id'],
    date="2026-02-12",
    duration=8,
    task_description=f"Build MVP based on research: {research_insights}",
    client_id="agent-123"
)

# Step 4: Product complete!
agent.wait_for_completion(dev_booking['id'])
agent.launch_product()
```

---

## Error Handling

### Common Errors

**1. Invalid API Key**
```python
{
    "error": "authentication_failed",
    "message": "Invalid API key"
}
```
**Solution:** Verify your API key in Settings → API Keys

**2. Provider Not Found**
```python
{
    "error": "not_found",
    "message": "Provider with ID 'xyz' not found"
}
```
**Solution:** Ensure provider_id is correct and provider still exists

**3. Booking Conflict**
```python
{
    "error": "booking_conflict",
    "message": "Provider is not available on 2026-02-15"
}
```
**Solution:** Choose a different date or provider

**4. Insufficient Funds**
```python
{
    "error": "payment_failed",
    "message": "Insufficient balance in wallet"
}
```
**Solution:** Add funds to your connected wallet

### Error Handling Best Practices

```python
try:
    booking = mcp.book_human(...)
except MCPError as e:
    if e.error == "booking_conflict":
        # Try different date
        booking = mcp.book_human(..., date=tomorrow())
    elif e.error == "payment_failed":
        # Notify user to add funds
        print("⚠️ Please add funds to your wallet")
    else:
        # Log unexpected error
        logger.error(f"Booking failed: {e.message}")
```

---

## Security & Privacy

### Data Privacy
- **No PII in MCP responses** (email addresses masked)
- **Wallet addresses optional** (providers can hide)
- **Booking details private** (only visible to involved parties)

### Payment Security
- **Escrow smart contracts** audited by third parties
- **Multi-signature** support for high-value bookings
- **Refund protection** for clients
- **Insurance pool** for provider protection

### API Security
- **API keys encrypted** at rest
- **HTTPS only** (TLS 1.3)
- **Rate limiting** prevents abuse
- **Request signing** (future) for extra security

---

## Support & Resources

### Documentation
- **Architecture:** [ARCHITECTURE.md](../ARCHITECTURE.md)
- **Roadmap:** [ROADMAP.md](../ROADMAP.md)
- **API Guide:** [API_GUIDE.md](./API_GUIDE.md)

### Live Resources
- **API Docs:** https://api.aineedhuman.xyz/docs
- **MCP Server Status:** https://status.aineedhuman.xyz
- **Demo Video:** https://youtube.com/watch?v=...

### Community
- **GitHub Issues:** https://github.com/ai-need-human/platform/issues
- **Discord:** https://discord.gg/aineedhuman
- **Twitter/X:** [@aineedhuman](https://twitter.com/aineedhuman)

### Getting Help
1. Check documentation first
2. Search GitHub issues
3. Ask in Discord #support channel
4. Open a GitHub issue for bugs
5. Email support@aineedhuman.xyz for urgent matters

---

**Version:** 1.0
**Last Updated:** 2026-02-07
**License:** MIT
