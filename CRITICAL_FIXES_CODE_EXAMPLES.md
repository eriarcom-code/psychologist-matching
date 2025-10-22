# 🔧 CRITICAL FIXES - READY-TO-USE CODE

Copy-paste these fixes into your codebase TODAY.

---

## 1. 🚨 Crisis Detection Modal

**File:** `src/components/CrisisModal.tsx`

```tsx
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
```

---

## 2. 🔍 Crisis Detection Logic

**File:** `src/lib/crisisDetection.ts`

```typescript
const CRISIS_KEYWORDS = {
  suicide: [
    'суицид', 'suicide', 'самоубийство', 'убить себя',
    'покончить с собой', 'не хочет жить', 'хочет умереть',
    'жить не хочет', 'смысла жить нет', 'лучше умереть',
    'kill myself', 'want to die', 'end my life'
  ],
  selfHarm: [
    'порезы', 'cutting', 'самоповреждение', 'self harm',
    'режет себя', 'бьет себя', 'вырывает волосы',
    'царапает себя', 'burns himself', 'hurts himself'
  ],
  violence: [
    'насилие', 'избиение', 'abuse', 'бьет',
    'изнасилование', 'rape', 'домогательство',
    'жестокое обращение', 'physical abuse'
  ],
  severe: [
    'психоз', 'psychosis', 'галлюцинации', 'hallucinations',
    'голоса в голове', 'слышит голоса', 'видения',
    'hearing voices', 'seeing things'
  ]
};

export function detectCrisis(text: string): {
  isCrisis: boolean;
  severity: 'none' | 'moderate' | 'severe' | 'emergency';
  categories: string[];
} {
  const lowerText = text.toLowerCase();
  const detectedCategories: string[] = [];

  // Check each category
  for (const [category, keywords] of Object.entries(CRISIS_KEYWORDS)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      detectedCategories.push(category);
    }
  }

  // Determine severity
  if (detectedCategories.includes('suicide') || detectedCategories.includes('violence')) {
    return { isCrisis: true, severity: 'emergency', categories: detectedCategories };
  }

  if (detectedCategories.includes('selfHarm') || detectedCategories.includes('severe')) {
    return { isCrisis: true, severity: 'severe', categories: detectedCategories };
  }

  if (detectedCategories.length > 0) {
    return { isCrisis: true, severity: 'moderate', categories: detectedCategories };
  }

  return { isCrisis: false, severity: 'none', categories: [] };
}
```

---

## 3. 🔄 Updated Apply Form with Crisis Detection

**File:** `src/app/apply/page.tsx` (add this to your existing form)

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CrisisModal } from '@/components/CrisisModal';
import { detectCrisis } from '@/lib/crisisDetection';

export default function ApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [formData, setFormData] = useState({
    // ... your existing formData
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for crisis FIRST
    const crisisCheck = detectCrisis(formData.issues + ' ' + formData.notes);

    if (crisisCheck.isCrisis && crisisCheck.severity === 'emergency') {
      setShowCrisisModal(true);

      // Log crisis event for monitoring
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'crisis_detected', {
          severity: crisisCheck.severity,
          categories: crisisCheck.categories.join(',')
        });
      }

      return; // Don't proceed with normal flow
    }

    // Continue with normal submission...
    setLoading(true);
    // ... rest of your existing code
  };

  return (
    <>
      <CrisisModal
        isOpen={showCrisisModal}
        onClose={() => setShowCrisisModal(false)}
        onContinue={() => {
          setShowCrisisModal(false);
          // Continue with form submission
          // ... your existing submit logic
        }}
      />

      {/* Your existing form JSX */}
      {/* Add warning banner at top of form */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-gray-700">
          <strong>⚠️ Важно:</strong> Если ваш ребенок в опасности прямо сейчас
          (суицидальные мысли, насилие, самоповреждение), немедленно позвоните:{' '}
          <a href="tel:7333" className="font-bold text-red-600 underline">
            7333 (Детская линия доверия)
          </a>
        </p>
      </div>

      {/* Rest of your form */}
    </>
  );
}
```

---

## 4. 🍪 Cookie Consent Banner

**File:** `src/components/CookieConsent.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            Мы используем cookies для улучшения работы сайта и анализа трафика.
            Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
            <a href="/privacy" className="underline hover:text-gray-300">
              Политикой конфиденциальности
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors text-sm"
          >
            Отклонить
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors text-sm"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Add to:** `src/app/layout.tsx`

