# Medkort Alpha 1.0  
![Medkort Robot Doctor](https://cdn.leonardo.ai/users/af13a399-7d3c-474e-a05a-0fa56893b1a1/generations/acf3cf3b-78ab-4596-9d7c-9cf5d08819db/Leonardo_Kino_XL_Draw_a_cartoonstyle_robot_inspired_by_the_des_0.jpg?w=512)

## **Вы думали, что когда-нибудь роботы нас заменят?**

Поздравляем! Этот день настал. Теперь робот заботится о Вас: напоминает, когда нужно принять лекарство, записаться к врачу или пройти обследование. Более того, как виртуальный ассистент, Medkort может поставить будильник на приём препаратов сразу после выхода из клиники или записать Вас на прием. просто зная ваше время в календаре на телефоне. 

Ваш личный андроид-куратор берёт на себя всю рутинную работу, позволяя вам сосредоточиться на главном — вашем здоровье. И знаете, что самое удивительное? Вы получаете за это бонусы!

Добро пожаловать в будуще..

**Похоже на сказку? Давайте разбираться...**

Medkort — это не просто приложение. Это ваш персональный врач-ассистент, который помогает соблюдать медицинские рекомендации, сохраняет данные о вашем здоровье и предлагает инновационный подход к лечению.  

---

## **Основные возможности**

1. **Распределённая база данных**  
   - Данные пациента хранятся децентрализованно, что обеспечивает высокую доступность и защиту.  
   - Основное хранилище реализовано с использованием локальной базы данных, которая синхронизируется с сервером.  

2. **Гибридное управление данными**  
   - При необходимости локальное хранилище может переключаться на распределённую систему хранения файлов — **IPFS (InterPlanetary File System)**.  
   - Данные пациента (анализы, рецепты) шифруются и загружаются в IPFS, что обеспечивает их защиту и неизменность.  

3. **Гибкость соединений**  
   - Приложение может адаптировать тип соединения:
     - Использование REST API для стандартного взаимодействия.
     - Переход на IPFS для передачи и хранения больших объёмов данных.
     - Взаимодействие с EVM (Ethereum Virtual Machine) для выполнения операций с токенами и смарт-контрактами.  

4. **Лечение под контролем искусственного интеллекта**  
   - Умные напоминания о приёме лекарств и выполнении процедур.  
   - Голосовые уведомления, адаптированные под ваши предпочтения.  
   - Автоматическое составление графика лечения на основе рекомендаций врача.  

5. **Программа лояльности**  
   - Выполняйте назначения и получайте бонусы, которые можно обменять на лекарства или медицинские услуги.  

6. **Медицина выгоднее для всех участников сообщества**  
   - **Для пациентов:**  
     - Возможность экономить на услугах и получать бонусы за выполнение рекомендаций.  
     - Прозрачность лечения благодаря доступу к медицинской документации в любое время.  
   - **Для врачей и клиник:**  
     - Уменьшение административной нагрузки за счёт автоматизации процессов.  
     - Увеличение числа лояльных пациентов благодаря удобной системе взаимодействия.  
   - **Для страховых компаний и фармацевтов:**  
     - Точное соблюдение рекомендаций снижает вероятность осложнений, что уменьшает затраты.  
     - Увеличение продаж за счёт удобного доступа к медицинским продуктам через приложение.  

**Medkort повышает привлекательность медицины, делая её прозрачной, экономически эффективной и выгодной для всех участников сообщества.**
---

1. ## **Технологический стек**

### **Текущий стек с версиями**
- **React Native**: 0.71.x  
- **Expo**: 49.x  
- **Локальная база данных**: 0.24.x  
- **IPFS HTTP Client**: 62.x  
- **react-native-webview**: 12.x  
- **react-navigation**: 6.x  
- **react-native-paper**: 5.x  
- **ethers.js**: 5.x  
- **web3.js**: 1.9.x  

### **Будущий стек**
- **Криптографическая база данных**:  
  - AES-256 для шифрования медицинских данных.  
  - Хеширование данных через SHA-256 для их целостности.  
- **Интеграция с EVM**:  
  - ERC-20 и ERC-721 для токенизации данных.  
  - Смарт-контракты для хранения рекомендаций врача.  
- **IPFS**: Децентрализованное хранилище файлов.  

---

### **База данных**

### **Тип базы данных**  
Используется локальная реляционная база данных для хранения пользовательских данных, синхронизируемая с сервером.  

### **Принцип работы**  
- Локальные данные шифруются и сохраняются на устройстве пользователя.  
- При наличии сети данные синхронизируются с серверной частью.  
- Для больших файлов, таких как медицинские изображения и результаты анализов, используется децентрализованное хранилище IPFS.  

---

2. **Медицина выгоднее для всех участников сообщества**  
   - **Для врачей и клиник:**  
     - Уменьшение административной нагрузки за счёт автоматизации процессов.  
     - Увеличение числа лояльных пациентов благодаря удобной системе взаимодействия.  
   - **Для страховых компаний и фармацевтов:**  
     - Точное соблюдение рекомендаций снижает вероятность осложнений, что уменьшает затраты.  
     - Увеличение продаж за счёт удобного доступа к медицинским продуктам через приложение.

3.  - **Современная аритектура и стек технологий:**
     - Интеллектуальное управление:
       - Приложение автоматизирует процесс лечения, создаёт расписания и адаптирует их под ваш график.
       - Синхронизация с врачом через зашифрованный канал.
       - Легкая установка прав доступа к объекам благодаря технологии невзаимозаменяемых служебных токенов, удостоверяющих права доступа к функционалу платформы

    - **Алгоритмы криптогафии в управлении базами данных:**  
      - Защита данных пациента с использованием стандарта AES-256.
      - Управление медицинскими данными через смарт-контракты (Solidity).

    - **Создание дцентрализованного приложения на базе собственных смарт-контрактов:** 
      - Поддержка EVM контрактов для цифрового реестра сделок в медицинских сообществах.
      - Поддержка шифрования данных по алгоритму ассинхронного шифрования.  

**Medkort повышает привлекательность медицины, делая её прозрачной, экономически эффективной и выгодной для всех участников сообщества.**

---

## **Частный блокчейн в Medkort**

Система Medkort поддерживает архитектуру частного закрытого блокчейна, размещённого на серверах каждой клиники. Этот подход обеспечивает безопасное и распределённое хранение данных, защищая их от несанкционированного доступа и изменений. Каждая запись подписывается криптографической парой ключей и синхронизируется в партнёрской сети.

### **Как это работает**:
1. **Шифрование данных**:
   - Все данные (назначения, транзакции, истории) зашифрованы и подписаны ключами.
2. **Распределённое хранение**:
   - Каждая клиника хранит копию реестра сделок в сети.
   - Данные синхронизируются между клиниками, обеспечивая доступность и целостность.
3. **Прозрачность**:
   - Каждое действие записывается в реестр и невозможно изменить без согласия участников сети.

### **Преимущества**:
- **Безопасность**: Данные пациентов защищены криптографией.
- **Целостность**: Невозможность удалить или изменить запись без разрешения сети.
- **Доступность**: Данные остаются доступными даже при сбое одного из серверов.
- **Прозрачность**: Участники сети могут отслеживать все операции.
- **Интеграция экосистемы**: Простое подключение партнёров (страховых компаний, фармацевтов).

---

### **Алгоритм развертывания**

1. **Установка серверов в каждой клинике**:
   - Разверните сервер с поддержкой блокчейна (например, Hyperledger, Quorum).
2. **Инициализация блокчейна**:
   - Сгенерируйте криптографические ключи для каждой клиники.
   - Настройте синхронизацию между узлами сети.
3. **Подключение системы Medkort**:
   - Настройте API для работы с реестром через смарт-контракты.
4. **Запуск и тестирование**:
   - Проверьте взаимодействие между клиниками, валидацию и шифрование данных.

---

Этот подход создаёт надёжную платформу для обмена медицинскими данными, соблюдая высочайшие стандарты безопасности и конфиденциальности.


**Скачайте приложение**  
     - APK файл на андройд.  
     - Магазин RU Stort.
     - Магазин Play_market
     - Webview приложение на бибилиотеках React native 
     - Телегам мини апп  