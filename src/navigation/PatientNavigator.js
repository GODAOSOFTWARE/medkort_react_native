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
};
