# 🎯 START HERE - Quick Setup

Choose your path:

## Option 1: Interactive Setup Wizard (Recommended) ⭐

Run the interactive wizard that guides you step-by-step:

```bash
python3 setup_wizard.py
```

This will:
- ✅ Guide you through Supabase setup
- ✅ Collect all API keys
- ✅ Generate security keys
- ✅ Create your .env file automatically
- ✅ Show you next steps

**Time**: ~5 minutes

---

## Option 2: Manual Setup (Detailed Guide)

Follow the detailed step-by-step guide:

```bash
cat SETUP_NOW.md
# or open SETUP_NOW.md in your editor
```

**Time**: ~10 minutes

---

## What You Need

### 1. Supabase Account (FREE)
- **URL**: https://supabase.com
- **Sign up**: Takes 2 minutes
- **Create project**: Takes 2 minutes more
- **What you'll get**:
  - Database URL
  - API keys
  - Free PostgreSQL database

### 2. Python 3.11+
Check your version:
```bash
python3 --version
```

If you don't have Python 3.11+, download from: https://www.python.org/downloads/

---

## Quick Start (TL;DR)

```bash
# 1. Run the setup wizard
python3 setup_wizard.py

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
# OR: venv\Scripts\activate  # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Setup database (copy database_schema.sql to Supabase SQL Editor and run it)

# 5. Seed demo data
python seed_data.py

# 6. Start server
uvicorn main:app --reload

# 7. Open browser
# http://localhost:8000/docs
```

---

## After Setup

### Test Your API

**Login URL**: http://localhost:8000/docs

**Demo Credentials**:
```
Email: alice@demo.rentahuman.xyz
Password: demo123456
```

**Try it**:
1. Go to http://localhost:8000/docs
2. Click POST /auth/login
3. Click "Try it out"
4. Use the credentials above
5. Click "Execute"
6. Copy the access_token
7. Click "Authorize" (top right)
8. Paste token as: `Bearer <your-token>`
9. Now try GET /auth/me

---

## Help & Support

- **Setup issues?** → Read `SETUP_NOW.md`
- **API questions?** → Check `README.md`
- **Quick reference?** → Check `QUICKSTART.md`
- **Testing?** → Run `python test_setup.py`

---

## What's Next?

After setup is complete:

1. **Day 1**: ✅ DONE (Foundation + Auth)
2. **Day 2**: Implement user profiles & services
3. **Day 3**: Build booking system
4. **Day 4**: Add real-time chat
5. **Day 5**: MCP integration (AI agents!)
6. **Day 6**: Crypto payments
7. **Day 7**: Deploy & demo

---

**Let's go! 🚀**

Run: `python3 setup_wizard.py`
