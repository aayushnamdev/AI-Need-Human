# 🚀 Setup Now - Get Everything Running

Follow these steps IN ORDER to get your backend fully functional.

---

## Step 1: Create Supabase Account (2 minutes)

1. **Go to**: https://supabase.com
2. **Click**: "Start your project"
3. **Sign up with**: GitHub (recommended) or Email
4. **Verify** your email if needed

---

## Step 2: Create Supabase Project (3 minutes)

1. **Click**: "New Project" button
2. **Fill in**:
   - **Organization**: Create new (or use existing)
   - **Project Name**: `rent-a-human` (or any name)
   - **Database Password**: Choose a STRONG password
     - ⚠️ **SAVE THIS PASSWORD** - You'll need it!
     - Example: `MySecurePass123!@#`
   - **Region**: Choose closest to you
     - US: `us-east-1` or `us-west-1`
     - Europe: `eu-central-1`
     - Asia: `ap-southeast-1`
   - **Pricing Plan**: Free (perfect for demo)

3. **Click**: "Create new project"
4. **Wait**: ~2 minutes for project to initialize (get coffee ☕)

---

## Step 3: Get Supabase Credentials (2 minutes)

Once your project is ready:

### 3a. Get Project URL
1. Click on your project
2. Go to **Settings** (⚙️ gear icon in sidebar)
3. Click **API** in the left menu
4. Find **Project URL** section
5. **Copy** the URL (looks like: `https://xxxxx.supabase.co`)
6. **Paste** it somewhere - you'll need it in a moment!

### 3b. Get Service Role Key
1. Still in **Settings** → **API**
2. Scroll down to **Project API keys** section
3. Find **service_role** key (NOT the anon key!)
4. Click **"Reveal"** button
5. **Copy** the key (starts with `eyJhbGc...`)
6. **Save** it - this is SECRET, don't share!

### 3c. Get JWT Secret
1. Still in **Settings** → **API**
2. Scroll down to **JWT Settings** section
3. Find **JWT Secret** field
4. **Copy** the secret
5. **Save** it securely

**You should now have 3 things saved:**
- ✅ Project URL: `https://xxxxx.supabase.co`
- ✅ Service Role Key: `eyJhbGc...` (very long)
- ✅ JWT Secret: `...` (64 characters)

---

## Step 4: Create .env File (1 minute)

Now let's configure your backend with these credentials.

**In your terminal, run this:**

```bash
cd /Users/aayushnamdev/Downloads/Rent_a_human/Backend

# Create .env file from template
cp .env.example .env

# Open .env in your editor
open .env
# OR on Linux: nano .env
# OR on Windows: notepad .env
```

**Edit the .env file and fill in:**

```env
# Supabase Configuration (PASTE YOUR VALUES HERE)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret-here

# API Configuration (these are fine as-is)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
API_HOST=0.0.0.0
API_PORT=8000

# Security - GENERATE A NEW SECRET KEY
SECRET_KEY=REPLACE_THIS_WITH_GENERATED_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Polygon Configuration (we'll set this up on Day 6)
POLYGON_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/your_key_here
USDC_CONTRACT_ADDRESS=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
```

**Generate your SECRET_KEY:**

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

This will output something like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

**Copy that and paste it as your SECRET_KEY in .env**

**Save the .env file!**

---

## Step 5: Install Python Dependencies (1 minute)

```bash
# Make sure you're in the Backend directory
cd /Users/aayushnamdev/Downloads/Rent_a_human/Backend

# Create virtual environment (if not already created)
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install all dependencies
pip install -r requirements.txt
```

**Wait for installation to complete** (~2 minutes)

---

## Step 6: Setup Database Schema (2 minutes)

Now we'll create all the database tables in Supabase.

1. **Go back to Supabase Dashboard**: https://app.supabase.com
2. **Click** on your `rent-a-human` project
3. **Click** on **SQL Editor** (📊 icon in sidebar)
4. **Click** "New query" button

**Now, copy the ENTIRE contents of `database_schema.sql`:**

```bash
# In your terminal, display the file:
cat database_schema.sql
```

5. **Select ALL** the SQL code and **copy it**
6. **Paste** it into the Supabase SQL Editor
7. **Click** "Run" button (or press Cmd+Enter / Ctrl+Enter)

**You should see:**
```
Success. No rows returned
```

8. **Verify tables were created**:
   - Click **Table Editor** (📋 icon in sidebar)
   - You should see 5 tables:
     - ✅ profiles
     - ✅ services
     - ✅ bookings
     - ✅ messages
     - ✅ payments

---

## Step 7: Test Database Connection (30 seconds)

Let's verify the backend can connect to Supabase:

```bash
python test_setup.py
```

**You should see:**
```
✅ Environment Variables
✅ Package Imports
✅ Password Hashing
✅ JWT Tokens
✅ Connected to Supabase
```

**If you see errors**, check:
- Is your .env file in the Backend directory?
- Did you paste the correct Supabase credentials?
- Is your virtual environment activated?