```tsx
import { CookieConsent } from '@/components/CookieConsent';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
```

---

## 5. 📊 Analytics Setup

**File:** `src/lib/analytics.ts`

```typescript
type EventName =
  | 'page_view'
  | 'form_started'
  | 'form_step_completed'
  | 'form_abandoned'
  | 'form_submitted'
  | 'results_viewed'
  | 'psychologist_clicked'
  | 'contact_clicked'
  | 'crisis_detected';

interface EventProperties {
  [key: string]: string | number | boolean;
}

export const analytics = {
  track: (eventName: EventName, properties?: EventProperties) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, properties);
    }

    // You can add other analytics providers here
    // Mixpanel, Amplitude, etc.
  },

  page: (pageName: string, properties?: EventProperties) => {
    analytics.track('page_view', { page: pageName, ...properties });
  },

  identify: (userId: string, traits?: EventProperties) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        user_id: userId,
        ...traits
      });
    }
  }
};

// Extend Window type for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
```

**Add to:** `src/app/layout.tsx`

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ru">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Track events in your form:**

```tsx
import { analytics } from '@/lib/analytics';

// When form loads
useEffect(() => {
  analytics.track('form_started', { source: 'homepage' });
}, []);

// When step changes
const handleStepChange = (step: number) => {
  analytics.track('form_step_completed', {
    step,
    duration: Date.now() - stepStartTime
  });
};

// When form submitted
const handleSubmit = () => {
  analytics.track('form_submitted', {
    child_age: formData.childAge,
    urgency: formData.urgency,
    budget_max: formData.budgetMax
  });
};
```

---

## 6. 🔐 Privacy Policy Page (Basic Template)

**File:** `src/app/privacy/page.tsx`

```tsx
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-6">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <h2>1. Какие данные мы собираем</h2>
          <p>
            Мы собираем следующую информацию при заполнении формы подбора психолога:
          </p>
          <ul>
            <li>Ваше имя, email и телефон</li>
            <li>Возраст и пол ребенка</li>
            <li>Описание проблемы</li>
            <li>Предпочтения по подбору специалиста</li>
          </ul>

          <h2>2. Как мы используем данные</h2>
          <ul>
            <li>Для подбора подходящих психологов</li>
            <li>Для связи с вами по поводу заявки</li>
            <li>Для передачи контактов выбранным психологам</li>
            <li>Для улучшения нашего сервиса (анонимная статистика)</li>
          </ul>

          <h2>3. С кем мы делимся данными</h2>
          <p>
            Ваши контактные данные передаются ТОЛЬКО психологам, которых вы выбрали
            из результатов подбора. Мы НЕ продаем и НЕ передаем ваши данные третьим лицам.
          </p>

          <h2>4. Безопасность данных</h2>
          <p>
            Мы используем SSL-шифрование для защиты данных при передаче.
            Данные хранятся на защищенных серверах с ограниченным доступом.
          </p>

          <h2>5. Срок хранения данных</h2>
          <p>
            Мы храним ваши данные в течение 90 дней после последнего контакта.
            После этого данные автоматически удаляются.
          </p>

          <h2>6. Ваши права</h2>
          <p>Вы имеете право:</p>
          <ul>
            <li>Запросить копию своих данных</li>
            <li>Исправить неточные данные</li>
            <li>Удалить свои данные</li>
            <li>Отозвать согласие на обработку</li>
          </ul>
          <p>
            Для этого напишите на: <a href="mailto:privacy@example.com">privacy@example.com</a>
          </p>

          <h2>7. Cookies</h2>
          <p>
            Мы используем cookies для аналитики (Google Analytics) и улучшения работы сайта.
            Вы можете отключить cookies в настройках браузера.
          </p>

          <h2>8. Контакты</h2>
          <p>
            По вопросам конфиденциальности: <a href="mailto:privacy@example.com">privacy@example.com</a>
            <br />
            Наименование: [Ваше ЧП/ООО]
            <br />
            ИПН: [Ваш ИПН]
            <br />
            Адрес: [Ваш адрес]
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. ✅ Add Consent Checkbox to Form

**Add to your apply form:**

```tsx
const [formData, setFormData] = useState({
  // ... existing fields
  consentPrivacy: false,
  consentDataSharing: false,
});

