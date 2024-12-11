# Medkort React Native Application

Medkort — это мобильное приложение для медицинской платформы **Medkort**, предоставляющее доступ к бонусной программе, расписанию приёмов и другим сервисам через удобный пользовательский интерфейс.

---

## Технологический стек

### **Текущий стек технологий**
Приложение разработано с использованием следующих технологий и библиотек:

- **React Native** (v0.71.x): Основной фреймворк для создания кроссплатформенных приложений.
- **Expo** (v49.x): Инструмент для упрощённой разработки, тестирования и сборки приложений.
- **react-native-webview** (v12.x): Используется для отображения контента платформы через встроенный WebView.
- **react-navigation** (v6.x): Организация маршрутов и логики навигации.
- **react-native-paper** (v5.x): Набор UI-компонентов, созданных по стандартам Material Design.
- **react-native-vector-icons** (v9.x): Для добавления современных иконок в интерфейс приложения.
- **react-native-reanimated** (v3.x): Библиотека для создания плавных анимаций.
- **react-native-gesture-handler** (v2.x): Поддержка жестов для интерактивного интерфейса.
- **react-native-safe-area-context** (v4.x): Для корректного отображения интерфейса в безопасной области экрана.

---

### **Будущий стек технологий**
Для дальнейшего развития и масштабирования приложения планируется использовать следующие технологии и модули:

#### **Архитектура и протоколы**
- **HTTPS (v1.2+)**: Защищённый протокол передачи данных для обеспечения безопасности.
- **REST API**: Унифицированный способ взаимодействия клиента с сервером.

#### **Мобильные UI-фреймворки**
- **React Native Skia**: Для отрисовки графики высокого качества, включая кастомные UI-элементы.
- **React Native Animatable**: Упрощение сложных анимаций для интерактивного пользовательского интерфейса.
- **Recoil**: Современная библиотека управления состоянием, созданная Facebook.

#### **Библиотеки для производительности**
- **react-native-fast-image**: Ускоренная загрузка и оптимизация изображений.
- **react-query**: Управление запросами данных и их кэшированием для улучшения производительности.

#### **Дополнительные модули**
- **Firebase**: Аутентификация, push-уведомления, аналитика и хранение данных.
- **lottie-react-native**: Поддержка анимаций Lottie для современного дизайна.
- **react-native-localize**: Поддержка локализации приложения на различные языки.
- **WatermelonDB**: Для оффлайн-хранения данных и их синхронизации.

---

## Особенности проекта

1. **Кроссплатформенность**: Приложение работает на iOS и Android без необходимости создания отдельного кода для каждой платформы.
2. **Модульность**: Вся логика организована в модулях, что упрощает разработку и тестирование.
3. **API-поддержка**: В будущем приложение будет использовать REST API для взаимодействия с платформой.
4. **Безопасность**: Все данные будут передаваться через HTTPS с использованием современных стандартов шифрования.
5. **Интерактивный UI**: Использование лучших библиотек для создания плавного и интерактивного пользовательского опыта.
6. **Веб-приложение**: 
   - Приложение интегрировано как PWA (Progressive Web App), что позволяет запускать его в браузере и настраивать под использование API.
   - API может быть передано в Telegram-бота, что позволяет использовать Telegram как клиент для взаимодействия с платформой.
7. **Универсальность**:
   - Возможность использования как мобильного приложения, так и как части экосистемы с подключением внешних клиентов, таких как Telegram, что повышает удобство и масштабируемость.


## Цели проекта

1. **Интеграция с REST API**:
   - Разработать и подключить полноценный клиент для взаимодействия с платформой.
   - Обеспечить авторизацию и управление сессиями через JWT-токены.
   
2. **Поддержка оффлайн-режима**:
   - Использовать локальные базы данных для хранения пользовательских данных.

3. **Оптимизация производительности**:
   - Использование быстрых и лёгких библиотек для оптимизации загрузки контента.

4. **Дизайн мирового уровня**:
   - Внедрение анимаций, переходов и графики высокого качества в соответствии с последними трендами.

---

**Разработчик:** Медведек Константин

Для любых вопросов или предложений создайте [issue](https://github.com/GODAOSOFTWARE/medkort_react_native/issues) в репозитории.

## Лицензия

Этот проект распространяется под лицензией **0BSD**. Подробнее см. в файле [LICENSE](./LICENSE).
