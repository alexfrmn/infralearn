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
cp -r infralearn/skills/* ~/.claude/skills/

# Установить хуки
mkdir -p ~/.claude/hooks
cp infralearn/hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh

# Установить конфиги
cp infralearn/configs/settings.local.json ~/.claude/settings.local.json
cp infralearn/configs/CLAUDE.md ~/.claude/CLAUDE.md
```

## Структура

```
infralearn/
├── site/           # HTML сайт курса (infralearn.zakaz.su)
├── skills/         # 3 скилла для Claude Code
│   ├── code-review/
│   ├── decision-helper/
│   └── compress/
├── hooks/          # 2 хука (session-start, session-end)
├── configs/        # Шаблоны конфигов
│   ├── CLAUDE.md
│   ├── AGENTS.md
│   ├── settings.json
│   ├── settings.local.json
│   └── .mcp.json
└── README.md
```

## Что входит

- **3 скилла:** code-review, decision-helper, compress
- **2 хука:** session-start (инфо о сервере), session-end (напоминание коммита)
- **Конфиги:** CLAUDE.md, AGENTS.md, MCP серверы, settings

## Лицензия

MIT