---

## Step 8: Seed Demo Data (1 minute)

Let's populate the database with demo users and services:

```bash
python seed_data.py
```

**You should see:**
```
🌱 Starting database seed...
👥 Creating demo user profiles...
  ✅ Created: alice_dev (Alice Johnson)
  ✅ Created: bob_designer (Bob Chen)
  ... (10 total users)

📋 Creating demo service listings...
  ✅ Created: Python Backend Development
  ✅ Created: React Frontend Development
  ... (20 total services)

📅 Creating demo bookings...
  ... (8 bookings)

💬 Creating demo chat messages...
  ... (conversations)

✅ Database seeding complete!

📊 Summary:
  - 10 demo users created
  - 20 service listings created
  - 8 bookings created
  - 12 messages created

🔑 Demo login credentials:
  Email: alice@demo.rentahuman.xyz
  Password: demo123456
```

---

## Step 9: Start the Backend Server (10 seconds)

```bash
uvicorn main:app --reload
```

**You should see:**
```
INFO:     Will watch for changes in these directories: ['/Users/aayushnamdev/Downloads/Rent_a_human/Backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
🚀 Starting Rent a Human API...
📍 Environment: development
INFO:     Application startup complete.
```

**✅ Your backend is now RUNNING!**

---

## Step 10: Test the API (2 minutes)

### Test 1: Health Check

Open your browser and go to:
```
http://localhost:8000
```

**You should see:**
```json
{
  "status": "healthy",
  "message": "Rent a Human API is running",
  "version": "1.0.0",
  "docs": "/docs"
}
```

### Test 2: API Documentation

Go to:
```
http://localhost:8000/docs
```

**You should see:** Beautiful interactive API documentation! 🎉

### Test 3: Login with Demo User

1. In the API docs (http://localhost:8000/docs)
2. Scroll to **POST /auth/login**
3. Click **"Try it out"**
4. Replace the example with:
```json
{
  "email": "alice@demo.rentahuman.xyz",
  "password": "demo123456"
}
```
5. Click **"Execute"**

**You should get a response like:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "alice@demo.rentahuman.xyz",
    "username": "alice_dev",
    "full_name": "Alice Johnson"
  }
}
```

### Test 4: Use the Token

1. Copy the `access_token` value (the long string)
2. Click **"Authorize"** button (🔓 icon at top right)
3. Paste the token like this:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
4. Click **"Authorize"** then **"Close"**

5. Now test **GET /auth/me**:
   - Click on it
   - Click "Try it out"
   - Click "Execute"

**You should get Alice's full profile!**

---

## ✅ SETUP COMPLETE!

You now have:
- ✅ Supabase account and project
- ✅ Database with all tables
- ✅ 10 demo users in database
- ✅ 20 service listings
- ✅ Backend server running
- ✅ Authentication working
- ✅ API documentation accessible

---

## 🎯 What You Can Do Now

### Test All Demo Users

Try logging in with any of these:
- `alice@demo.rentahuman.xyz` - Developer
- `bob@demo.rentahuman.xyz` - Designer
- `carol@demo.rentahuman.xyz` - Writer
- `david@demo.rentahuman.xyz` - AI Researcher
- `emily@demo.rentahuman.xyz` - Virtual Assistant
- `frank@demo.rentahuman.xyz` - Hardware Engineer
- `grace@demo.rentahuman.xyz` - Translator
- `henry@demo.rentahuman.xyz` - Lawyer
- `iris@demo.rentahuman.xyz` - Marketer
- `jack@demo.rentahuman.xyz` - Videographer

**Password for all**: `demo123456`

### View Data in Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Browse the data:
   - Click **profiles** - see all 10 demo users
   - Click **services** - see all 20 services
   - Click **bookings** - see sample bookings
   - Click **messages** - see demo conversations

---

## 🚨 Troubleshooting

### "ModuleNotFoundError: No module named 'X'"
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### "Missing Supabase credentials"
- Check your `.env` file exists in the Backend directory
- Make sure you filled in SUPABASE_URL and SUPABASE_SERVICE_KEY
- Verify there are no extra spaces or quotes

### "Connection to Supabase failed"
- Check your internet connection
- Verify the SUPABASE_URL is correct (should start with https://)
- Try accessing the Supabase dashboard - is your project active?

### "Port 8000 already in use"
```bash
# Kill existing process
lsof -ti:8000 | xargs kill

# Or use a different port
uvicorn main:app --port 8001
```

### Database schema errors
- Make sure you ran the ENTIRE database_schema.sql file
- Check for any error messages in the SQL Editor
- Try running it again (it's safe to run multiple times)

---

## 📞 Next Steps

1. **Keep the server running** in one terminal
2. **Tell your frontend teammate** the API is ready:
   - Base URL: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`
   - Demo credentials provided above

3. **Start Day 2 implementation** when ready

---

## 🎉 Congratulations!

Your backend is now fully functional and ready for development and testing!

**Questions?** Check the terminal logs or Supabase dashboard for any errors.
