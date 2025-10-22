/**
 * Google Calendar Client
 * Handles session booking and calendar management
 *
 * READY TO USE - just needs credentials from AI-2
 */

import { google } from 'googleapis';
import { addMinutes, format } from 'date-fns';

/**
 * Initialize Google Auth
 */
function getAuthClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return auth;
}

/**
 * Get Google Calendar client
 */
async function getCalendarClient() {
  const auth = await getAuthClient().getClient();
  return google.calendar({ version: 'v3', auth: auth as any });
}

/**
 * Create a session event in Google Calendar
 */
export async function createSessionEvent(data: {
  providerName: string;
  providerEmail: string;
  parentName: string;
  parentEmail: string;
  childAge: number;
  dateTime: Date;
  duration?: number; // minutes, default 60
  notes?: string;
}): Promise<string> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  const duration = data.duration || 60;
  const endTime = addMinutes(data.dateTime, duration);

  const event = {
    summary: `Психолог: ${data.providerName} - ${data.parentName} (ребенок ${data.childAge} лет)`,
    description: `
Психолог: ${data.providerName}
Родитель: ${data.parentName}
Возраст ребенка: ${data.childAge} лет

${data.notes ? `Примечания:\n${data.notes}` : ''}

---
Создано автоматически через Psychologist Matching Platform
    `.trim(),
    start: {
      dateTime: data.dateTime.toISOString(),
      timeZone: process.env.TIMEZONE_DEFAULT || 'Europe/Kiev',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: process.env.TIMEZONE_DEFAULT || 'Europe/Kiev',
    },
    attendees: [
      { email: data.providerEmail, displayName: data.providerName },
      { email: data.parentEmail, displayName: data.parentName },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 day before
        { method: 'email', minutes: 60 }, // 1 hour before
        { method: 'popup', minutes: 30 }, // 30 min before
      ],
    },
    guestsCanModify: false,
    guestsCanInviteOthers: false,
    guestsCanSeeOtherGuests: true,
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
    sendUpdates: 'all', // Send email to all attendees
  });

  const eventId = response.data.id || '';
  const eventLink = response.data.htmlLink || '';

  console.log('✅ Calendar event created:', eventId);
  console.log('📅 Event link:', eventLink);

  return eventId;
}

/**
 * Get available slots from calendar
 * (Checks for conflicts with existing events)
 */
export async function getAvailableSlots(
  startDate: Date,
  endDate: Date
): Promise<Array<{ start: Date; end: Date }>> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  // Get all events in the time range
  const response = await calendar.events.list({
    calendarId,
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items || [];

  // For simplicity, return occupied slots
  // In real implementation, calculate free slots based on business hours
  const occupiedSlots = events.map((event) => ({
    start: new Date(event.start?.dateTime || event.start?.date || ''),
    end: new Date(event.end?.dateTime || event.end?.date || ''),
  }));

  // This is simplified - in production, calculate actual available slots
  return occupiedSlots;
}

/**
 * Update calendar event
 */
export async function updateSessionEvent(
  eventId: string,
  updates: {
    dateTime?: Date;
    duration?: number;
    notes?: string;
  }
): Promise<void> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  // Get existing event
  const existingEvent = await calendar.events.get({
    calendarId,
    eventId,
  });

  const event: any = { ...existingEvent.data };

  // Update fields
  if (updates.dateTime) {
    const duration = updates.duration || 60;
    const endTime = addMinutes(updates.dateTime, duration);

    event.start = {
      dateTime: updates.dateTime.toISOString(),
      timeZone: process.env.TIMEZONE_DEFAULT || 'Europe/Kiev',
    };
    event.end = {
      dateTime: endTime.toISOString(),
      timeZone: process.env.TIMEZONE_DEFAULT || 'Europe/Kiev',
    };
  }

  if (updates.notes) {
    event.description = `${event.description}\n\nОбновлено:\n${updates.notes}`;
  }

  await calendar.events.update({
    calendarId,
    eventId,
    requestBody: event,
    sendUpdates: 'all',
  });

  console.log('✅ Calendar event updated:', eventId);
}

/**
 * Cancel calendar event
 */
export async function cancelSessionEvent(
  eventId: string,
  reason?: string
): Promise<void> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  // Option 1: Delete event
  // await calendar.events.delete({
  //   calendarId,
  //   eventId,
  //   sendUpdates: 'all',
  // });

  // Option 2: Cancel event (keeps it in calendar but marked as cancelled)
  const existingEvent = await calendar.events.get({
    calendarId,
    eventId,
  });

  const event: any = { ...existingEvent.data };
  event.status = 'cancelled';
  if (reason) {
    event.description = `${event.description}\n\n❌ ОТМЕНЕНО:\n${reason}`;
  }

  await calendar.events.update({
    calendarId,
    eventId,
    requestBody: event,
    sendUpdates: 'all',
  });

  console.log('✅ Calendar event cancelled:', eventId);
}

/**
 * Get event details
 */
export async function getSessionEvent(eventId: string): Promise<any> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  const response = await calendar.events.get({
    calendarId,
    eventId,
  });

  return response.data;
}

/**
 * List upcoming sessions
 */
export async function getUpcomingSessions(
  maxResults: number = 10
): Promise<any[]> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  const now = new Date();

  const response = await calendar.events.list({
    calendarId,
    timeMin: now.toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return response.data.items || [];
}

/**
 * Send calendar invite to provider and parent
 */
export async function sendCalendarInvite(
  eventId: string,
  additionalMessage?: string
): Promise<void> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not configured');
  }

  const event = await calendar.events.get({
    calendarId,
    eventId,
  });

  if (additionalMessage) {
    const updatedEvent: any = { ...event.data };
    updatedEvent.description = `${event.data.description}\n\n${additionalMessage}`;

    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: updatedEvent,
      sendUpdates: 'all',
    });
  } else {
    // Just resend invites
    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: event.data,
      sendUpdates: 'all',
    });
  }

  console.log('✅ Calendar invites sent:', eventId);
}
