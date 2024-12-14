/**
 * Файл: AdminRoutes.js
 *
 * Что содержит:
 * - Маршруты для шапки (header) и нижнего меню (bottom) для админа.
 *
 * За что отвечает:
 * - Определяет экраны и WebView для админа.
 */

export const AdminRoutes = {
    // Маршруты для шапки
    header: [
      {
        key: 'notifications',
        title: 'Уведомления',
        icon: 'bell',
        url: 'https://example.com/admin/notifications', // WebView
      },
      {
        key: 'profile',
        title: 'Профиль',
        icon: 'account',
        url: 'https://example.com/admin/profile', // WebView
      },
    ],
  
    // Маршруты для нижнего меню
    bottom: [
      {
        key: 'dashboard',
        title: 'Главная',
        icon: 'view-dashboard',
        url: 'https://example.com/admin/dashboard', // WebView
      },
      {
        key: 'users',
        title: 'Пользователи',
        icon: 'account-group',
        url: 'https://example.com/admin/users', // WebView
      },
      {
        key: 'reports',
        title: 'Отчёты',
        icon: 'file-chart',
        url: 'https://example.com/admin/reports', // WebView
      },
      {
        key: 'settings',
        title: 'Настройки',
        icon: 'cog',
        component: 'SettingsScreen', // Экран для настроек
      },
    ],
  };
  