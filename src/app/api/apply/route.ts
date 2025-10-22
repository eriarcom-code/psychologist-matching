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
    // await logScoringResults(scoringResults); // TODO: Fix type mismatch

    // Return results
    return NextResponse.json({
      success: true,
      applicationId,
      topProviders: scoringResults.map((result) => {
        return {
          score: result.score,
          breakdown: result.breakdown,
          provider: {
            name: result.provider.name,
            bio: result.provider.bio,
            price: result.provider.price,
            rating: result.provider.rating,
            verified: result.provider.verified,
            approaches: result.provider.approaches,
            specializations: result.provider.specializations,
            contacts: result.provider.contacts,
            availability: result.provider.availability,
          },
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
