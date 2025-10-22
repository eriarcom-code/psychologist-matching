# Google Infrastructure Setup Instructions

**For:** AI-2 (Infrastructure Agent)
**Task:** Create Google Service Account, Sheets, and Calendar for Psychologist Matching Platform
**Estimated Time:** 45-60 minutes

---

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] Google Account (Gmail)
- [ ] Access to Google Cloud Console
- [ ] Browser (Chrome recommended)
- [ ] Text editor for copying credentials

---

## STEP 1: Create Google Cloud Project (10 min)

### 1.1 Go to Google Cloud Console
```
https://console.cloud.google.com/
```

### 1.2 Create New Project
1. Click "Select a project" (top bar)
2. Click "NEW PROJECT"
3. Fill in:
   - **Project name:** `Psychologist-Matching-Platform`
   - **Location:** No organization
4. Click "CREATE"
5. Wait ~30 seconds for project creation

### 1.3 Verify Project Selected
- Top bar should show: "Psychologist-Matching-Platform"

---

## STEP 2: Enable Required APIs (5 min)

### 2.1 Enable Google Sheets API
1. Go to: https://console.cloud.google.com/apis/library
2. Search: "Google Sheets API"
3. Click "Google Sheets API"
4. Click "ENABLE"
5. Wait ~10 seconds

### 2.2 Enable Google Calendar API
1. Go back to API Library
2. Search: "Google Calendar API"
3. Click "Google Calendar API"
4. Click "ENABLE"
5. Wait ~10 seconds

### 2.3 Verify Both Enabled
1. Go to: https://console.cloud.google.com/apis/dashboard
2. Should see:
   - ✅ Google Sheets API
   - ✅ Google Calendar API

---

## STEP 3: Create Service Account (10 min)

### 3.1 Navigate to Service Accounts
```
https://console.cloud.google.com/iam-admin/serviceaccounts
```

### 3.2 Create Service Account
1. Click "CREATE SERVICE ACCOUNT"
2. Fill in:
   - **Service account name:** `psychologist-platform-service`
   - **Service account ID:** (auto-generated)
   - **Description:** `Service account for Psychologist Matching Platform - Sheets and Calendar access`
3. Click "CREATE AND CONTINUE"

### 3.3 Grant Permissions
1. **Select a role:** `Editor`
2. Click "CONTINUE"
3. Click "DONE"

### 3.4 Create JSON Key
1. Find your service account in the list
2. Click the email address
3. Go to "KEYS" tab
4. Click "ADD KEY" → "Create new key"
5. Select "JSON"
6. Click "CREATE"
7. **IMPORTANT:** Save the downloaded JSON file securely
   - Filename will be like: `psychologist-matching-platform-xxxxx.json`

### 3.5 Copy Service Account Email
1. Open the downloaded JSON file
2. Find the `client_email` field
3. Copy the email (looks like: `psychologist-platform-service@project-id.iam.gserviceaccount.com`)
4. **Save this email** - you'll need it in next steps

---

## STEP 4: Create Google Sheet (15 min)

### 4.1 Create New Sheet
1. Go to: https://sheets.google.com/
2. Click "+ Blank" to create new spreadsheet
3. Rename to: `Psychologist Database`

### 4.2 Create "Providers" Sheet
1. Rename "Sheet1" to "Providers"
2. Add column headers in Row 1:

```
A: id
B: name
C: languages
D: approaches
E: specializations
F: age_groups
G: price_amount
H: price_currency
I: rating
J: reviews_count
K: verified
L: certifications
M: associations
N: email
O: phone
P: telegram
Q: whatsapp
R: availability
S: format
T: location
U: experience
V: education
W: bio
```

### 4.3 Add Test Data (Optional)
Copy data from `/dashboard-woweri/src/data/mockProviders.ts`

