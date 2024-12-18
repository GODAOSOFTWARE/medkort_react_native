# Навигация в приложении: Пример использования (Авторизация)

---

## **Сценарий: Открытие приложения**

1. **Проверка состояния пользователя**
   - При запуске приложения система проверяет, авторизован ли пользователь:
     - Проверяется наличие токена авторизации и роли пользователя (пациент или врач).
     - Если токен отсутствует или недействителен, пользователь считается неавторизованным.

2. **Перенаправление неавторизованного пользователя**
   - Если пользователь неавторизован, приложение отображает экран авторизации.
   - Пользователю предлагается войти в систему, введя свои данные.

3. **После успешной авторизации**
   - Система сохраняет токен и роль пользователя в локальном хранилище.
   - Пользователь перенаправляется в свой кабинет:
     - Пациент попадает в кабинет с соответствующими экранами и навигацией.
     - Врач попадает в кабинет врача с его собственными экранами и навигацией.

4. **Динамическая загрузка интерфейса**
   - На основании роли пользователя система загружает маршруты:
     - Для пациента: экраны "Продукты", "Расписание", "Лечение", "Кошелёк".
     - Для врача: экраны "Расписание", "Пациенты", "Отчёты", "Кошелёк".
   - Навигационное меню формируется автоматически в зависимости от маршрутов.

5. **Поведение при отсутствии токена**
   - Если пользователь выходит из системы или токен становится недействительным:
     - При следующем запуске приложения он автоматически перенаправляется на экран авторизации.

---

## **Итог**
Этот процесс обеспечивает удобный вход в приложение, безопасную авторизацию и динамическую загрузку интерфейса, подходящего для роли пользователя. Всё это достигается через централизованное управление навигацией.
