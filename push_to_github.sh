#!/bin/bash

echo "🚀 GitHub Push Helper"
echo "===================="
echo ""
echo "Текущий коммит уже создан: b316783"
echo "Файлов закоммичено: 24"
echo ""
echo "Теперь нужно подключить GitHub репозиторий:"
echo ""
echo "1️⃣ Создайте репозиторий на GitHub:"
echo "   https://github.com/new"
echo "   Название: psychologist-matching"
echo ""
echo "2️⃣ Скопируйте URL репозитория (например):"
echo "   https://github.com/USERNAME/psychologist-matching.git"
echo ""
read -p "Введите GitHub URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ URL не введен. Выход."
    exit 1
fi

echo ""
echo "3️⃣ Подключаю remote..."
git remote add origin "$GITHUB_URL" 2>/dev/null || git remote set-url origin "$GITHUB_URL"

echo "✅ Remote подключен: $GITHUB_URL"
echo ""
echo "4️⃣ Загружаю код на GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅✅✅ УСПЕХ! Код загружен на GitHub"
    echo ""
    echo "Теперь Vercel автоматически задеплоит новую версию."
    echo "Проверить: https://psychologist-matching.vercel.app/"
else
    echo ""
    echo "❌ Ошибка при загрузке. Возможные причины:"
    echo "   - Нужна авторизация (Personal Access Token)"
    echo "   - Репозиторий не пустой (используйте --force)"
    echo ""
    read -p "Попробовать force push? (y/n): " FORCE

    if [ "$FORCE" = "y" ]; then
        git push -u origin main --force
        echo "✅ Force push выполнен"
    fi
fi