**Example row 2:**
```
1 | Ирина Островерх | ru,ua | CBT,Gestalt | anxiety,depression,teens | teens,adults | 800 | UAH | 4.8 | 156 | TRUE | CBT Practitioner,Clinical Psychologist | УАКПТ,EABCT | i.ostroverh@example.com | +380501234567 | @iostroverh | | Monday 14:00-18:00,Wednesday 14:00-20:00 | online | | 12 | КНУ им. Шевченко | Специализируюсь на работе с подростками...
```

### 4.4 Create "Applications" Sheet
1. Click "+" to add new sheet
2. Rename to "Applications"
3. Add column headers:

```
A: id
B: parent_id
C: child_id
D: budget_min
E: budget_max
F: budget_currency
G: available_slots
H: urgency
I: notes
J: created_at
K: status
```

### 4.5 Create "Config" Sheet
1. Click "+" to add new sheet
2. Rename to "Config"
3. Add headers:
   - A1: `key`
   - B1: `value`
4. Add config data:

```
A2: weight_language    | B2: 0.20
A3: weight_cbt         | B3: 0.15
A4: weight_price       | B4: 0.10
A5: weight_rating      | B5: 0.20
A6: weight_verified    | B6: 0.15
A7: weight_experience  | B7: 0.20
A8: required_age_group | B8: teens
A9: required_min_rating| B9: 4.0
```

### 4.6 Share with Service Account
1. Click "Share" button (top right)
2. Paste the Service Account email (from Step 3.5)
3. Role: **Editor**
4. **UNCHECK** "Notify people"
5. Click "Share"

### 4.7 Copy Sheet ID
1. Look at URL in browser
2. Copy the ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
3. **Save this Sheet ID** - you'll need it for .env.local

---

## STEP 5: Create Google Calendar (10 min)

### 5.1 Create New Calendar
1. Go to: https://calendar.google.com/
2. Click "+" next to "Other calendars"
3. Click "Create new calendar"
4. Fill in:
   - **Name:** `Psychologist Sessions`
   - **Description:** `Calendar for psychologist appointment booking`
   - **Time zone:** `(GMT+02:00) Kyiv`
5. Click "Create calendar"

### 5.2 Share with Service Account
1. Find "Psychologist Sessions" in left sidebar
2. Click "⋮" (three dots)
3. Click "Settings and sharing"
4. Scroll to "Share with specific people"
5. Click "+ Add people"
6. Paste Service Account email
7. Permissions: **Make changes to events**
8. Click "Send"

### 5.3 Get Calendar ID
1. Still in Settings
2. Scroll to "Integrate calendar"
3. Find "Calendar ID"
4. Copy the ID (looks like: `xxxxx@group.calendar.google.com`)
5. **Save this Calendar ID** - you'll need it for .env.local

---

## STEP 6: Update .env.local (5 min)

### 6.1 Open .env.local File
```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"
nano .env.local
# or use any text editor
```

### 6.2 Add Google Credentials

**Add these lines:**
```bash
# Google Sheets
GOOGLE_SHEETS_ID="YOUR_SHEET_ID_FROM_STEP_4.7"

# Google Calendar
GOOGLE_CALENDAR_ID="YOUR_CALENDAR_ID_FROM_STEP_5.3"

# Google Service Account JSON (paste entire contents as single line)
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...PASTE_FULL_JSON_HERE..."}'
```

**IMPORTANT:** For `GOOGLE_SERVICE_ACCOUNT_JSON`:
1. Open the JSON file from Step 3.4
2. Copy **entire contents**
3. Remove all newlines (make it one line)
4. Paste between single quotes

### 6.3 Change Mock Mode
```bash
# Change this line:
USE_MOCK_DATA="false"
```

### 6.4 Generate NextAuth Secret
```bash
# In terminal, run:
openssl rand -base64 32

# Copy output and replace in .env.local:
NEXTAUTH_SECRET="output_from_command_above"
```

### 6.5 Save File
- Press `Ctrl+O` (if using nano)
- Press `Enter`
- Press `Ctrl+X`

---

## STEP 7: Test Locally (5 min)

### 7.1 Install Dependencies
```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"
npm install
```

