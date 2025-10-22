# 🚨 СРОЧНО: КАК ИСПРАВИТЬ VERCEL ДЕПЛОЙ

**Проблема:** Сайт показывает стандартную страницу Next.js
**Причина:** На Vercel подключен не тот GitHub репозиторий (пустой шаблон)

---

## 🔍 ЧТО НУЖНО СДЕЛАТЬ ПРЯМО СЕЙЧАС

### Шаг 1: Найти GitHub репозиторий на Vercel

1. Зайти на Vercel: https://vercel.com/woweri/psychologist-matching/settings/git
2. Посмотреть **"Connected Git Repository"**
3. Скопировать URL (например: `https://github.com/woweri/psychologist-matching`)

---

### Шаг 2: Загрузить наш код в этот репозиторий

**Вариант A: Если у вас есть доступ к GitHub аккаунту**

```bash
# 1. Зайти в папку проекта
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# 2. ЗАМЕНИТЕ URL на тот, что видите в Vercel Settings
git remote add origin https://github.com/woweri/psychologist-matching.git

# 3. Загрузить код (force push, чтобы заменить старый код)
git push -u origin main --force
```

**При запросе авторизации:**
- Username: ваш GitHub username
- Password: Personal Access Token (НЕ обычный пароль!)

**Как получить Personal Access Token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic) → Generate new token
3. Выбрать scope: `repo` (полный доступ к репозиториям)
4. Скопировать токен и использовать как пароль

---

**Вариант B: Если нет доступа / нужна помощь**

Скажите мне, и я помогу через GitHub CLI или другой метод.

---

### Шаг 3: Проверить автодеплой

После `git push` Vercel автоматически:

1. **Обнаружит изменения** (webhook от GitHub)
2. **Запустит новый build**
3. **Покажет прогресс** на странице Deployments

**Следить:**
https://vercel.com/woweri/psychologist-matching/deployments

---

### Шаг 4: Проверить Build Logs

После запуска деплоя:

1. Открыть последний deployment
2. Кликнуть "View Build Logs"
3. **Ожидается увидеть:**

```
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Collecting build traces
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /apply                               ...
└ ○ /results/[id]                        ...
```

**НЕ должно быть:**
```
Error: Cannot find module 'tailwindcss'
```

---

### Шаг 5: Проверить сайт

После успешного деплоя:

**Открыть:** https://psychologist-matching.vercel.app/

**Должно быть:**
- ✅ Заголовок: "Найдите психолога для вашего подростка"
- ✅ Кнопка: "Начать подбор психолога"
- ✅ 3 блока с иконками (🎯 ✓ ⚡)
- ✅ Секция "Как это работает"

**НЕ должно быть:**
- ❌ "Get started by editing app/page.tsx"
- ❌ "Deploy now" / "Read our docs"

---

## 🆘 ЕСЛИ НЕТ ДОСТУПА К GITHUB

### Попросить доступ у владельца

1. Кто владелец GitHub аккаунта `woweri`?
2. Попросить добавить вас как Collaborator
3. Или попросить сделать push самостоятельно

### Или создать новый репозиторий

1. Создать свой GitHub аккаунт
2. Создать репозиторий `psychologist-matching`
3. Загрузить код туда
4. Переподключить Vercel к новому репозиторию

---

## 📋 БЫСТРЫЙ ЧЕКЛИСТ

- [ ] Найти GitHub URL в Vercel Settings
- [ ] Подключить remote: `git remote add origin URL`
- [ ] Загрузить код: `git push -u origin main --force`
- [ ] Дождаться автодеплоя (2-3 минуты)
- [ ] Проверить Build Logs (должны быть ✅ без ошибок)
- [ ] Открыть сайт и проверить что отображается правильная страница

---

## 🔧 АЛЬТЕРНАТИВА: ДЕПЛОЙ ЧЕРЕЗ VERCEL CLI

Если не работает через Git:

```bash
# Установить Vercel CLI
npm install -g vercel

# Зайти в папку
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Логин
vercel login

# Деплой
vercel --prod
```

---

## ❓ ЧТО ДЕЛАТЬ ЕСЛИ...

### "Permission denied"
→ Нужен доступ к GitHub репозиторию `woweri/psychologist-matching`

### "Authentication failed"
→ Используйте Personal Access Token, не обычный пароль

### Build всё ещё падает с ошибкой
→ Покажите мне Build Logs, я помогу разобраться

### Сайт не обновляется
→ Очистить кэш: Ctrl+Shift+R (Chrome) или Cmd+Shift+R (Safari)

---

**Следующий шаг:** Скажите мне URL GitHub репозитория из Vercel Settings, и я помогу загрузить код!
