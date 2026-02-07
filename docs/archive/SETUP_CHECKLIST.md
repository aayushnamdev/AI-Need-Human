# Setup Checklist - Rent a Human Backend

Use this checklist to track your setup progress. Check off each item as you complete it!

## 📋 Pre-Setup

- [ ] Python 3.11+ installed (`python --version`)
- [ ] Git installed
- [ ] Text editor ready (VS Code recommended)
- [ ] Terminal/command line access

## 🗄️ Supabase Setup

- [ ] Created Supabase account at https://supabase.com
- [ ] Created new project named "rent-a-human"
- [ ] Saved database password
- [ ] Copied SUPABASE_URL from Settings → API
- [ ] Copied SUPABASE_SERVICE_KEY (service_role) from Settings → API
- [ ] Copied SUPABASE_JWT_SECRET from Settings → API → JWT Settings

## 💻 Local Environment Setup

- [ ] Navigated to Backend directory
- [ ] Created virtual environment (`python -m venv venv`)
- [ ] Activated virtual environment
  - Mac/Linux: `source venv/bin/activate`
  - Windows: `venv\Scripts\activate`
- [ ] Installed dependencies (`pip install -r requirements.txt`)
- [ ] Copied `.env.example` to `.env`
- [ ] Generated SECRET_KEY: `python -c "import secrets; print(secrets.token_hex(32))"`
- [ ] Filled in all `.env` variables:
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_SERVICE_KEY
  - [ ] SUPABASE_JWT_SECRET
  - [ ] SECRET_KEY
  - [ ] CORS_ORIGINS (default: http://localhost:3000)

## 🗃️ Database Setup

- [ ] Opened Supabase Dashboard
- [ ] Navigated to SQL Editor
- [ ] Created new query
- [ ] Copied contents of `database_schema.sql`
- [ ] Pasted into SQL Editor
- [ ] Clicked "Run" - should see success message
- [ ] Verified tables created (check Tables tab):
  - [ ] profiles
  - [ ] services
  - [ ] bookings
  - [ ] messages
  - [ ] payments

## 🌱 Seed Demo Data

- [ ] Ran seed script: `python seed_data.py`
- [ ] Saw success message with counts:
  - [ ] 10 demo users created
  - [ ] 20 service listings created
  - [ ] 8 bookings created
  - [ ] 12 messages created
- [ ] Noted demo password: `demo123456`

## ✅ Verification

- [ ] Ran setup test: `python test_setup.py`
- [ ] All 5 tests passed:
  - [ ] Environment Variables
  - [ ] Package Imports
  - [ ] Password Hashing
  - [ ] JWT Tokens
  - [ ] Supabase Connection

## 🚀 Server Launch

- [ ] Started server: `uvicorn main:app --reload`
- [ ] Saw startup message with no errors
- [ ] Server running at http://127.0.0.1:8000

## 🧪 API Testing

- [ ] Opened http://localhost:8000/docs in browser
- [ ] Saw Swagger UI documentation
- [ ] Tested health endpoint:
  - [ ] GET `/` returned status: "healthy"
- [ ] Tested authentication:
  - [ ] POST `/auth/login` with demo credentials worked
  - [ ] Received JWT access token
  - [ ] Got user object back
- [ ] Tested authenticated endpoint:
  - [ ] Used "Authorize" button in Swagger UI
  - [ ] Entered token: `Bearer <your-token>`
  - [ ] GET `/auth/me` returned user profile

## 📱 Frontend Integration Prep

- [ ] Noted API base URL: `http://localhost:8000`
- [ ] Shared with frontend teammate
- [ ] Confirmed CORS_ORIGINS includes frontend URL
- [ ] Tested from frontend (if ready):
  - [ ] Can login
  - [ ] Can get user profile
  - [ ] Receives proper CORS headers

## 🎯 Completion Checklist

- [ ] All files created (20 files total)
- [ ] Database schema applied
- [ ] Demo data seeded
- [ ] Server starts without errors
- [ ] API docs accessible
- [ ] Authentication working
- [ ] Environment variables set
- [ ] Ready for Day 2 implementation

## 🐛 Troubleshooting

If any checkbox fails, check the corresponding section:

**Environment issues** → See QUICKSTART.md "Common Issues"
**Database errors** → Verify schema ran completely
**Import errors** → Reinstall: `pip install -r requirements.txt`
**Supabase connection** → Double-check credentials in `.env`
**Server won't start** → Check for syntax errors in terminal

## 📚 Resources

- **Full Documentation**: `README.md`
- **Quick Setup**: `QUICKSTART.md`
- **Day 1 Summary**: `DAY1_COMPLETE.md`
- **API Docs**: http://localhost:8000/docs
- **Supabase Dashboard**: https://app.supabase.com

## 🎉 Success!

When all checkboxes are ✅:
- Day 1 is complete!
- Backend is production-ready for demo
- Ready to start Day 2 implementation
- Frontend can begin integration

---

**Current Status**: Day 1 of 7-day MVP sprint

**Next Up**: Day 2 - Implement user profiles and services endpoints

**Questions?** Check the documentation files or API docs!
