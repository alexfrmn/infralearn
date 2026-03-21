# Upload2Server Bot

Telegram-бот для передачи файлов между ноутбуком и сервером.

## Быстрая установка

```bash
# 1. Создать бота через @BotFather в Telegram
#    Получить токен: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# 2. Узнать свой Telegram ID: отправить /id боту @userinfobot

# 3. Установка на сервере
cd /opt/workspace
cp -r /opt/workspace/infralearn/upload-bot .
cd upload-bot

# 4. Виртуальное окружение
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 5. Создать .env файл
cat > .env << EOF
BOT_TOKEN=ВАШ_ТОКЕН_БОТА
ADMIN_ID=ВАШ_TELEGRAM_ID
EOF

# 6. Тест запуска
source .env && python3 bot.py

# 7. Systemd (автозапуск)
sudo cp upload-bot.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now upload-bot
sudo systemctl status upload-bot
```

## Использование

- Отправьте боту файл → сохранится в `/opt/workspace/uploads/`
- `/ls` — список файлов
- `/id` — ваш Telegram ID

## Передача файлов С сервера

```bash
# Отправить файл из сервера пользователю
curl -F document=@/path/to/file \
  "https://api.telegram.org/bot${BOT_TOKEN}/sendDocument" \
  -F chat_id=ВАШ_TELEGRAM_ID
```