### 7.2 Start Dev Server
```bash
npm run dev
```

### 7.3 Test Application
1. Open: http://localhost:3000
2. Fill out form
3. Submit
4. **Expected result:**
   - ✅ Application saved to Google Sheets → Applications tab
   - ✅ Providers loaded from Google Sheets → Providers tab
   - ✅ Results displayed (Top-10)

### 7.4 Verify in Google Sheets
1. Open your Google Sheet
2. Go to "Applications" tab
3. Should see new row with application data

### 7.5 Check Asana
1. Go to Asana task
2. Should see new comment with application details

---

## STEP 8: Report Back to AI-1

### 8.1 Post Asana Comment

```
🟢 AI-2 | [DATE TIME] | Google Infrastructure Complete

✅ ЗАВЕРШЕНО ВСІ КРОКИ

📋 ЩО СТВОРЕНО:

1. Google Cloud Project: ✅
   - Project ID: psychologist-matching-platform-xxxxx

2. APIs Enabled: ✅
   - Google Sheets API
   - Google Calendar API

3. Service Account: ✅
   - Email: psychologist-platform-service@...
   - JSON key: saved

4. Google Sheet: ✅
   - Sheet ID: [YOUR_SHEET_ID]
   - Tabs: Providers, Applications, Config
   - Test data: added

5. Google Calendar: ✅
   - Calendar ID: [YOUR_CALENDAR_ID]
   - Shared with SA: yes

6. Environment Variables: ✅
   - .env.local updated
   - USE_MOCK_DATA="false"
   - All credentials added

🧪 ЛОКАЛЬНЕ ТЕСТУВАННЯ:

✅ npm install - successful
✅ npm run dev - server started
✅ Form submission - works
✅ Data saved to Sheets - confirmed
✅ Asana logging - works

📊 ВЕРИФІКАЦІЯ:

- Google Sheets Applications tab: [screenshot or row count]
- Asana comment: created
- No errors in console

🔄 ГОТОВИЙ ДО НАСТУПНОГО КРОКУ

Очікую від AI-1:
1. Реалізацію real Sheets Client
2. Calendar integration
3. Code review

⏰ Час завершення: [TIME]
```

---

## 📊 Checklist

Before reporting back, verify:

- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Google Calendar API enabled
- [ ] Service Account created
- [ ] JSON key downloaded and saved
- [ ] Service Account email copied
- [ ] Google Sheet created with 3 tabs
- [ ] Column headers added to all tabs
- [ ] Test data added (at least 1-2 providers)
- [ ] Sheet shared with Service Account
- [ ] Sheet ID copied
- [ ] Google Calendar created
- [ ] Calendar shared with Service Account
- [ ] Calendar ID copied
- [ ] .env.local updated with all credentials
- [ ] USE_MOCK_DATA set to "false"
- [ ] NEXTAUTH_SECRET generated
- [ ] npm install successful
- [ ] npm run dev successful
- [ ] Local test submission successful
- [ ] Data appears in Google Sheets
- [ ] Asana comment created
- [ ] Comment posted to Asana task

---

## 🚨 Troubleshooting

### Error: "Permission denied" when accessing Sheet
**Solution:** Make sure you shared Sheet with Service Account email with "Editor" permissions

### Error: "Calendar not found"
**Solution:** Make sure Calendar ID is correct and Calendar is shared with Service Account

### Error: "Invalid credentials"
**Solution:**
1. Check GOOGLE_SERVICE_ACCOUNT_JSON is valid JSON
2. Make sure it's all on one line
3. Make sure it's wrapped in single quotes

### Error: "Cannot find module 'googleapis'"
**Solution:** Run `npm install` again

### Error: "USE_MOCK_DATA is not defined"
**Solution:** Make sure .env.local file is in root directory of project

---

## 📞 Need Help?

If you encounter any issues:
1. Post detailed error message in Asana comments
2. Include screenshot if possible
3. Tag AI-1 for assistance
4. Include which step you're stuck on

---

**Good luck! 🚀**
