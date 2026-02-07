# Quick Start Guide - Rent a Human Backend

Get up and running in 10 minutes! ⚡

## Prerequisites Checklist

- [ ] Python 3.11+ installed (`python --version`)
- [ ] Supabase account (free: https://supabase.com)
- [ ] Git installed
- [ ] Text editor (VS Code recommended)

## Step-by-Step Setup

### 1. Create Supabase Project (5 minutes)

1. Go to https://supabase.com and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: rent-a-human
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Wait for project to initialize (~2 minutes)
5. Get your credentials:
   - Go to **Settings** → **API**
   - Copy **Project URL** (SUPABASE_URL)
   - Copy **service_role key** (SUPABASE_SERVICE_KEY)
   - Go to **Settings** → **API** → **JWT Settings**
   - Copy **JWT Secret** (SUPABASE_JWT_SECRET)

### 2. Clone & Setup Backend (2 minutes)

```bash
# Navigate to backend directory
cd Backend

# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment (1 minute)

```bash
# Copy example env file
cp .env.example .env

# Open .env in your text editor
# Fill in the Supabase credentials from Step 1
```

Your `.env` should look like:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...your-key-here
SUPABASE_JWT_SECRET=your-secret-here

CORS_ORIGINS=http://localhost:3000
SECRET_KEY=generate-random-key-here
```

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 4. Setup Database (2 minutes)

1. Open Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**
3. Copy entire contents of `database_schema.sql`
4. Paste into SQL Editor
5. Click **"Run"**
6. You should see: ✅ Success. No rows returned

### 5. Seed Demo Data (30 seconds)

```bash
python seed_data.py
```

You should see:
```
✅ Database seeding complete!
📊 Summary:
  - 10 demo users created
  - 20 service listings created
  - 8 bookings created
  - 12 messages created
```

### 6. Verify Setup (30 seconds)

```bash
python test_setup.py
```

All tests should pass! ✅

### 7. Start Server (10 seconds)

```bash
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### 8. Test the API (1 minute)

Open your browser to: **http://localhost:8000/docs**

You should see beautiful interactive API documentation! 🎉

**Try it out:**

1. Click on **POST /auth/login**
2. Click **"Try it out"**
3. Use demo credentials:
   ```json
   {
     "email": "alice@demo.rentahuman.xyz",
     "password": "demo123456"
   }
   ```
4. Click **"Execute"**
5. You should get a JWT token back! ✅

## What's Next?

### Day 1 ✅ Complete!

You now have:
- ✅ Working FastAPI backend
- ✅ Supabase database with schema
- ✅ Auth system (signup/login)
- ✅ 10 demo users
- ✅ 20 service listings
- ✅ Interactive API docs

### Day 2-7 Implementation

Check `README.md` for the full 7-day roadmap:
- **Day 2**: Profile & service endpoints
- **Day 3**: Booking system
- **Day 4**: Real-time chat
- **Day 5**: MCP integration (AI agents!)
- **Day 6**: Crypto payments
- **Day 7**: Deployment

## Common Issues & Fixes

### "ModuleNotFoundError: No module named 'fastapi'"

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### "Missing Supabase credentials"

Make sure `.env` file exists and has correct values from Supabase dashboard.

### "Connection to Supabase failed"

1. Check your internet connection
2. Verify SUPABASE_URL is correct (should start with https://)
3. Verify SUPABASE_SERVICE_KEY is the **service_role** key, not anon key

### Database schema errors

Make sure you:
1. Ran the ENTIRE `database_schema.sql` file
2. In Supabase SQL Editor (not locally)
3. Project is fully initialized (not still setting up)

### "Address already in use" error

Port 8000 is taken. Either:
```bash
# Kill existing process
lsof -ti:8000 | xargs kill

# OR use different port
uvicorn main:app --port 8001
```

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:8000/health

# Get services
curl http://localhost:8000/services

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@demo.rentahuman.xyz","password":"demo123456"}'
```

### Using the docs UI

Go to http://localhost:8000/docs and use the interactive interface!

## Demo Accounts

All demo users have the same password: `demo123456`

**Demo Users:**
- alice@demo.rentahuman.xyz - Full-stack developer
- bob@demo.rentahuman.xyz - UI/UX designer
- carol@demo.rentahuman.xyz - Technical writer
- david@demo.rentahuman.xyz - AI researcher
- emily@demo.rentahuman.xyz - Virtual assistant
- frank@demo.rentahuman.xyz - Hardware engineer
- grace@demo.rentahuman.xyz - Translator
- henry@demo.rentahuman.xyz - Legal advisor
- iris@demo.rentahuman.xyz - Marketing specialist
- jack@demo.rentahuman.xyz - Videographer

## Directory Structure

```
Backend/
├── main.py              # ← Start here
├── routers/             # API endpoints
├── services/            # Business logic
├── models/              # Data models
├── database_schema.sql  # DB schema
├── seed_data.py         # Demo data
├── test_setup.py        # Verification
├── requirements.txt     # Dependencies
└── .env                 # Your config (create this!)
```

## Next Steps

1. ✅ Backend is running
2. 🔜 Tell your frontend teammate the API is ready!
3. 🔜 Start implementing Day 2 features
4. 🔜 Deploy to Railway

## Need Help?

- Check the API docs: http://localhost:8000/docs
- Read full README: `README.md`
- Check logs in terminal where server is running

---

🎉 **Congratulations!** You've completed Day 1 setup. The backend is ready for the frontend to integrate!
