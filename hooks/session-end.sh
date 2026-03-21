#!/bin/bash
# Хук SessionEnd — напоминает закоммитить изменения

echo ""
echo "--- Сессия завершена ---"

# Если в git-репозитории — показываем изменения
if git rev-parse --is-inside-work-tree &>/dev/null; then
    CHANGES=$(git status --porcelain | wc -l)
    if [ "$CHANGES" -gt 0 ]; then
        echo "Есть $CHANGES незакоммиченных изменений!"
        echo "Команды для сохранения:"
        echo "  git add ."
        echo "  git commit -m 'описание изменений'"
    else
        echo "Все изменения закоммичены."
    fi
fi

echo "--- До встречи! ---"
