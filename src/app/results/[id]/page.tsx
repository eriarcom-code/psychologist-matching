'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProviderResult {
  providerId: string;
  providerName: string;
  totalScore: number;
  breakdown: Record<string, number>;
  reasons: string[];
  provider: {
    name: string;
    bio: string;
    price: { amount: number; currency: string };
    rating: number;
    verified: boolean;
    approaches: string[];
    specializations: string[];
    contacts: {
      email: string;
      phone: string;
      telegram?: string;
      whatsapp?: string;
    };
    availability: Array<{
      day: string;
      timeStart: string;
      timeEnd: string;
    }>;
  } | null;
}

export default function ResultsPage() {
  const params = useParams();
  const applicationId = params.id as string;

  const [results, setResults] = useState<ProviderResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In real app, fetch results from API
    // For now, retrieve from sessionStorage (set during form submission)
    const storedResults = sessionStorage.getItem(`results_${applicationId}`);
    if (storedResults) {
      setResults(JSON.parse(storedResults));
      setLoading(false);
    } else {
      setError('Результаты не найдены. Пожалуйста, заполните анкету снова.');
      setLoading(false);
    }
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Подбираем психологов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <a
            href="/apply"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Вернуться к анкете
          </a>
        </div>
      </div>
    );
  }

  const dayLabels: Record<string, string> = {
    Monday: 'Понедельник',
    Tuesday: 'Вторник',
    Wednesday: 'Среда',
    Thursday: 'Четверг',
    Friday: 'Пятница',
    Saturday: 'Суббота',
    Sunday: 'Воскресенье',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Подобрано {results.length} психологов
          </h1>
          <p className="text-gray-600">
            Специалисты отсортированы по степени соответствия вашим требованиям
          </p>
        </div>

        <div className="space-y-6">
          {results.map((result, index) => {
            const provider = result.provider;
            if (!provider) return null;

            return (
              <div
                key={result.providerId}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {index + 1}
                      </span>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {provider.name}
                      </h2>
                      {provider.verified && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          ✓ Верифицирован
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{provider.rating.toFixed(1)}</span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {provider.price.amount} {provider.price.currency} / сессия
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {result.totalScore.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">совпадение</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{provider.bio}</p>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Почему подходит:
                  </h3>
                  <ul className="space-y-1">
                    {result.reasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Подходы:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.approaches.map((approach) => (
                        <span
                          key={approach}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {approach}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Специализации:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.specializations.slice(0, 4).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Доступность:
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {provider.availability.map((slot, idx) => (
                      <div key={idx}>
                        {dayLabels[slot.day]}: {slot.timeStart} - {slot.timeEnd}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Контакты:
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href={`mailto:${provider.contacts.email}`}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      📧 {provider.contacts.email}
                    </a>
                    <a
                      href={`tel:${provider.contacts.phone}`}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      📱 {provider.contacts.phone}
                    </a>
                    {provider.contacts.telegram && (
                      <a
                        href={`https://t.me/${provider.contacts.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        ✈️ {provider.contacts.telegram}
                      </a>
                    )}
                    {provider.contacts.whatsapp && (
                      <a
                        href={`https://wa.me/${provider.contacts.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        💬 WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      // TODO: Implement booking/contact logic
                      alert(`Связаться с ${provider.name}`);
                    }}
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
                  >
                    Связаться
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/apply"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← Заполнить анкету заново
          </a>
        </div>
      </div>
    </div>
  );
}
