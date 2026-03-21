# InfraLearn — Материалы курса "Свой AI-сервер"

**Курс:** Свой AI-сервер: Claude Code + Codex — от нуля до продакшена
**Платформа:** [AI Mindset](https://learn.aimindset.org)
**Сайт курса:** [infralearn.zakaz.su](https://infralearn.zakaz.su)

## Быстрый старт

```bash
# На вашем VPS:
cd /opt/workspace
git clone https://github.com/alexfrmn/infralearn.git

# Установить скиллы
mkdir -p ~/.claude/skills
cp -r infralearn/skills/* ~/.claude/skills/

# Установить хуки
mkdir -p ~/.claude/hooks
cp infralearn/hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh

# Установить конфиги
cp infralearn/configs/CLAUDE.md ~/.claude/CLAUDE.md
cp infralearn/configs/settings.json ~/.claude/settings.json
cp infralearn/configs/settings.local.json ~/.claude/settings.local.json
cp infralearn/configs/statusline.js ~/.claude/statusline.js
```

## Структура

```
infralearn/
├── site/              # HTML сайт курса (infralearn.zakaz.su)
├── skills/            # 4 скилла для Claude Code
│   ├── code-review/       ревью кода
│   ├── decision-helper/   помощь в решениях
│   ├── compress/          сжатие контекста
│   └── exa-web-research/  веб-исследования
├── hooks/             # 2 хука (session-start, session-end)
├── configs/           # Шаблоны конфигов
│   ├── CLAUDE.md          системный промпт для Claude Code
│   ├── AGENTS.md          системный промпт для Codex
│   ├── settings.json      настройки + statusline
│   ├── settings.local.json хуки
│   ├── statusline.js      информационная строка
│   └── .mcp.json          MCP серверы
├── upload-bot/        # Telegram бот для передачи файлов
│   ├── bot.py             основной код (aiogram 3.x)
│   ├── requirements.txt
│   └── upload-bot.service systemd сервис
├── vpn/               # OpenVPN установка
│   └── setup-openvpn.sh   скрипт установки
└── README.md
```

## Что входит

- **4 скилла:** code-review, decision-helper, compress, exa-web-research
- **2 хука:** session-start (инфо о сервере), session-end (напоминание коммита)
- **Statusline:** информационная строка с моделью, контекстом, временем
- **Конфиги:** CLAUDE.md, AGENTS.md, MCP серверы (memory, filesystem, github, context7, exa)
- **Upload2Server бот:** Telegram бот для передачи файлов на/с сервера
- **OpenVPN:** скрипт быстрой установки VPN

## Лицензия

MIT
