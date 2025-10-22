/**
 * Scoring Algorithm - Core Business Logic
 * Calculates weighted scores for provider matching
 */

import { Provider, Application, Config, ScoringResult } from '@/models/types';

/**
 * Calculate match score for a provider based on application requirements
 * Returns score breakdown for transparency
 */
export function calculateScore(
  provider: Provider,
  application: Application,
  config: Config
): ScoringResult {
  const scores: Record<string, number> = {};
  let totalScore = 0;

  // 1. Language Match (20% weight)
  const languageScore = calculateLanguageScore(
    provider.languages,
    application.childId // assumes child has preferred language
  );
  scores.language = languageScore * config.weights.language;
  totalScore += scores.language;

  // 2. CBT Approach (15% weight)
  const cbtScore = provider.approaches.includes('CBT') ? 1.0 : 0.5;
  scores.cbt = cbtScore * config.weights.cbt;
  totalScore += scores.cbt;

  // 3. Price Fit (10% weight)
  const priceScore = calculatePriceScore(
    provider.price.amount,
    application.budget
  );
  scores.price = priceScore * config.weights.price;
  totalScore += scores.price;

  // 4. Rating (20% weight)
  const ratingScore = provider.rating / 5.0; // normalize 0-5 to 0-1
  scores.rating = ratingScore * config.weights.rating;
  totalScore += scores.rating;

  // 5. Verified Status (15% weight)
  const verifiedScore = provider.verified ? 1.0 : 0.3;
  scores.verified = verifiedScore * config.weights.verified;
  totalScore += scores.verified;

  // 6. Experience (20% weight)
  const experienceScore = calculateExperienceScore(provider.experience);
  scores.experience = experienceScore * config.weights.experience;
  totalScore += scores.experience;

  // Additional bonus for specializations match
  const specializationBonus = calculateSpecializationBonus(
    provider.specializations,
    application.notes // assumes notes contain problem keywords
  );
  totalScore += specializationBonus;
  scores.specialization = specializationBonus;

  return {
    provider: provider,
    score: Math.round(totalScore * 100) / 100,
    breakdown: {
      language: scores.language || 0,
      approach: scores.cbt || 0,
      price: scores.price || 0,
      rating: scores.rating || 0,
      verified: scores.verified || 0,
      experience: scores.experience || 0,
    },
  };
}

/**
 * Score providers and return Top-N matches
 */
export function scoreAndRank(
  providers: Provider[],
  application: Application,
  config: Config,
  topN: number = 10
): ScoringResult[] {
  // Apply required filters first
  const filtered = providers.filter((provider) => {
    // Must work with teens
    if (!provider.ageGroups.includes(config.requiredFilters.ageGroup)) {
      return false;
    }
    // Must meet minimum rating
    if (provider.rating < config.requiredFilters.minRating) {
      return false;
    }
    return true;
  });

  // Calculate scores for all filtered providers
  const scored = filtered.map((provider) =>
    calculateScore(provider, application, config)
  );

  // Sort by total score descending
  scored.sort((a, b) => b.score - a.score);

  // Return top N
  return scored.slice(0, topN);
}

/**
 * Calculate language match score (0-1)
 * Prioritizes exact match, gives partial credit for common languages
 */
function calculateLanguageScore(
  providerLanguages: string[],
  childPreferredLanguage: string
): number {
  // For MVP, assume Russian/Ukrainian preference
  // TODO: get from child profile
  const preferred = ['ru', 'ua'];

  const hasRussian = providerLanguages.includes('ru');
  const hasUkrainian = providerLanguages.includes('ua');
  const hasEnglish = providerLanguages.includes('en');

  if (hasRussian && hasUkrainian) return 1.0;
  if (hasRussian || hasUkrainian) return 0.9;
  if (hasEnglish) return 0.7;
  return 0.3;
}

/**
 * Calculate price fit score (0-1)
 * Returns 1.0 if within budget, decreasing as price exceeds budget
 */
