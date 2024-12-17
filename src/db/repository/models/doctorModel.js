/**
 * Путь: ./src/models/doctorModel.js
 * 
 * Модель доктора: шаблон для создания данных доктора.
 */

export class Doctor {
  constructor(
    id, 
    firstName, 
    lastName, 
    specialization,
    login, 
    password
  ) {
    this.id = id; // Уникальный идентификатор врача
    this.firstName = firstName; // Имя врача
    this.lastName = lastName; // Фамилия врача
    this.specialization = specialization; // Специализация врача
    this.login = login; // Логин для авторизации
    this.password = password; // Пароль (тестовый)
  }
}
