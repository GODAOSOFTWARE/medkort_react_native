/**
 * Путь: ./src/navigation/routes.js
 * 
 * Этот файл определяет маршруты для кабинетов пациента и врача.
 * Каждый маршрут может быть:
 * - Нативным экраном (component).
 * - WebView с указанным URL (url).
 */

export const Routes = {
    // Маршруты для кабинета пациента
    patient: {
      header: [
        { key: 'profile', title: 'Профиль', icon: 'account', url: 'https://medkort.ru/patient/profile' },
        { key: 'settings', title: 'Настройки', icon: 'cog', url: 'https://medkort.ru/patient/settings' },
      ],
      bottom: [
        { key: 'home', title: 'Продукты', icon: 'home', url: 'https://medkort.ru/?view=app' },
        { key: 'appointments', title: 'Расписание', icon: 'calendar', url: 'https://medkort.ru/lk/profile?view=app&item=appointments' },
        { key: 'treatment', title: 'Лечение', icon: 'medical-bag', url: 'https://medkort.ru/lk/profile?view=app&item=recommendations' },
        { key: 'wallet', title: 'Кошелек', icon: 'gift', component: 'WalletScreen' }, // Нативный компонент
      ],
    },
    // Маршруты для кабинета врача
    doctor: {
      header: [
        { key: 'profile', title: 'Профиль врача', icon: 'account', url: 'https://medkort.ru/doctor/profile' },
        { key: 'settings', title: 'Настройки врача', icon: 'cog', url: 'https://medkort.ru/doctor/settings' },
      ],
      bottom: [
        { key: 'schedule', title: 'Расписание', icon: 'calendar', component: 'DoctorScheduleScreen' }, // Нативный компонент
        { key: 'patients', title: 'Пациенты', icon: 'account-group', url: 'https://medkort.ru/doctor/patients' },
        { key: 'reports', title: 'Отчеты', icon: 'file-chart', url: 'https://medkort.ru/doctor/reports' },
        { key: 'wallet', title: 'Кошелек', icon: 'gift', component: 'DoctorWalletScreen' }, // Нативный компонент
      ],
    },
  };
  