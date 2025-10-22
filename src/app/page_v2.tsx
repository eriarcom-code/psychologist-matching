import Link from 'next/link';
import { stats, testimonials, benefits, howItWorksSteps, faq, trustBadges, commonConcerns, guarantees } from '@/data/marketing-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section - ВОРОНКА 1: ЗНАКОМСТВО */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                За последние 30 дней помогли {stats.monthlyNewFamilies} семьям
              </div>
            </div>

            {/* Main Headline - Эмоциональный хук */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center mb-6 leading-tight">
              Подросток закрылся?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Поможем найти психолога
              </span>
              ,<br className="hidden md:block" /> которому он откроется
            </h1>

            {/* Subheadline - Social Proof */}
            <p className="text-xl md:text-2xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Более <strong>{stats.familiesHelped} семей</strong> доверили нам подбор специалиста.
              <br />
              Средний рейтинг психологов: <strong className="text-yellow-500">⭐ {stats.averageRating}/5</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/apply"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="relative z-10">Найти психолога бесплатно →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                Как это работает? ↓
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {[
                { number: `${stats.psychologistsNetwork}+`, label: 'Психологов в базе' },
                { number: `${stats.averageSessionsToResult}`, label: 'Сессии до результата' },
                { number: `${stats.successRate}%`, label: 'Видят улучшения' },
                { number: '3 мин', label: 'Время подбора' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Признаки что нужна помощь - Психолог expertise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Знакомо? Возможно, пора обратиться к специалисту
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Если видите 2 и более признака дольше 2 недель — стоит проконсультироваться
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { emoji: '🚪', title: 'Замкнутость', text: 'Ребенок закрылся в комнате, избегает общения с семьей' },
                { emoji: '😤', title: 'Агрессия', text: 'Вспышки гнева, конфликты по любому поводу' },
                { emoji: '📉', title: 'Падение успеваемости', text: 'Резко упали оценки, потерял интерес к учебе' },
                { emoji: '😔', title: 'Апатия', text: 'Ничего не радует, постоянная усталость' },
                { emoji: '🎮', title: 'Зависимость', text: 'Игры/соцсети 8+ часов в день' },
                { emoji: '😰', title: 'Тревожность', text: 'Панические атаки, страхи, бессонница' },
              ].map((sign, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-4xl">{sign.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{sign.title}</h3>
                    <p className="text-gray-600 text-sm">{sign.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <p className="text-gray-700">
                <strong className="text-yellow-800">⚠️ Важно:</strong> Если подросток говорит о нежелании жить или причинении себе вреда —
                срочно обратитесь на горячую линию <strong className="text-blue-600">7333</strong> или в скорую помощь.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Почему мы */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Почему родители выбирают нас
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Мы не просто база психологов. Мы — сервис, который действительно помогает найти "того самого" специалиста
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow group">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-3">{benefit.description}</p>
                <p className="text-sm text-gray-500">{benefit.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - ВОРОНКА 2: ПРОЦЕСС */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Как это работает
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Путь от заявки до первой сессии — проще, чем кажется
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute left-[29px] top-12 bottom-12 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>

              {howItWorksSteps.map((item, index) => (
                <div key={index} className="relative flex items-start gap-6 mb-12 last:mb-0">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0 w-[60px] h-[60px] bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg relative z-10">
                    {item.step}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                      <span className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>

                  {/* Icon */}
                  <div className="hidden lg:block text-5xl">{item.icon}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/apply"
                className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Начать подбор психолога →
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Займет всего 3 минуты • Полностью бесплатно
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - ВОРОНКА 4: ДОВЕРИЕ */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Истории семей, которым мы помогли
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Реальные отзывы от родителей (имена изменены для конфиденциальности)
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Problem & Result */}
                <div className="space-y-2 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Проблема: </span>
                    <span className="text-sm text-gray-600">{testimonial.problem}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-green-700">Результат: </span>
                    <span className="text-sm text-green-600">{testimonial.result}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                  {testimonial.verified && (
                    <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      ✓ Проверено
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              <strong>{stats.familiesHelped}</strong> семей уже нашли своего психолога через нас
            </p>
            <Link
              href="/apply"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Присоединяйтесь к ним
            </Link>
          </div>
        </div>
      </section>

      {/* Работа с возражениями - ВОРОНКА 4: OBJECTIONS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Сомневаетесь? Мы понимаем
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Вот что чаще всего беспокоит родителей — и наши ответы
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {commonConcerns.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <div className="font-semibold text-gray-900 mb-2 text-lg">{item.concern}</div>
                <div className="text-gray-700">{item.response}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Гарантии */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Наши гарантии
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Ваша уверенность и спокойствие — наш приоритет
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-green-700 mb-2 text-lg flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  {guarantee.title}
                </h3>
                <p className="text-gray-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - ВОРОНКА 4: ИНФОРМИРОВАНИЕ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Частые вопросы
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Ответы на самые популярные вопросы о подборе психолога
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {faq.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.questions.map((item, qIndex) => (
                    <details key={qIndex} className="bg-gray-50 rounded-lg overflow-hidden group">
                      <summary className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{item.question}</span>
                        <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{badge.title}</div>
                <div className="text-xs text-gray-600">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Готовы помочь своему подростку?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Первый шаг — самый важный. Начните прямо сейчас.
          </p>
          <Link
            href="/apply"
            className="inline-block px-12 py-5 bg-white text-blue-600 text-xl font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Найти психолога бесплатно →
          </Link>
          <p className="text-sm mt-6 opacity-75">
            🔒 Ваши данные защищены • 💳 Никаких платежей • ⚡ Результат за 3 минуты
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">О сервисе</h3>
              <p className="text-gray-400 text-sm">
                Помогаем семьям найти квалифицированных психологов для подростков с 2020 года.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <div className="text-gray-400 text-sm space-y-2">
                <div>📧 hello@psychologist-matching.com</div>
                <div>📱 +380 (50) 123-45-67</div>
                <div>💬 Telegram: @psycho_help</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Ссылки</h3>
              <div className="text-gray-400 text-sm space-y-2">
                <div><Link href="/about" className="hover:text-white">О нас</Link></div>
                <div><Link href="/psychologists" className="hover:text-white">Для психологов</Link></div>
                <div><Link href="/blog" className="hover:text-white">Блог</Link></div>
                <div><Link href="/privacy" className="hover:text-white">Конфиденциальность</Link></div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Подписка</h3>
              <p className="text-gray-400 text-sm mb-4">
                Статьи о ментальном здоровье подростков
              </p>
              <input
                type="email"
                placeholder="Ваш email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Psychologist Matching Platform. Все права защищены.</p>
            <p className="mt-2">Сделано с ❤️ для здоровья подростков</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
