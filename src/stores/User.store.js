import { create } from 'zustand';

import { fetchAPI } from '@/utils/api';

export const useUser = create((set) => ({
    user: {},
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setUser: (user) => set({ user }),
    getUserData: async () => {
        const user = await fetchAPI('/users/me', { populate: ['address'] });
        const loginProvider = process.env.NEXT_PUBLIC_LOGIN_TYPE;
        const isSteamProvider = loginProvider === 'steam';

        if (user.email) {
            set({ user });
            set({ isLoggedIn: true });
            set({ isUserFulFilled: (
                (isSteamProvider && !user?.email?.includes('@steam.fake') && user.tradeUrl) || !isSteamProvider
            ) && user?.address });
        }
    },
    isUserFulFilled: false,
    setIsUserFulFilled: (isUserFulFilled) => set({ isUserFulFilled })
}));
