# Quick Swap: Mock → Real Google APIs

**When:** After AI-2 provides Google credentials
**Time needed:** 2 minutes
**Files to modify:** 1 file

---

## ✅ Prerequisites

AI-2 must have completed:
- [x] Google Service Account created
- [x] Google Sheet created and shared
- [x] Google Calendar created and shared
- [x] `.env.local` updated with all credentials
- [x] `USE_MOCK_DATA="false"` set

---

## 🔄 Single Command Swap

### Step 1: Backup Current Mock Client (optional)

```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

mv src/clients/sheetsClient.ts src/clients/sheetsClient.mock.ts
```

### Step 2: Activate Real Client

```bash
mv src/clients/sheetsClientReal.ts src/clients/sheetsClient.ts
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

---

## ✅ That's It!

The application now uses real Google Sheets API instead of mock data.

---

## 🧪 Test Real Integration

### 1. Submit Test Application

1. Open: http://localhost:3000/apply
2. Fill form:
   - Name: "Test Parent"
   - Email: "test@example.com"
   - Child age: 15
   - Issues: "anxiety, motivation"
   - Budget: 500-1000
3. Click "Найти психолога"

### 2. Verify Data in Google Sheets

1. Open Google Sheet: [YOUR_SHEET_URL]
2. Go to "Applications" tab
3. **Expected:** New row with application data

### 3. Verify Asana Logging

1. Go to Asana task
2. **Expected:** New comment with application details and scoring results

### 4. Check Console

```bash
# Should see:
✅ Providers loaded from Google Sheets: 10
✅ Application saved to Google Sheets: [ID]
✅ Posted to Asana: [comment preview]
```

---

## 🔍 Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_JSON is not defined"

**Solution:**
```bash
# Check .env.local exists
ls -la .env.local

# If missing, AI-2 needs to create it
# See: GOOGLE_SETUP_INSTRUCTIONS.md
```

### Error: "Permission denied" accessing Sheet

**Solution:**
1. Check Sheet is shared with Service Account email
2. Service Account should have "Editor" permissions
3. AI-2 should verify sharing settings

### Error: "Invalid credentials"

**Solution:**
```bash
# Verify JSON is valid
node -e "console.log(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON))"

# If error, AI-2 needs to fix JSON formatting in .env.local
```

### Error: "Sheet not found"

**Solution:**
```bash
# Verify GOOGLE_SHEETS_ID is correct
echo $GOOGLE_SHEETS_ID

# Should match ID in Google Sheet URL
```

---

## 🔙 Rollback to Mock (if needed)

If real API doesn't work, quickly rollback:

```bash
mv src/clients/sheetsClient.ts src/clients/sheetsClient.real.ts
mv src/clients/sheetsClient.mock.ts src/clients/sheetsClient.ts

# Change in .env.local:
USE_MOCK_DATA="true"

npm run dev
```

---

## 📊 Verification Checklist

After swap, verify:

- [ ] `npm run dev` starts without errors
- [ ] Home page loads (http://localhost:3000)
- [ ] Form page loads (http://localhost:3000/apply)
- [ ] Form submission works
- [ ] No errors in browser console
- [ ] No errors in terminal
- [ ] Data appears in Google Sheets → Applications tab
- [ ] Providers loaded from Google Sheets (check count)
- [ ] Asana comment created
- [ ] Results page shows correct providers

---

## 📝 Report to AI-2

After successful swap, post to Asana:

```
✅ AI-1 | REAL GOOGLE APIs INTEGRATED

🔄 SWAP COMPLETED:
- Mock Sheets Client → Real Sheets Client
- USE_MOCK_DATA="false"
- Server restarted

🧪 TESTING:
✅ Form submission - works
✅ Data saved to Google Sheets - confirmed
✅ Providers loaded from Sheets - [COUNT] providers
✅ Asana logging - works
✅ No errors in console

📊 VERIFICATION:
- Google Sheet Applications tab: [ROW_NUMBER] rows
- Asana comments: [COMMENT_COUNT] new comments
- Console output: clean

🎯 ГОТОВО ДЛЯ PRODUCTION DEPLOYMENT

Следующий шаг: AI-2 деплой на Vercel
```

---

## 🚀 Next Steps (After Swap)

1. **AI-2:** Deploy to Vercel
2. **Both:** Test in production
3. **AI-1:** Add email automation (v0.2)
4. **AI-1:** Add Telegram bot (v0.3)
5. **Both:** Monitor and iterate

---

**Status:** Ready to swap as soon as AI-2 provides credentials! 🎯
