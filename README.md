# Medkort React Native Application

Medkort — это мобильное приложение для медицинской платформы **Medkort**, которая предоставляет пользователям доступ к бонусной программе и реестру цифровых сделок в медицинском сообществе.

## О приложении

В текущей **альфа-версии** приложение состоит из одного файла кода и представляет собой WebView, обеспечивающий доступ к основным возможностям платформы через мобильное устройство. 

В планах на **бета-версию**:
- Реализация взаимодействия с API платформы.
- Создание полноценного пользовательского интерфейса, обеспечивающего прямое управление и использование всех возможностей Medkort.

## Роли и взаимодействия

### Пациент
- **Что делает:** Получает рекомендации от врача-куратора, выбирает медицинское учреждение для выполнения рекомендаций, отслеживает выполнение плана лечения через платформу.
- **С кем взаимодействует:**
  - С врачом-куратором для получения консультаций и рекомендаций.
  - С платформой Medkort для подбора клиники и получения бонусов.
- **Зачем:** Для удобного и прозрачного управления процессом лечения и получения кэшбэка за покупки в партнерской сети.

### Клиника
- **Что делает:** Заказывает услугу по привлечению пациентов в медицинское учреждение.
- **С кем взаимодействует:**
  - С платформой Medkort для получения новых пациентов на основании договора.
- **Зачем:** Для увеличения потока клиентов и эффективного заполнения расписания специалистов.

### Врач
- **Что делает:** Проводит первичные приемы, создает планы лечения, консультирует пациентов через платформу.
- **С кем взаимодействует:**
  - С пациентами для сопровождения и мониторинга лечения.
  - С платформой Medkort для предоставления телемедицинских услуг.
- **Зачем:** Для заработка на телемедицинском сопровождение пациента после первичного приема


### Платформа Medkort
- **Что делает:** 
  - Для пациента: Подбирает подходящие клиники для выполнения рекомендаций врача.
  - Для клиники: Привлекает новых пациентов и увеличивает поток клиентов.
  - Для врача: Обеспечивает инструменты для заработка враче за телемедицинские консультаций и помогает повысить качество лечения.
  - Оцифровывает все сделки пользователей и начисляет бонусы инициатору,рекомендателю и получателю услуги
- **С кем взаимодействует:**
  - С пациентами для подбора медицинских учреждений.
  - С клиниками для увеличения потока клиентов.
  - С врачами для организации телемедицинских консультаций.
- **Зачем:** Для создания единой цифровой экосистемы, где пользователи, клиники и врачи могут эффективно взаимодействовать.

---

Если у вас есть вопросы или предложения, создайте [issue](https://github.com/GODAOSOFTWARE/medkort_react_native/issues) в репозитории.

## Лицензия

Этот проект распространяется под лицензией **0BSD**. Подробнее см. в файле [LICENSE](./LICENSE).