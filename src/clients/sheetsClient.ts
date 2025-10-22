/**
 * Google Sheets Client
 * Mock implementation for local development
 * Will be replaced with real Google Sheets API when credentials are available
 */

import { Provider, Config, Application } from '@/models/types';
import { mockProviders, mockConfig } from '@/data/mockProviders';

const USE_MOCK = process.env.USE_MOCK_DATA === 'true';

/**
 * Get all providers from Google Sheet
 */
export async function getProviders(): Promise<Provider[]> {
  if (USE_MOCK) {
    console.log('📦 Using mock provider data');
    return mockProviders;
  }

  // Real implementation will be added when Google Service Account is ready
  // const sheets = google.sheets({ version: 'v4', auth });
  // const response = await sheets.spreadsheets.values.get({
  //   spreadsheetId: process.env.GOOGLE_SHEETS_ID,
  //   range: 'Providers!A2:Z',
  // });
  // return parseProvidersFromRows(response.data.values);

  throw new Error('Real Google Sheets integration not yet implemented');
}

/**
 * Get configuration from Google Sheet
 */
export async function getConfig(): Promise<Config> {
  if (USE_MOCK) {
    console.log('📦 Using mock config data');
    return mockConfig;
  }

  // Real implementation
  throw new Error('Real Google Sheets integration not yet implemented');
}

/**
 * Save application to Google Sheet
 */
export async function saveApplication(
  application: Application
): Promise<void> {
  if (USE_MOCK) {
    console.log('📦 Mock: Saving application to Sheet', application.id);
    // In mock mode, just log it
    console.log(JSON.stringify(application, null, 2));
    return;
  }

  // Real implementation will append row to Applications sheet
  // const sheets = google.sheets({ version: 'v4', auth });
  // await sheets.spreadsheets.values.append({
  //   spreadsheetId: process.env.GOOGLE_SHEETS_ID,
  //   range: 'Applications!A:Z',
  //   valueInputOption: 'USER_ENTERED',
  //   requestBody: {
  //     values: [applicationToRow(application)],
  //   },
  // });

  throw new Error('Real Google Sheets integration not yet implemented');
}

/**
 * Update application status
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: Application['status']
): Promise<void> {
  if (USE_MOCK) {
    console.log(`📦 Mock: Updating application ${applicationId} to ${status}`);
    return;
  }

  // Real implementation will find row and update status column
  throw new Error('Real Google Sheets integration not yet implemented');
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
  if (USE_MOCK) {
    console.log('📦 Mock: Saving match to Sheet', match);
    return;
  }

  // Real implementation
  throw new Error('Real Google Sheets integration not yet implemented');
}

/**
 * Get all applications
 */
export async function getApplications(): Promise<Application[]> {
  if (USE_MOCK) {
    console.log('📦 Mock: No applications in mock mode');
    return [];
  }

  // Real implementation
  throw new Error('Real Google Sheets integration not yet implemented');
}

/**
 * Helper: Parse provider from Sheet row
 * Will be implemented when real Google Sheets is connected
 */
function parseProvidersFromRows(rows: any[][]): Provider[] {
  // Map Sheet columns to Provider object
  // Column mapping:
  // A: ID, B: Name, C: Languages, D: Approaches, E: Specializations, etc.
  return rows.map((row) => ({
    id: row[0],
    name: row[1],
    languages: row[2]?.split(',').map((s: string) => s.trim()) || [],
    approaches: row[3]?.split(',').map((s: string) => s.trim()) || [],
    specializations: row[4]?.split(',').map((s: string) => s.trim()) || [],
    ageGroups: row[5]?.split(',').map((s: string) => s.trim()) || [],
    price: {
      amount: parseFloat(row[6]) || 0,
      currency: row[7] || 'UAH',
    },
    rating: parseFloat(row[8]) || 0,
    reviewsCount: parseInt(row[9]) || 0,
    verified: row[10] === 'TRUE',
    certifications: row[11]?.split(',').map((s: string) => s.trim()) || [],
    associations: row[12]?.split(',').map((s: string) => s.trim()) || [],
    contacts: {
      email: row[13] || '',
      phone: row[14] || '',
      telegram: row[15] || undefined,
      whatsapp: row[16] || undefined,
    },
    availability: parseAvailability(row[17]),
    format: row[18] as 'online' | 'offline' | 'both',
    location: row[19] || undefined,
    experience: parseInt(row[20]) || 0,
    education: row[21] || '',
    bio: row[22] || '',
  }));
}

/**
 * Helper: Parse availability from string
 */
function parseAvailability(availStr: string): any[] {
  if (!availStr) return [];
  // Format: "Monday 14:00-18:00, Wednesday 14:00-20:00"
  return availStr.split(',').map((slot) => {
    const [day, time] = slot.trim().split(' ');
    const [timeStart, timeEnd] = time.split('-');
    return { day, timeStart, timeEnd };
  });
}

/**
 * Helper: Convert application to Sheet row
 */
function applicationToRow(app: Application): any[] {
  return [
    app.id,
    app.parentId,
    app.childId,
    app.budget.min,
    app.budget.max,
    app.budget.currency,
    JSON.stringify(app.availableSlots),
    app.urgency,
    app.notes,
    app.createdAt.toISOString(),
    app.status,
  ];
}
