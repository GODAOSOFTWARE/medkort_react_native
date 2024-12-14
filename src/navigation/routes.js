/**
 * Routes.js
 * Центральный файл с роутами для всех ролей.
 */

export const Routes = {
    patient: {
      header: [
        { key: 'profile', title: 'Профиль', icon: 'account', url: 'https://medkort.ru/patient/profile' },
        { key: 'settings', title: 'Настройки', icon: 'cog', url: 'https://medkort.ru/patient/settings' },
      ],
      main: [
        { key: 'home', title: 'Продукты', icon: 'home', url: 'https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md' },
        { key: 'appointments', title: 'Расписание', icon: 'calendar', url: 'https://medkort.ru/lk/profile?view=app&item=appointments' },
        { key: 'treatment', title: 'Лечение', icon: 'medical-bag', url: 'https://medkort.ru/lk/profile?view=app&item=recommendations' },
        { key: 'wallet', title: 'Кошелек', icon: 'gift', component: 'WalletScreen' },
      ],
    },
    doctor: {
      header: [
        { key: 'profile', title: 'Профиль', icon: 'account', url: 'https://medkort.ru/doctor/profile' },
        { key: 'settings', title: 'Настройки', icon: 'cog', url: 'https://medkort.ru/doctor/settings' },
      ],
      main: [
        { key: 'dashboard', title: 'Рабочий кабинет', icon: 'briefcase', url: 'https://medkort.ru/doctor/dashboard' },
        { key: 'appointments', title: 'Записи', icon: 'calendar', url: 'https://medkort.ru/doctor/appointments' },
        { key: 'analytics', title: 'Аналитика', icon: 'chart-line', url: 'https://medkort.ru/doctor/analytics' },
        { key: 'patients', title: 'Пациенты', icon: 'account-group', url: 'https://medkort.ru/doctor/patients' },
      ],
    },
    admin: {
      header: [
        { key: 'profile', title: 'Профиль', icon: 'account', url: 'https://medkort.ru/admin/profile' },
        { key: 'settings', title: 'Настройки', icon: 'cog', url: 'https://medkort.ru/admin/settings' },
      ],
      main: [
        { key: 'dashboard', title: 'Главная', icon: 'home', url: 'https://medkort.ru/admin/dashboard' },
        { key: 'analytics', title: 'Аналитика', icon: 'chart-line', url: 'https://medkort.ru/admin/analytics' },
        { key: 'users', title: 'Пользователи', icon: 'account-multiple', url: 'https://medkort.ru/admin/users' },
        { key: 'settings', title: 'Настройки', icon: 'cog', url: 'https://medkort.ru/admin/settings' },
      ],
    },
    callcenter: {
      header: [
        { key: 'profile', title: 'Профиль', icon: 'account', url: 'https://medkort.ru/callcenter/profile' },
        { key: 'settings', title: 'Настройки', icon: 'cog', url: 'https://medkort.ru/callcenter/settings' },
      ],
      main: [
        { key: 'calls', title: 'Звонки', icon: 'phone', url: 'https://medkort.ru/callcenter/calls' },
        { key: 'tasks', title: 'Задачи', icon: 'check-circle', url: 'https://medkort.ru/callcenter/tasks' },
        { key: 'clients', title: 'Клиенты', icon: 'account-multiple', url: 'https://medkort.ru/callcenter/clients' },
        { key: 'schedule', title: 'График', icon: 'calendar', url: 'https://medkort.ru/callcenter/schedule' },
      ],
    },
  };
  