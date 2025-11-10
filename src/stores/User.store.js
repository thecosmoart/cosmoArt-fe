import { create } from 'zustand';

import { fetchAPI } from '@/utils/api';

export const useUser = create((set) => ({
    user: {},
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setUser: (user) => set({ user }),
    getUserData: async () => {
        const user = await fetchAPI('/users/me', { populate: ['address'] });

        if (user.email) {
            set({ user });
            set({ isLoggedIn: true });
        }
    },
    isGeneratingActivated: false,
    setIsGeneratingActivated: (isGeneratingActivated) => set({ isGeneratingActivated })
}));
