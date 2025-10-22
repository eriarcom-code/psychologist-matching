# 🚀 ИСПРАВЛЕНИЕ ДЕПЛОЯ НА VERCEL

**Проблема:** `Error: Cannot find module 'tailwindcss'`
**Решение:** Перенесены зависимости для билда в `dependencies`

---

## ✅ ЧТО ИСПРАВЛЕНО

### package.json - Обновлен

**Перенесено из devDependencies в dependencies:**
- `tailwindcss` - CSS фреймворк (нужен для билда)
- `postcss` - PostCSS обработчик (нужен для билда)
- `autoprefixer` - Autoprefixer плагин (нужен для билда)

**Почему это важно:**
Vercel при production билде по умолчанию не устанавливает `devDependencies`, только `dependencies`. Поскольку Tailwind CSS нужен для компиляции стилей во время билда, он должен быть в основных зависимостях.

---

## 🔧 ИНСТРУКЦИЯ ПО ДЕПЛОЮ

### Вариант 1: Через Git (Рекомендуется)

#### Шаг 1: Инициализировать Git (если еще не сделано)

```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Проверить статус Git
git status

# Если репозиторий не инициализирован:
git init

# Создать .gitignore (если нет)
cat > .gitignore << 'EOF'
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next
out
build
dist

# Production
.vercel

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.idea
.vscode
*.swp
*.swo
*~
EOF
```

#### Шаг 2: Коммит изменений

```bash
# Добавить все файлы
git add .

# Создать коммит с исправлением
git commit -m "fix: move tailwindcss to dependencies for Vercel build"
```

#### Шаг 3: Создать репозиторий на GitHub

**Вариант A: Через веб-интерфейс GitHub**
1. Зайти на https://github.com/
2. Нажать "New repository"
3. Название: `psychologist-matching`
4. Приватность: Public или Private (на ваш выбор)
5. НЕ добавлять README, .gitignore, license (у нас уже есть)
6. Создать

**Вариант B: Через GitHub CLI (если установлен)**
```bash
gh repo create psychologist-matching --public --source=. --remote=origin
```

#### Шаг 4: Подключить remote и загрузить код

```bash
# Подключить GitHub репозиторий (замените USERNAME на ваш GitHub username)
git remote add origin https://github.com/USERNAME/psychologist-matching.git

# Или если используете SSH:
# git remote add origin git@github.com:USERNAME/psychologist-matching.git

# Проверить main или master branch
git branch -M main

# Загрузить код
git push -u origin main
```

#### Шаг 5: Подключить Vercel к репозиторию

1. **Зайти в Vercel:** https://vercel.com/
2. **Import Project:**
   - Dashboard → "Add New..." → "Project"
   - "Import Git Repository"
   - Выбрать ваш GitHub репозиторий `psychologist-matching`
3. **Configure Project:**
   - Framework Preset: **Next.js** (должно определиться автоматически)
   - Root Directory: `.` (корень репозитория)
   - Build Command: `npm run build` (автоматически)
   - Output Directory: `.next` (автоматически)
4. **Environment Variables:**

   Добавить следующие переменные:

   ```bash
   # Asana Integration
   ASANA_PAT=2/1205907821619571/1211678693641024:c5a24afd128cbf675eb1e4eb90b964f1
   ASANA_TASK_ID=1211675594049575
   ASANA_WORKSPACE_GID=1205907821619581

   # Mock Mode
   USE_MOCK_DATA=true

   # Next.js
   NEXTAUTH_SECRET=your-secret-here-change-in-production
   NEXTAUTH_URL=https://psychologist-matching.vercel.app
   BASE_URL=https://psychologist-matching.vercel.app
   NODE_ENV=production
   TIMEZONE_DEFAULT=Europe/Kiev
   ```

5. **Deploy:**
   - Нажать "Deploy"
   - Дождаться окончания билда (2-3 минуты)
   - Проверить логи на наличие ошибок

---

### Вариант 2: Если репозиторий уже подключен

Если Vercel уже подключен к Git репозиторию:

