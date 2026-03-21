#!/bin/bash
# Хук SessionStart — показывает информацию о сервере при старте сессии

echo "================================"
echo "  $(date '+%A, %d %B %Y, %H:%M')"
echo "================================"

# Аптайм сервера
echo "Uptime: $(uptime -p)"

# Нагрузка
echo "Load:   $(cat /proc/loadavg | cut -d' ' -f1-3)"

# Память
echo "RAM:    $(free -h | awk '/Mem:/{print $3 "/" $2}')"

# Диск
echo "Disk:   $(df -h / | awk 'NR==2{print $3 "/" $2 " (" $5 ")"}')"

# Git статус (если в репо)
if git rev-parse --is-inside-work-tree &>/dev/null; then
    BRANCH=$(git branch --show-current)
    CHANGES=$(git status --porcelain | wc -l)
    echo "Git:    branch=$BRANCH, changes=$CHANGES"
fi

echo "================================"