// In the form JSX, before submit button:
<div className="border-t pt-6 space-y-4">
  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      name="consentPrivacy"
      checked={formData.consentPrivacy}
      onChange={(e) => setFormData(prev => ({ ...prev, consentPrivacy: e.target.checked }))}
      required
      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">
      Я ознакомился с{' '}
      <a href="/privacy" target="_blank" className="text-blue-600 underline">
        Политикой конфиденциальности
      </a>
      {' '}и даю согласие на обработку персональных данных *
    </span>
  </label>

  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      name="consentDataSharing"
      checked={formData.consentDataSharing}
      onChange={(e) => setFormData(prev => ({ ...prev, consentDataSharing: e.target.checked }))}
      required
      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">
      Я даю согласие на передачу моих контактных данных выбранным психологам *
    </span>
  </label>

  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      name="consentParent"
      checked={formData.consentParent}
      onChange={(e) => setFormData(prev => ({ ...prev, consentParent: e.target.checked }))}
      required
      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">
      Я являюсь законным представителем (родителем/опекуном) ребенка *
    </span>
  </label>
</div>
```

---

## 8. 📱 Auto-save Form Progress

**File:** `src/hooks/useFormAutoSave.ts`

```typescript
import { useEffect, useRef } from 'react';

export function useFormAutoSave<T>(
  formData: T,
  storageKey: string,
  delay: number = 2000
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to save
    timeoutRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(formData));
        console.log('Form auto-saved');
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formData, storageKey, delay]);

  // Load saved data on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return null;
  }, []);
}
```

**Use in your form:**

```tsx
import { useFormAutoSave } from '@/hooks/useFormAutoSave';

export default function ApplyPage() {
  const [formData, setFormData] = useState({...});

  // Auto-save every 2 seconds
  useFormAutoSave(formData, 'apply_form_draft', 2000);

  // Load saved draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('apply_form_draft');
    if (saved) {
      const shouldRestore = confirm('У вас есть несохраненная заявка. Восстановить?');
      if (shouldRestore) {
        setFormData(JSON.parse(saved));
      } else {
        localStorage.removeItem('apply_form_draft');
      }
    }
  }, []);

  // Clear saved draft after successful submission
  const handleSubmit = async () => {
    // ... submit logic
    localStorage.removeItem('apply_form_draft');
  };
}
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before going live with these changes:

- [ ] Test crisis modal with various keywords
- [ ] Test cookie consent on different browsers
- [ ] Verify Google Analytics is tracking events
- [ ] Test form auto-save (close browser, reopen)
- [ ] Review privacy policy with lawyer (if possible)
- [ ] Test mobile responsiveness
- [ ] Check accessibility (keyboard navigation, screen reader)
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Create backup of current codebase
- [ ] Deploy to staging first, test thoroughly
- [ ] Monitor logs for first 48 hours after production deploy

---

## 📧 NEED HELP?

These fixes address the MOST CRITICAL issues identified in the review.

**Priority order:**
1. Crisis detection (could save lives)
2. Privacy compliance (prevents lawsuits)
3. Analytics (enables data-driven decisions)
4. Form auto-save (improves conversion)

**Start with #1 and #2 TODAY.**

Good luck! 🍀
