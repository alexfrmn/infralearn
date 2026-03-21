# Obsidian Vault на сервере

## Быстрая настройка

```bash
# 1. Создаём структуру vault на сервере
mkdir -p /opt/workspace/vault/{00-Inbox,Projects,Daily-Notes}
cd /opt/workspace/vault

# 2. Инициализируем git
git init
echo "# My Knowledge Base" > README.md
git add . && git commit -m "init vault"

# 3. Создаём репозиторий на GitHub
gh repo create my-vault --private --source=. --push

# 4. На ноутбуке — клонируем
# git clone https://github.com/YOUR_USER/my-vault.git
# Открываем папку в Obsidian как vault
```

## Синхронизация

```bash
# На сервере: отправить изменения
cd /opt/workspace/vault
git add . && git commit -m "update" && git push

# На ноутбуке: получить изменения
cd ~/my-vault
git pull
```

## Структура

```
vault/
├── 00-Inbox/        # Входящие заметки
├── Projects/        # Проекты
├── Daily-Notes/     # Ежедневные заметки
└── README.md
```
