/**
 * Путь: ./src/data/patientRepository.js
 * 
 * Репозиторий пациентов: хранит данные и методы для работы с ними.
 */

import { Patient } from '../models/patientModel';

// Имитация базы данных: заполненные модели пациентов
export const patients = [
  new Patient(
    1,
    'Константин',
    'Медведев',
    'Мирославович',
    'medvedev_patient',
    '+7 (922) 146-8306',
    '26.06.1991',
    144,
    true,
    'test123'
  ),
  new Patient(
    2,
    'Алексей',
    'Смирнов',
    'Петрович',
    'smirnov_patient',
    '+7 (923) 456-7890',
    '15.03.1988',
    80,
    false,
    'test456'
  ),
  new Patient(
    3,
    'Мария',
    'Иванова',
    'Алексеевна',
    'ivanova_patient',
    '+7 (921) 123-4567',
    '07.11.1995',
    200,
    true,
    'test789'
  ),
];

// Методы работы с репозиторием

// Получить всех пациентов
export const getAllPatients = () => patients;

// Найти пациента по ID
export const getPatientById = (id) => patients.find((patient) => patient.id === id);

// Авторизация пациента
export const authenticatePatient = (login, password) => {
  return patients.find(
    (patient) => patient.login === login && patient.password === password
  );
};

// Добавить нового пациента
export const addPatient = (patientData) => {
  const newPatient = new Patient(
    patients.length + 1,
    patientData.firstName,
    patientData.lastName,
    patientData.middleName,
    patientData.login,
    patientData.phone,
    patientData.birthDate,
    patientData.bonusPoints || 0,
    patientData.receiveEmails || false,
    patientData.password
  );
  patients.push(newPatient);
  return newPatient;
};

// Обновить данные пациента
export const updatePatientById = (id, updatedData) => {
  const patient = getPatientById(id);
  if (patient) {
    Object.assign(patient, updatedData); // Обновляем данные
    return patient;
  }
  return null;
};

// Удалить пациента
export const deletePatientById = (id) => {
  const index = patients.findIndex((patient) => patient.id === id);
  if (index !== -1) {
    return patients.splice(index, 1)[0];
  }
  return null;
};
