# 🚀 ИНСТРУКЦИЯ: КАК ЗАГРУЗИТЬ КОД НА GITHUB

**Статус:** ✅ Git инициализирован, коммит создан
**Осталось:** Подключить GitHub и загрузить код

---

## ✅ ЧТО УЖЕ СДЕЛАНО

1. ✅ Git инициализирован в `dashboard-woweri/`
2. ✅ `.gitignore` создан
3. ✅ Все файлы закоммичены (коммит b316783)
4. ✅ `package.json` исправлен (tailwindcss в dependencies)

---

## 📝 ЧТО НУЖНО СДЕЛАТЬ

### Вариант А: Если есть GitHub аккаунт

#### Шаг 1: Создать репозиторий на GitHub

**Через веб-интерфейс:**
1. Зайти на https://github.com/
2. Нажать "+" → "New repository"
3. **Repository name:** `psychologist-matching`
4. **Description:** "Psychologist Matching Platform - MVP"
5. **Visibility:** Public (или Private на ваш выбор)
6. **НЕ добавлять:** README, .gitignore, license (уже есть)
7. Нажать "Create repository"

#### Шаг 2: Подключить remote и загрузить

```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Подключить GitHub репозиторий
# ЗАМЕНИТЕ "USERNAME" на ваш GitHub username
git remote add origin https://github.com/USERNAME/psychologist-matching.git

# Загрузить код
git push -u origin main
```

**При первом push GitHub попросит авторизацию:**
- Используйте Personal Access Token (рекомендуется)
- Или GitHub CLI: `gh auth login`

---

### Вариант Б: Через GitHub CLI (если установлен)

```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Логин в GitHub
gh auth login

# Создать репозиторий и загрузить код одной командой
gh repo create psychologist-matching --public --source=. --remote=origin --push
```

---

### Вариант В: Если уже есть репозиторий на Vercel

Vercel уже подключен к проекту `woweri/psychologist-matching-v2-et8c`.

**Проверить какой GitHub репозиторий используется:**

1. Зайти на https://vercel.com/woweri/psychologist-matching-v2-et8c
2. Settings → Git
3. Посмотреть "Connected Git Repository"
4. Скопировать URL репозитория

**Если репозиторий уже существует:**

```bash
cd "/Users/erika/Library/CloudStorage/GoogleDrive-eriar.com@gmail.com/Мой диск/САЙТЫ/МЕТОДИЧКА АСАНА/dashboard-woweri"

# Подключить существующий репозиторий
# ЗАМЕНИТЕ URL на настоящий из Vercel
git remote add origin https://github.com/woweri/psychologist-matching-v2.git

# Загрузить код (может потребоваться --force, если на GitHub другой код)
git push -u origin main

# Если есть конфликты:
git push -u origin main --force
```

---

## 🔍 ПРОВЕРКА ПОСЛЕ ЗАГРУЗКИ

### 1. Проверить что код на GitHub

Зайти на GitHub репозиторий и убедиться, что есть:
- ✅ `package.json` с tailwindcss в dependencies
- ✅ `src/` папка с кодом
- ✅ `README.md`
- ✅ `.gitignore`

### 2. Vercel автоматически задеплоит

После `git push`, Vercel автоматически:
1. Обнаружит новый коммит
2. Запустит build
3. Задеплоит новую версию

**Следить за процессом:**
https://vercel.com/woweri/psychologist-matching-v2-et8c/deployments

### 3. Проверить build logs

Открыть последний deployment и проверить логи:
- ✅ `npm install` прошел без ошибок
- ✅ `tailwindcss` установлен
- ✅ `npm run build` успешно завершился
- ✅ Deployment ready

### 4. Проверить сайт

Открыть https://psychologist-matching.vercel.app/

**Ожидается:**
- ✅ Заголовок: "Найдите психолога для вашего подростка"
- ✅ Кнопка: "Начать подбор психолога"
- ✅ 3 блока фич
- ✅ Секция "Как это работает"

**НЕ должно быть:**
- ❌ Стандартная страница Next.js с логотипом
- ❌ "Deploy now" / "Read our docs"

---

## 🆘 ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК

### Ошибка: "Authentication failed"

**Решение:**
```bash
# Создать Personal Access Token на GitHub
# Settings → Developer settings → Personal access tokens → Generate new token
# Скопировать токен и использовать вместо пароля при git push
```

### Ошибка: "Remote already exists"

**Решение:**
```bash
# Удалить старый remote
git remote remove origin

# Добавить правильный
git remote add origin https://github.com/USERNAME/psychologist-matching.git
```

### Ошибка: "Push rejected, non-fast-forward"

**Решение:**
```bash
# Если уверены что ваш код правильный - force push
git push -u origin main --force
```

### Vercel не запускает build

**Решение:**
1. Vercel → Settings → Git
2. Проверить что branch "main" подключен
3. Manual Deploy: Deployments → "Redeploy"

---

## 📊 ИТОГОВЫЙ ЧЕКЛИСТ

После выполнения всех шагов:

- [ ] GitHub репозиторий создан
- [ ] Remote подключен
- [ ] Код загружен (`git push` успешно)
- [ ] Vercel запустил автодеплой
- [ ] Build прошел без ошибок
- [ ] Сайт работает (https://psychologist-matching.vercel.app/)
- [ ] Отображается кастомный лендинг (НЕ стандартный Next.js)

---

## 📞 СЛЕДУЮЩИЙ ШАГ

После успешного деплоя:

1. ✅ Протестировать форму
2. ✅ Проверить API endpoint
3. ✅ Добавить комментарий в Asana с URL
4. 🔄 Координация с AI для Google интеграции

---

**Дата:** 2025-10-21
**Commit:** b316783
**Branch:** main
**Статус:** ✅ Готово к загрузке на GitHub
