/**
 * Путь: ./src/models/patientModel.js
 * 
 * Модель пациента: шаблон для создания данных пациента.
 */

export class Patient {
  
  constructor(
    id,
    firstName,
    lastName,
    middleName,
    login,
    phone,
    birthDate,
    bonusPoints,
    receiveEmails,
    password
  ) {
    this.id = id; // Уникальный идентификатор пациента
    this.firstName = firstName; // Имя
    this.lastName = lastName; // Фамилия
    this.middleName = middleName; // Отчество
    this.login = login; // Логин
    this.phone = phone; // Телефон
    this.birthDate = birthDate; // Дата рождения
    this.bonusPoints = bonusPoints; // Бонусные баллы
    this.receiveEmails = receiveEmails; // Согласие на рассылку
    this.password = password; // Пароль (тестовый)
  }
}
