# Medkort

![Medkort Robot Doctor](https://cdn.leonardo.ai/users/af13a399-7d3c-474e-a05a-0fa56893b1a1/generations/bb08c08f-cf73-4699-bb6b-effcf683219d/Leonardo_Kino_XL_Act_like_a_professional_AI_artist_specializin_2.jpg?w=512)

---

## Введение
**Хотели бы сделать медицину удобной, простой и выгодной?**

Поздравляем! Этот день настал. Теперь робот заботится о вас: напоминает, когда нужно принять лекарство, записаться к врачу или пройти обследование. Более того, Medkort, как ваш виртуальный ассистент, может установить будильник на приём препарата сразу после выхода из кабинета врача или записать вас на приём, учитывая свободное время в вашем календаре.

Ваш личный андроид-куратор берёт на себя всю рутинную работу, позволяя вам сосредоточиться на главном — своей жизни. И самое удивительное — за всё это вы ещё получаете бонусы! Medkort заботится о вашем здоровье, а вам остаётся только наслаждаться жизнью.

**Похоже на сказку? Давайте разбираться...**

---

## Что такое Medkort?

Medkort — это не просто приложение. Это ваш персональный врач-ассистент, который помогает соблюдать медицинские рекомендации, сохраняет данные о вашем здоровье и экономит ваше время для получения медицинских услуг.

---

## Основные возможности

### 1. Распределённая база данных
- Данные пациента хранятся децентрализованно, что обеспечивает высокую доступность и защиту.
- Основное хранилище реализовано с использованием локальной базы данных, которая синхронизируется с сервером.

### 2. Гибридное управление данными
- Локальное хранилище может переключаться на распределённую систему хранения файлов — IPFS (InterPlanetary File System).
- Данные пациента (история посещений, данные исследований и анализов, лекарственных назначений) шифруются и загружаются в IPFS, что обеспечивает их защиту и неизменность.

### 3. Гибкость соединений
- Приложение адаптирует тип соединения:
  - Использует REST API для стандартного взаимодействия.
  - Переходит на IPFS для передачи и хранения больших объёмов данных.
  - Взаимодействует с EVM (Ethereum Virtual Machine) для операций в децентрализованной среде.

### 4. Лечение под контролем искусственного интеллекта
- Автоматическое составление графика лечения на основе рекомендаций врача.
- Умные напоминания о приёме лекарств и выполнении процедур.
- Голосовые уведомления, адаптированные под ваши предпочтения.
- Расчёт времени до клиники и подбор ближайших медучреждений.
- Первичный ИИ-анализ состояния пациента и запись к профильному специалисту.

### 5. Программа лояльности
- Выполняйте назначения и получайте бонусы, которые можно обменять на лекарства или медицинские услуги.

---

## Преимущества для всех участников

### Для пациентов:
- Экономия времени и бонусы за выполнение рекомендаций врача.
- Прозрачность лечения благодаря доступу к медицинской информации в любое время.

### Для клиник:
- Уменьшение административной нагрузки за счёт автоматизации.
- Увеличение числа лояльных пациентов.

### Для врачей:
- Увеличение дохода за счёт снижения издержек.
- Возможность оказания полного комплекса диагностики и лечения через партнёрскую сеть.

### Для страховых и фармацевтических компаний:
- Снижение вероятности осложнений благодаря соблюдению рекомендаций.
- Увеличение продаж медицинских продуктов через приложение.

---

## Современная архитектура и технологии

### 1. Интеллектуальное управление
- Автоматизация процесса лечения, создание расписаний и синхронизация с врачом через зашифрованный канал.
- Лёгкая установка прав доступа через токены.
- Защищённый обмен данными между системами.

### 2. Алгоритмы криптографии
- Защита данных пациента с использованием AES-256.
- Управление медицинскими данными через смарт-контракты (Solidity), обёрнутые в SDK и REST API.
- Гибкая установка прав просмотра через приватные и публичные ключи.

### 3. Децентрализованное приложение
- Поддержка EVM контрактов для цифрового реестра.
- Шифрование данных с использованием асинхронных алгоритмов.
- Интеграция WEB3 с использованием wallet_connect и библиотеки web3.

---

## База данных

### Тип базы данных
- Используется локальная реляционная база данных для хранения пользовательских данных с синхронизацией с сервером.

### Принцип работы
1. Локальные данные шифруются и сохраняются на устройстве пользователя.
2. При наличии сети данные синхронизируются с сервером.
3. Для больших файлов используется распределённое хранилище IPFS.

### Medkort-core
- Архитектура частного блокчейна для безопасности и локального хранения данных.
- Криптографическая подпись записей и синхронизация в партнёрской сети.

---

## Преимущества

1. **Безопасность:** Данные пациентов защищены криптографией.
2. **Целостность:** Невозможно удалить или изменить запись без разрешения.
3. **Доступность:** Данные остаются доступными даже при сбое серверов.
4. **Прозрачность:** Участники сети могут отслеживать операции.
5. **Интеграция:** Простое подключение партнёров, включая страховые компании и фармацевтов.

---

## Дорожная карта

### Разработка PWA-приложения

**Alpha версия:**
1.0 Кроссплатформенный прототип мобильного приложения (React Native).
1.01 Локальное тестирование (EXPO GO) — ✅ Запущено.
1.02 Тестирование APK файла для ОС Android — ✅ Запущено.
1.03 Сборка кабинета пациента (авторизация, профиль, инструкции, PWA-экраны) — 🚧 В процессе.
1.04 Сборка кабинета врача (авторизация, дашборд, расписание, назначения) — 🔜 Следующий этап.
1.05 Сборка авторизации и профиля пациента через Swagger — 🔜 Следующий этап.

### Этапы:
1. Запуск платформы Medkort. ✅ Выполнено.
2. Интеграция двух клиник, использующих в работе МИС Реновация. ✅ Выполнено.
3. Интеграция реестра сделок в партнёрской сети. ✅ Выполнено.
4. Разработка PWA-приложения. 🚧 В процессе.
5. Разработка кроссплатформенного мобильного приложения.

---

Medkort повышает престиж и безопасность медицины, делая её прозрачной, экономически эффективной и безопасной для всех участников сообщества.
