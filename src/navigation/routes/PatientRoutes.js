/**
 * Файл: PatientRoutes.js
 *
 * Что содержит:
 * - Маршруты для шапки (header) и нижнего меню (bottom) для пациента.
 *
 * За что отвечает:
 * - Определяет экраны и WebView для пациента.
 */

export const PatientRoutes = {
  // Маршруты для шапки
  header: [
    {
      key: 'notifications',
      title: 'Уведомления',
      icon: 'bell',
      url: 'https://example.com/notifications', // Открывается через WebView
    },
    {
      key: 'profile',
      title: 'Профиль',
      icon: 'account',
      url: 'https://example.com/profile', // Открывается через WebView
    },
  ],

  // Маршруты для нижнего меню
  bottom: [
    {
      key: 'home',
      title: 'Продукты',
      icon: 'home',
      url: 'https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md', // Открывается через WebView
    },
    {
      key: 'appointments',
      title: 'Расписание',
      icon: 'calendar',
      url: 'https://medkort.ru/lk/profile?view=app&item=appointments', // Открывается через WebView
    },
    {
      key: 'treatment',
      title: 'Лечение',
      icon: 'medical-bag',
      url: 'https://medkort.ru/lk/profile?view=app&item=recommendations', // Открывается через WebView
    },
    {
      key: 'wallet',
      title: 'Кошелек',
      icon: 'gift',
      component: 'WalletScreen', // Открывается отдельный экран
    },
  ],
};