function calculatePriceScore(
  providerPrice: number,
  budget: { min: number; max: number; currency: string }
): number {
  if (providerPrice <= budget.max) {
    return 1.0;
  }

  // Price exceeds budget - decrease score proportionally
  const overage = providerPrice - budget.max;
  const overagePercent = overage / budget.max;

  if (overagePercent < 0.2) return 0.8; // 20% over
  if (overagePercent < 0.5) return 0.5; // 50% over
  return 0.2; // More than 50% over
}

/**
 * Calculate experience score (0-1)
 * Sweet spot is 8-15 years
 */
function calculateExperienceScore(years: number): number {
  if (years >= 8 && years <= 15) return 1.0; // Sweet spot
  if (years >= 5 && years < 8) return 0.8; // Good
  if (years > 15) return 0.9; // Very experienced (slight penalty for potential rigidity)
  if (years >= 3) return 0.6; // Junior
  return 0.4; // Very junior
}

/**
 * Calculate bonus for specialization match
 * Looks for keywords in application notes
 */
function calculateSpecializationBonus(
  specializations: string[],
  notes: string
): number {
  const notesLower = notes.toLowerCase();
  let bonus = 0;

  const keywords: Record<string, string[]> = {
    anxiety: ['тревога', 'тревожность', 'anxiety', 'паника'],
    depression: ['депрессия', 'depression', 'апатия', 'грусть'],
    gaming_addiction: ['игры', 'игровая', 'gaming', 'компьютер', 'зависимость'],
    ADHD: ['сдвг', 'adhd', 'внимание', 'гиперактивность'],
    trauma: ['травма', 'trauma', 'птср', 'ptsd'],
    motivation: ['мотивация', 'motivation', 'лень', 'прокрастинация'],
    OCD: ['окр', 'ocd', 'навязчивости'],
  };

  for (const spec of specializations) {
    const kws = keywords[spec];
    if (kws && kws.some((kw) => notesLower.includes(kw))) {
      bonus += 0.05; // 5% bonus per matched specialization
    }
  }

  return Math.min(bonus, 0.15); // Cap at 15% bonus
}

/**
 * Generate human-readable reasons for match
 */
function generateMatchReasons(
  provider: Provider,
  scores: Record<string, number>
): string[] {
  const reasons: string[] = [];

  // Language
  if (scores.language >= 0.18) {
    reasons.push(`Владеет русским и украинским`);
  }

  // CBT
  if (scores.cbt >= 0.14) {
    reasons.push(`Специализация на КПТ (CBT)`);
  }

  // Rating
  if (scores.rating >= 0.18) {
    reasons.push(`Высокий рейтинг (${provider.rating}/5.0)`);
  }

  // Verified
  if (provider.verified) {
    reasons.push(`Верифицированный специалист`);
  }

  // Experience
  if (scores.experience >= 0.18) {
    reasons.push(`${provider.experience} лет опыта`);
  }

  // Associations
  if (provider.associations.length > 0) {
    reasons.push(`Член ассоциаций: ${provider.associations.join(', ')}`);
  }

  // Price
  if (scores.price === 0.1) {
    reasons.push(`В рамках бюджета (${provider.price.amount} ${provider.price.currency})`);
  }

  // Specializations
  if (scores.specialization && scores.specialization > 0) {
    const matched = provider.specializations.filter((s) =>
      ['anxiety', 'depression', 'gaming_addiction', 'motivation', 'teens'].includes(s)
    );
    if (matched.length > 0) {
      reasons.push(`Специализации: ${matched.join(', ')}`);
    }
  }

  return reasons;
}

/**
 * Format scoring results for display
 */
export function formatScoringResults(results: ScoringResult[]): string {
  let output = `🎯 ТОП-${results.length} ПСИХОЛОГОВ\n\n`;

  results.forEach((result, index) => {
    output += `${index + 1}. ${result.provider.name}\n`;
    output += `   Общий балл: ${result.score.toFixed(2)}\n`;
    output += `   Рейтинг: ${result.provider.rating}/5.0\n`;
    output += `   Опыт: ${result.provider.experience} лет\n`;
    output += `   Цена: ${result.provider.price.amount} ${result.provider.price.currency}\n`;
    output += '\n';
  });

  return output;
}
