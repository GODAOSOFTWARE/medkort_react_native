/**
 * Путь: ./src/data/doctorRepository.js
 * 
 * Репозиторий докторов: хранит данные и методы для работы с ними.
 */

import { Doctor } from '../models/doctorModel';

// Имитация базы данных: заполненные модели докторов
export const doctors = [
  new Doctor(1, 'Иван', 'Иванов', 'Кардиолог', 'ivanov_doctor', 'test123'),
  new Doctor(2, 'Мария', 'Петрова', 'Невролог', 'petrova_doctor', 'test456'),
  new Doctor(3, 'Алексей', 'Сидоров', 'Терапевт', 'sidorov_doctor', 'test789'),
];

// Методы работы с репозиторием

// Получить всех докторов
export const getAllDoctors = () => doctors;

// Найти доктора по ID
export const getDoctorById = (id) => doctors.find((doctor) => doctor.id === id);

// Авторизация доктора
export const authenticateDoctor = (login, password) => {
  return doctors.find(
    (doctor) => doctor.login === login && doctor.password === password
  );
};

// Добавить нового доктора
export const addDoctor = (doctorData) => {
  const newDoctor = new Doctor(
    doctors.length + 1,
    doctorData.firstName,
    doctorData.lastName,
    doctorData.specialization,
    doctorData.login,
    doctorData.password
  );
  doctors.push(newDoctor);
  return newDoctor;
};

// Обновить данные доктора
export const updateDoctorById = (id, updatedData) => {
  const doctor = getDoctorById(id);
  if (doctor) {
    Object.assign(doctor, updatedData); // Обновляем данные
    return doctor;
  }
  return null;
};

// Удалить доктора
export const deleteDoctorById = (id) => {
  const index = doctors.findIndex((doctor) => doctor.id === id);
  if (index !== -1) {
    return doctors.splice(index, 1)[0];
  }
  return null;
};