```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Коммит исправления
git add package.json
git commit -m "fix: move tailwindcss to dependencies for Vercel build"

# Загрузить изменения
git push
```

Vercel автоматически запустит новый деплой после `git push`.

---

### Вариант 3: Ручной деплой через Vercel CLI

```bash
# Установить Vercel CLI (если еще не установлен)
npm install -g vercel

# Зайти в папку проекта
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Логин в Vercel
vercel login

# Деплой
vercel --prod
```

Следовать инструкциям в терминале.

---

## 🧪 ПРОВЕРКА ПОСЛЕ ДЕПЛОЯ

После успешного деплоя проверить:

1. **Главная страница:**
   ```
   https://psychologist-matching.vercel.app/
   ```

   **Ожидается:**
   - Заголовок: "Найдите психолога для вашего подростка"
   - Кнопка: "Начать подбор психолога"
   - 3 блока фич
   - Секция "Как это работает"

2. **Форма анкеты:**
   ```
   https://psychologist-matching.vercel.app/apply
   ```

   **Ожидается:**
   - Форма с 11 полями
   - Валидация работает

3. **API endpoint:**
   ```bash
   curl -X POST https://psychologist-matching.vercel.app/api/apply \
     -H "Content-Type: application/json" \
     -d '{
       "parentName": "Test",
       "email": "test@example.com",
       "phone": "+380501234567",
       "childAge": 16,
       "issues": "тест",
       "preferredLanguage": "ru",
       "preferredApproach": "CBT",
       "budget": "500-1000",
       "preferOnline": true,
       "additionalInfo": ""
     }'
   ```

   **Ожидается:**
   - JSON ответ с массивом `results` (10 психологов)

---

## 📊 VERCEL BUILD LOGS

### Успешный билд должен показать:

```
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Collecting build traces
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.1 kB
├ ○ /_not-found                          871 B          87.8 kB
├ ○ /apply                               142 B          87.1 kB
└ ○ /results/[id]                        142 B          87.1 kB

○  (Static)  prerendered as static content

✓ Deployment ready
```

### Если есть ошибки:

**Проверить:**
1. Все ли файлы закоммичены в Git
2. Правильно ли указан Root Directory в Vercel
3. Установлены ли Environment Variables
4. Нет ли синтаксических ошибок в коде

---

## 🔄 ОБНОВЛЕНИЕ КОДА В БУДУЩЕМ

После каждого изменения кода:

```bash
# 1. Коммит
git add .
git commit -m "feat: описание изменений"

# 2. Загрузить на GitHub
git push

# 3. Vercel автоматически задеплоит новую версию
```

---

## 📝 ЧЕКЛИСТ ГОТОВНОСТИ К ДЕПЛОЮ

- [x] `package.json` исправлен (tailwindcss в dependencies)
- [ ] Git репозиторий инициализирован
- [ ] Код закоммичен
- [ ] GitHub репозиторий создан
- [ ] Код загружен на GitHub
- [ ] Vercel подключен к репозиторию
- [ ] Environment Variables добавлены
- [ ] Деплой запущен
- [ ] Build успешно завершился
- [ ] Сайт работает на https://psychologist-matching.vercel.app/

---

## 🆘 ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК

### Ошибка: "Cannot find module"

**Решение:** Проверить что модуль в `dependencies`, не в `devDependencies`

### Ошибка: "Build failed"

**Решение:** Проверить Build Logs в Vercel Dashboard

### Ошибка: "Git push rejected"

**Решение:**
```bash
git pull --rebase origin main
git push
```

### Сайт показывает 404

**Решение:** Проверить что Root Directory в Vercel настройках = `.`

---

## 📞 ДАЛЬНЕЙШИЕ ШАГИ

После успешного деплоя:

1. ✅ Протестировать все страницы
2. ✅ Проверить работу формы
3. ✅ Проверить API endpoint
4. 📝 Оставить комментарий в Asana с URL
5. 🔄 Координация с другим AI для Google интеграции

---

**Дата:** 2025-10-21
**Статус:** ✅ Готово к деплою
**Исправление:** tailwindcss перенесен в dependencies
