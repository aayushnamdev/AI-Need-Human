# 🔌 Connect All Services - Action Plan

## What You Need to Setup RIGHT NOW

### ✅ Required Services

1. **Supabase** (Database + Auth) - FREE
   - **Why**: Stores all user data, services, bookings, messages
   - **Setup time**: 5 minutes
   - **Cost**: FREE (up to 500MB database)

### 🔜 Optional Services (for later days)

2. **Alchemy** (Polygon RPC) - Day 6
   - **Why**: Connect to Polygon blockchain for crypto payments
   - **Setup time**: 3 minutes
   - **Cost**: FREE (300M compute units/month)

3. **Railway** (Deployment) - Day 7
   - **Why**: Deploy backend to production
   - **Setup time**: 5 minutes
   - **Cost**: $5 free credit

---

## 🚀 Setup Action Plan - DO THIS NOW

### Step 1: Run the Setup Wizard (5 minutes)

```bash
cd /Users/aayushnamdev/Downloads/Rent_a_human/Backend

# Run the interactive wizard
python3 setup_wizard.py
```

The wizard will:
1. Guide you to create Supabase account
2. Ask for your Supabase credentials
3. Generate secure keys
4. Create your .env file automatically

**STOP AFTER THIS** and come back here!

---

### Step 2: Install Python Dependencies (2 minutes)

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install all packages
pip install -r requirements.txt
```

Wait for installation to complete...

---

### Step 3: Setup Database Schema (3 minutes)

**Open Supabase Dashboard**:
1. Go to https://app.supabase.com
2. Click your `rent-a-human` project
3. Click **SQL Editor** (left sidebar)
4. Click **New query**

**Copy database schema**:
```bash
# Display the schema file
cat database_schema.sql
```

5. **Copy ALL** the SQL code
6. **Paste** into Supabase SQL Editor
7. **Click "Run"**
8. Wait for "Success" message

**Verify tables**:
- Click **Table Editor** (left sidebar)
- You should see 5 tables: profiles, services, bookings, messages, payments

---

### Step 4: Verify Connection (30 seconds)

```bash
# Test if everything is connected
python test_setup.py
```

**Expected output**:
```
✅ Environment Variables
✅ Package Imports
✅ Password Hashing
✅ JWT Tokens
✅ Connected to Supabase - Found 0 profiles
```

If you see ✅ on all tests, **YOU'RE READY!**

---

### Step 5: Seed Demo Data (1 minute)

```bash
python seed_data.py
```

**Expected output**:
```
✅ Database seeding complete!
📊 Summary:
  - 10 demo users created
  - 20 service listings created
  - 8 bookings created
  - 12 messages created
```

---

### Step 6: Start the Server (10 seconds)

```bash
uvicorn main:app --reload
```

**Expected output**:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
🚀 Starting Rent a Human API...
📍 Environment: development
INFO:     Application startup complete.
```

**Keep this terminal open!**

---

### Step 7: Test the API (2 minutes)

**Open browser** → http://localhost:8000/docs

You should see beautiful API documentation!

**Test login**:
1. Find **POST /auth/login**
2. Click **"Try it out"**
3. Enter:
   ```json
   {
     "email": "alice@demo.rentahuman.xyz",
     "password": "demo123456"
   }
   ```
4. Click **"Execute"**

**Expected response**:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "alice@demo.rentahuman.xyz",
    "username": "alice_dev",
    "full_name": "Alice Johnson"
  }
}
```

**✅ IF YOU SEE THIS, EVERYTHING IS WORKING!**

---

## 📊 What Gets Created

### In Supabase (Database)

**5 Tables**:
- `profiles` - 10 demo users
- `services` - 20 service listings
- `bookings` - 8 sample bookings
- `messages` - Demo conversations
- `payments` - Empty (for Day 6)

**Can view data**:
- Supabase Dashboard → Table Editor
- Browse each table to see demo data

### In Your Project

**1 File Created**:
- `.env` - Your secret configuration file

**Contains**:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...
SUPABASE_JWT_SECRET=...
SECRET_KEY=... (generated)
```

---

## 🎯 Success Criteria

After following all steps above, you should have:

- [x] Supabase project created
- [x] `.env` file with credentials
- [x] Python packages installed
- [x] Database schema applied
- [x] Demo data loaded
- [x] Server running
- [x] API responding to requests
- [x] Can login with demo credentials

---

## 🚨 If Something Fails

### "ModuleNotFoundError"
```bash
# Activate virtual environment
source venv/bin/activate

# Reinstall
pip install -r requirements.txt
```

### "Missing Supabase credentials"
```bash
# Check if .env exists
ls -la .env

# If not, run wizard again
python3 setup_wizard.py
```

### "Connection failed"
- Check internet connection
- Verify Supabase project is active (not paused)
- Check credentials in `.env` are correct

### "Database schema error"
- Make sure you copied **ALL** of database_schema.sql
- Run it in Supabase SQL Editor (not locally)
- Check for error messages in Supabase

---

## ⏭️ After Everything Works

**You're ready for development!**

Current status:
- ✅ Day 1: Foundation + Auth (COMPLETE)
- 🔜 Day 2: User profiles & services (NEXT)

**Tell your frontend teammate**:
- API is running at: `http://localhost:8000`
- API docs at: `http://localhost:8000/docs`
- Demo credentials: alice@demo.rentahuman.xyz / demo123456

---

## 📞 Need Help?

1. **Check test**: `python test_setup.py`
2. **Check logs**: Look at server terminal for errors
3. **Check Supabase**: Dashboard → Logs tab
4. **Read docs**: `SETUP_NOW.md` for detailed guide

---

**Ready? Let's do this! 🚀**

Start with: `python3 setup_wizard.py`
