/**
 * Файл: CallCenterRoutes.js
 *
 * Что содержит:
 * - Маршруты для шапки (header) и нижнего меню (bottom) для колл-центра.
 *
 * За что отвечает:
 * - Определяет экраны и WebView для колл-центра.
 */

export const CallCenterRoutes = {
    // Маршруты для шапки
    header: [
      {
        key: 'notifications',
        title: 'Уведомления',
        icon: 'bell',
        url: 'https://example.com/callcenter/notifications',
      },
      {
        key: 'profile',
        title: 'Профиль',
        icon: 'account',
        url: 'https://example.com/callcenter/profile',
      },
    ],
  
    // Маршруты для нижнего меню
    bottom: [
      {
        key: 'calls',
        title: 'Звонки',
        icon: 'phone',
        url: 'https://example.com/callcenter/calls',
      },
      {
        key: 'tasks',
        title: 'Задачи',
        icon: 'clipboard-check',
        url: 'https://example.com/callcenter/tasks',
      },
      {
        key: 'reports',
        title: 'Отчёты',
        icon: 'file-chart',
        url: 'https://example.com/callcenter/reports',
      },
      {
        key: 'settings',
        title: 'Настройки',
        icon: 'cog',
        component: 'SettingsScreen',
      },
    ],
  };
  