/**
 * Файл: DoctorRoutes.js
 *
 * Что содержит:
 * - Маршруты для шапки (header) и нижнего меню (bottom) для врача.
 *
 * За что отвечает:
 * - Определяет экраны и WebView для врача.
 */

export const DoctorRoutes = {
    // Маршруты для шапки
    header: [
      {
        key: 'notifications',
        title: 'Уведомления',
        icon: 'bell',
        url: 'https://example.com/doctor/notifications', // WebView для уведомлений врача
      },
      {
        key: 'profile',
        title: 'Профиль',
        icon: 'account',
        url: 'https://example.com/doctor/profile', // WebView для профиля врача
      },
    ],
  
    // Маршруты для нижнего меню
    bottom: [
      {
        key: 'home',
        title: 'Главная',
        icon: 'home',
        url: 'https://example.com/doctor/home', // WebView для главной страницы врача
      },
      {
        key: 'appointments',
        title: 'Записи',
        icon: 'calendar',
        url: 'https://example.com/doctor/appointments', // WebView для записей врача
      },
      {
        key: 'treatment',
        title: 'Пациенты',
        icon: 'medical-bag',
        url: 'https://example.com/doctor/patients', // WebView для пациентов врача
      },
      {
        key: 'wallet',
        title: 'Кошелек',
        icon: 'gift',
        component: 'WalletScreen', // Отдельный экран для кошелька
      },
    ],
  };
  