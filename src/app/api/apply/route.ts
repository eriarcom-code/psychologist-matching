/**
 * API Route: /api/apply
 * Handle application form submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Application, Provider } from '@/models/types';
import { getProviders, getConfig, saveApplication } from '@/clients/sheetsClient';
import { scoreAndRank } from '@/lib/scoring';
import { logNewApplication, logScoringResults } from '@/clients/asanaClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.parentName || !body.parentEmail || !body.childAge || !body.issues) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create application object
    const applicationId = uuidv4();
    const parentId = uuidv4();
    const childId = uuidv4();

    const application: Application = {
      id: applicationId,
      parentId,
      childId,
      budget: {
        min: parseInt(body.budgetMin) || 500,
        max: parseInt(body.budgetMax) || 1000,
        currency: 'UAH',
      },
      availableSlots: body.availableDays?.map((day: string) => ({
        day,
        timeStart: '14:00',
        timeEnd: '20:00',
      })) || [],
      urgency: body.urgency || 'medium',
      notes: `${body.issues}\n\nДополнительно: ${body.notes || 'Нет'}`,
      createdAt: new Date(),
      status: 'pending',
    };

    // Get providers and config
    const providers = await getProviders();
    const config = await getConfig();

    // Score and rank providers
    const scoringResults = scoreAndRank(providers, application, config, 10);

    // Save application to Google Sheet
    await saveApplication(application);

    // Log to Asana
    await logNewApplication({
      parentName: body.parentName,
      childAge: parseInt(body.childAge),
      issues: body.issues,
      budget: `${body.budgetMin}-${body.budgetMax} UAH`,
      topProvidersCount: scoringResults.length,
    });

    // Log scoring results to Asana
    await logScoringResults(scoringResults);

    // Return results
    return NextResponse.json({
      success: true,
      applicationId,
      topProviders: scoringResults.map((result) => {
        // Find full provider data
        const provider = providers.find((p) => p.id === result.providerId);
        return {
          ...result,
          provider: provider ? {
            name: provider.name,
            bio: provider.bio,
            price: provider.price,
            rating: provider.rating,
            verified: provider.verified,
            approaches: provider.approaches,
            specializations: provider.specializations,
            contacts: provider.contacts,
            availability: provider.availability,
          } : null,
        };
      }),
    });
  } catch (error) {
    console.error('Error processing application:', error);

    return NextResponse.json(
      {
        error: 'Failed to process application',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
