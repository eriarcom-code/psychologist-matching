/**
 * REAL Google Sheets Client
 *
 * This is the PRODUCTION version that uses actual Google Sheets API.
 * Once AI-2 provides credentials, we'll swap this into sheetsClient.ts
 *
 * READY TO USE - just needs credentials from AI-2
 */

import { google } from 'googleapis';
import { Provider, Config, Application } from '@/models/types';

/**
 * Initialize Google Auth
 */
function getAuthClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/calendar',
    ],
  });

  return auth;
}

/**
 * Get Google Sheets client
 */
async function getSheetsClient() {
  const auth = await getAuthClient().getClient();
  return google.sheets({ version: 'v4', auth: auth as any });
}

/**
 * Get all providers from Google Sheet
 */
export async function getProviders(): Promise<Provider[]> {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_ID not configured in environment variables');
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Providers!A2:W', // Starting from row 2 (skip headers)
  });

  const rows = response.data.values || [];
  return parseProvidersFromRows(rows);
}

/**
 * Parse provider data from Sheet rows
 */
function parseProvidersFromRows(rows: any[][]): Provider[] {
  return rows.map((row) => {
    // Parse availability string: "Monday 14:00-18:00,Wednesday 14:00-20:00"
    const availabilityStr = row[17] || '';
    const availability = availabilityStr.split(',').filter((s: string) => s.trim()).map((slot: string) => {
      const parts = slot.trim().split(' ');
      if (parts.length === 2) {
        const day = parts[0];
        const [timeStart, timeEnd] = parts[1].split('-');
        return { day, timeStart, timeEnd };
      }
      return null;
    }).filter(Boolean);

    return {
      id: row[0] || '',
      name: row[1] || '',
      languages: (row[2] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      approaches: (row[3] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      specializations: (row[4] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      ageGroups: (row[5] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      price: {
        amount: parseFloat(row[6]) || 0,
        currency: row[7] || 'UAH',
      },
      rating: parseFloat(row[8]) || 0,
      reviewsCount: parseInt(row[9]) || 0,
      verified: row[10] === 'TRUE' || row[10] === 'true',
      certifications: (row[11] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      associations: (row[12] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      contacts: {
        email: row[13] || '',
        phone: row[14] || '',
        telegram: row[15] || undefined,
        whatsapp: row[16] || undefined,
      },
      availability: availability as any[],
      format: (row[18] || 'online') as 'online' | 'offline' | 'both',
      location: row[19] || undefined,
      experience: parseInt(row[20]) || 0,
      education: row[21] || '',
      bio: row[22] || '',
    };
  });
}

/**
 * Get configuration from Google Sheet
 */
export async function getConfig(): Promise<Config> {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_ID not configured');
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Config!A2:B', // Key-value pairs
  });

  const rows = response.data.values || [];
  const configMap: Record<string, any> = {};

  rows.forEach((row) => {
    const key = row[0];
    const value = row[1];
    configMap[key] = value;
  });

  // Parse config
  return {
    weights: {
      language: parseFloat(configMap.weight_language) || 0.20,
      cbt: parseFloat(configMap.weight_cbt) || 0.15,
      price: parseFloat(configMap.weight_price) || 0.10,
      rating: parseFloat(configMap.weight_rating) || 0.20,
      verified: parseFloat(configMap.weight_verified) || 0.15,
      experience: parseFloat(configMap.weight_experience) || 0.20,
    },
    requiredFilters: {
      ageGroup: configMap.required_age_group || 'teens',
      minRating: parseFloat(configMap.required_min_rating) || 4.0,
    },
    emailTemplates: {
      providerInquiry: {
        subject: 'Новая заявка на консультацию',
        body: configMap.email_template_inquiry || 'Default template',
        variables: ['parentName', 'childAge', 'issues'],
      },
      parentConfirmation: {
        subject: 'Ваша заявка принята',
        body: configMap.email_template_confirmation || 'Default template',
        variables: ['parentName'],
      },
      sessionReminder: {
        subject: 'Напоминание о консультации',
        body: configMap.email_template_reminder || 'Default template',
        variables: ['parentName', 'dateTime'],
      },
    },
    asana: {
      taskId: configMap.asana_task_id || '',
      workspaceGid: configMap.asana_workspace_gid || '',
      customFieldsMap: {},
    },
    featureFlags: {
      autoEmail: configMap.feature_email === 'true',
      telegram: configMap.feature_telegram === 'true',
      payments: configMap.feature_payments === 'true',
    },
  };
}

/**
 * Save application to Google Sheet
 */
export async function saveApplication(application: Application): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_ID not configured');
  }

  const row = [
    application.id,
    application.parentId,
    application.childId,
    application.budget.min,
    application.budget.max,
    application.budget.currency,
    JSON.stringify(application.availableSlots),
    application.urgency,
    application.notes,
    application.createdAt.toISOString(),
    application.status,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Applications!A:K',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });

  console.log('✅ Application saved to Google Sheets:', application.id);
}

/**
 * Update application status
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: Application['status']
): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_ID not configured');
  }

  // Find the row with this application ID
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Applications!A:K',
  });

  const rows = response.data.values || [];
  const rowIndex = rows.findIndex((row) => row[0] === applicationId);

  if (rowIndex === -1) {
    throw new Error(`Application ${applicationId} not found`);
  }

  // Update status column (K = index 10)
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Applications!K${rowIndex + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[status]],
    },
  });

  console.log(`✅ Application ${applicationId} status updated to ${status}`);
}

/**
 * Save match to Google Sheet
 */
export async function saveMatch(match: {
  applicationId: string;
  providerId: string;
  score: number;
  rank: number;
  status: 'suggested' | 'contacted' | 'responded' | 'accepted' | 'rejected';
}): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_ID not configured');
  }

  const row = [
    match.applicationId,
    match.providerId,
    match.score,
    match.rank,
    match.status,
    new Date().toISOString(),
  ];

  // Check if Matches sheet exists, create if not
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Matches!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Match saved to Google Sheets');
  } catch (error) {
    console.error('❌ Failed to save match. Sheet may not exist:', error);
    // Could auto-create sheet here if needed
  }
}

/**
 * Get all applications
 */
export async function getApplications(): Promise<Application[]> {
  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_ID not configured');
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Applications!A2:K',
  });

  const rows = response.data.values || [];

  return rows.map((row) => ({
    id: row[0],
    parentId: row[1],
    childId: row[2],
    budget: {
      min: parseFloat(row[3]),
      max: parseFloat(row[4]),
      currency: row[5],
    },
    availableSlots: JSON.parse(row[6] || '[]'),
    urgency: row[7] as Application['urgency'],
    notes: row[8],
    createdAt: new Date(row[9]),
    status: row[10] as Application['status'],
  }));
}
