'use client';

import { useState } from 'react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export function CrisisModal({ isOpen, onClose, onContinue }: CrisisModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            ЭТО ЭКСТРЕННАЯ СИТУАЦИЯ
          </h2>
          <p className="text-lg text-gray-700">
            Если вашему ребенку нужна немедленная помощь, пожалуйста, позвоните сейчас:
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <a
            href="tel:7333"
            className="block p-4 bg-red-50 border-2 border-red-500 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xl text-red-700">7333</div>
                <div className="text-sm text-gray-700">Детская линия доверия</div>
              </div>
              <div className="text-sm text-gray-600">24/7</div>
            </div>
          </a>

          <a
            href="tel:116123"
            className="block p-4 bg-red-50 border-2 border-red-500 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xl text-red-700">116 123</div>
                <div className="text-sm text-gray-700">Линия эмоциональной поддержки</div>
              </div>
              <div className="text-sm text-gray-600">24/7</div>
            </div>
          </a>

          <a
            href="tel:103"
            className="block p-4 bg-red-50 border-2 border-red-500 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xl text-red-700">103</div>
                <div className="text-sm text-gray-700">Скорая медицинская помощь</div>
              </div>
              <div className="text-sm text-gray-600">24/7</div>
            </div>
          </a>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>Важно:</strong> Наш сервис подбора психологов НЕ является экстренной службой.
            Для немедленной помощи используйте горячие линии выше.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onContinue}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Я связался со специалистами, продолжить подбор психолога
          </button>
        </div>
      </div>
    </div>
  );
}

// Crisis keywords detection utility
export function detectCrisisKeywords(text: string): boolean {
  const crisisKeywords = [
    // Суицидальные мысли
    'суицид', 'самоубийство', 'убить себя', 'покончить с собой', 'не хочу жить',
    'хочу умереть', 'смерть', 'покончу с жизнью', 'свести счеты с жизнью',

    // Самоповреждение
    'порезы', 'резать себя', 'режу', 'селфхарм', 'self harm', 'самоповреждение',
    'бьет себя', 'наносит раны',

    // Насилие
    'бьют', 'избивает', 'насилие', 'изнасилование', 'домогательство',
    'издеваются', 'истязание',

    // Критические состояния
    'передозировка', 'наркотики', 'алкоголь в больших', 'отравление',
    'не ест', 'голодает', 'анорексия', 'булимия',

    // Угрозы
    'убью', 'взорву', 'нападу', 'причиню вред', 'месть',
  ];

  const lowerText = text.toLowerCase();
  return crisisKeywords.some(keyword => lowerText.includes(keyword));
}
