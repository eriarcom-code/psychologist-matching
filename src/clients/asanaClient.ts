/**
 * Asana Client - Log activities to task comments
 * Currently disabled - asana package has compatibility issues
 */

const ASANA_ENABLED = false; // Temporarily disabled due to package compatibility issues

let client: any = null;
const TASK_ID = process.env.ASANA_TASK_ID || '';
const WORKSPACE_GID = process.env.ASANA_WORKSPACE_GID || '';

// Initialize client only if enabled
if (ASANA_ENABLED) {
  try {
    // @ts-ignore - asana package doesn't have TypeScript definitions
    const asana = require('asana');
    client = asana.Client.create({
      defaultHeaders: { 'asana-enable': 'new_user_task_lists' },
    }).useAccessToken(process.env.ASANA_PAT!);
  } catch (error) {
    console.warn('⚠️ Asana client initialization failed:', error);
  }
}

/**
 * Post comment to Asana task
 */
export async function postComment(text: string): Promise<void> {
  if (!ASANA_ENABLED || !client) {
    console.log('ℹ️ Asana disabled - would have posted:', text.substring(0, 100) + '...');
    return;
  }
  try {
    await client.tasks.addComment(TASK_ID, {
      text,
    });
    console.log('✅ Posted to Asana:', text.substring(0, 100) + '...');
  } catch (error) {
    console.error('❌ Failed to post to Asana:', error);
    // Don't throw - logging should not break the main flow
  }
}

/**
 * Log new application to Asana
 */
export async function logNewApplication(data: {
  parentName: string;
  childAge: number;
  issues: string;
  budget: string;
  topProvidersCount: number;
}): Promise<void> {
  const comment = `
🆕 НОВАЯ ЗАЯВКА

👤 Родитель: ${data.parentName}
👶 Ребенок: ${data.childAge} лет
📋 Проблемы: ${data.issues}
💰 Бюджет: ${data.budget}

🎯 Подобрано специалистов: ${data.topProvidersCount}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}
  `.trim();

  await postComment(comment);
}

/**
 * Log scoring results to Asana
 */
export async function logScoringResults(
  results: Array<{ providerName: string; totalScore: number; reasons: string[] }>
): Promise<void> {
  let comment = '🎯 РЕЗУЛЬТАТЫ СКОРИНГА\n\n';

  results.forEach((result, index) => {
    comment += `${index + 1}. ${result.providerName} (${result.totalScore.toFixed(2)})\n`;
    result.reasons.forEach((reason) => {
      comment += `   • ${reason}\n`;
    });
    comment += '\n';
  });

  comment += `\n⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}`;

  await postComment(comment);
}

/**
 * Log email sent to provider
 */
export async function logEmailSent(data: {
  providerName: string;
  providerEmail: string;
  subject: string;
}): Promise<void> {
  const comment = `
📧 EMAIL ОТПРАВЛЕН

Кому: ${data.providerName} (${data.providerEmail})
Тема: ${data.subject}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}
  `.trim();

  await postComment(comment);
}

/**
 * Log session booked
 */
export async function logSessionBooked(data: {
  providerName: string;
  dateTime: string;
  calendarEventId: string;
}): Promise<void> {
  const comment = `
✅ СЕССИЯ ЗАБРОНИРОВАНА

Специалист: ${data.providerName}
Дата и время: ${data.dateTime}
Calendar Event ID: ${data.calendarEventId}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}
  `.trim();

  await postComment(comment);
}

/**
 * Log error or issue
 */
export async function logError(error: {
  message: string;
  context: string;
  stack?: string;
}): Promise<void> {
  const comment = `
❌ ОШИБКА

Контекст: ${error.context}
Сообщение: ${error.message}

${error.stack ? `Stack trace:\n${error.stack}` : ''}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}
  `.trim();

  await postComment(comment);
}

/**
 * Update custom field on task
 */
export async function updateCustomField(
  fieldGid: string,
  value: string | number
): Promise<void> {
  if (!ASANA_ENABLED || !client) {
    console.log(`ℹ️ Asana disabled - would have updated field ${fieldGid} to ${value}`);
    return;
  }
  try {
    await client.tasks.update(TASK_ID, {
      custom_fields: {
        [fieldGid]: value,
      },
    });
    console.log(`✅ Updated custom field ${fieldGid} to ${value}`);
  } catch (error) {
    console.error('❌ Failed to update custom field:', error);
    // Don't throw - logging should not break the main flow
  }
}

/**
 * Get task details
 */
export async function getTask(): Promise<any> {
  if (!ASANA_ENABLED || !client) {
    console.log('ℹ️ Asana disabled - cannot get task');
    return null;
  }
  try {
    const task = await client.tasks.findById(TASK_ID);
    return task;
  } catch (error) {
    console.error('❌ Failed to get task:', error);
    return null;
  }
}
