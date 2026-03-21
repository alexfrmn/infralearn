#!/usr/bin/env python3
"""Upload2Server Bot — передача файлов между Telegram и сервером.
Кидаете файл боту → он сохраняется в /opt/workspace/uploads/
"""

import os
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

# Настройки — замените на свои!
BOT_TOKEN = os.getenv("BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")
ADMIN_ID = int(os.getenv("ADMIN_ID", "0"))  # Ваш Telegram ID
UPLOAD_DIR = "/opt/workspace/uploads"

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

os.makedirs(UPLOAD_DIR, exist_ok=True)


@dp.message(Command("start"))
async def cmd_start(msg: types.Message):
    await msg.answer(
        "Upload2Server Bot\n\n"
        "Отправьте мне файл, фото или документ — "
        "я сохраню его на сервере в /opt/workspace/uploads/\n\n"
        "Команды:\n"
        "/ls — список файлов на сервере\n"
        "/id — ваш Telegram ID"
    )


@dp.message(Command("id"))
async def cmd_id(msg: types.Message):
    await msg.answer(f"Ваш Telegram ID: {msg.from_user.id}")


@dp.message(Command("ls"))
async def cmd_ls(msg: types.Message):
    if msg.from_user.id != ADMIN_ID:
        await msg.answer("Доступ только для администратора")
        return
    files = os.listdir(UPLOAD_DIR)
    if files:
        file_list = "\n".join(sorted(files)[-20:])
        await msg.answer(
            f"Последние файлы:\n```\n{file_list}\n```", parse_mode="Markdown"
        )
    else:
        await msg.answer("Папка пуста")


@dp.message(lambda msg: msg.document is not None)
async def handle_document(msg: types.Message):
    if ADMIN_ID and msg.from_user.id != ADMIN_ID:
        await msg.answer("Доступ только для администратора")
        return

    doc = msg.document
    file = await bot.get_file(doc.file_id)
    filename = doc.file_name or f"file_{doc.file_id}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    await bot.download_file(file.file_path, filepath)
    await msg.answer(f"Сохранён: {filepath}")


@dp.message(lambda msg: msg.photo is not None)
async def handle_photo(msg: types.Message):
    if ADMIN_ID and msg.from_user.id != ADMIN_ID:
        await msg.answer("Доступ только для администратора")
        return

    photo = msg.photo[-1]  # Самое большое разрешение
    file = await bot.get_file(photo.file_id)
    from datetime import datetime

    filename = f"photo_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
    filepath = os.path.join(UPLOAD_DIR, filename)

    await bot.download_file(file.file_path, filepath)
    await msg.answer(f"Сохранён: {filepath}")


async def main():
    print(f"Upload2Server Bot запущен. Upload dir: {UPLOAD_DIR}")
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
