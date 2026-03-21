#!/bin/bash
# Простая установка OpenVPN сервера для курса InfraLearn
# Использует готовый скрипт angristan/openvpn-install

set -e

echo "=== Установка OpenVPN ==="
echo ""

# Скачиваем скрипт установки
curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh

echo ""
echo "Запускаю установщик. Отвечайте на вопросы:"
echo "  - IP: оставьте по умолчанию (ваш IP)"
echo "  - IPv6: n"
echo "  - Port: 1194 (по умолчанию)"
echo "  - Protocol: UDP"
echo "  - DNS: 3 (Cloudflare)"
echo "  - Compression: n"
echo "  - Encryption: по умолчанию"
echo "  - Client name: phone (или laptop)"
echo ""

sudo ./openvpn-install.sh

echo ""
echo "=== OpenVPN установлен! ==="
echo ""
echo "Файл конфигурации клиента: ~/phone.ovpn"
echo ""
echo "Как подключиться:"
echo "  1. Скачайте файл .ovpn на ноутбук/телефон"
echo "  2. Установите OpenVPN Connect (App Store / Google Play)"
echo "  3. Импортируйте файл .ovpn"
echo "  4. Подключитесь!"
echo ""
echo "Добавить ещё клиента: sudo ./openvpn-install.sh"
