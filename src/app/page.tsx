import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Найдите психолога для вашего подростка
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Мы подберем лучших специалистов, которые работают с подростками,
            учитывая ваши предпочтения и бюджет
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg"
          >
            Начать подбор психолога
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Точный подбор
            </h3>
            <p className="text-gray-600">
              Алгоритм учитывает возраст, проблемы, предпочитаемый подход и бюджет
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Проверенные специалисты
            </h3>
            <p className="text-gray-600">
              Все психологи имеют опыт работы с подростками и верифицированы
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Быстро и бесплатно
            </h3>
            <p className="text-gray-600">
              Заполните анкету за 3 минуты и получите список подходящих психологов
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Как это работает
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Заполните анкету
                </h3>
                <p className="text-gray-600">
                  Расскажите о возрасте ребенка, проблемах, с которыми нужна помощь,
                  и ваших предпочтениях
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Получите подборку
                </h3>
                <p className="text-gray-600">
                  Наш алгоритм подберет 10 лучших психологов, которые максимально
                  подходят под ваши критерии
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Свяжитесь со специалистом
                </h3>
                <p className="text-gray-600">
                  Выберите понравившегося психолога и свяжитесь с ним напрямую
                  по email, телефону или Telegram
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/apply"
            className="inline-block px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 active:bg-purple-800 transition-colors shadow-lg"
          >
            Подобрать психолога сейчас
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Psychologist Matching Platform. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
