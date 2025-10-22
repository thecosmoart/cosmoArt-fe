import { create } from 'zustand';

export const useNotification = create((set, get) => ({
    notifications: [],
    lastCleanTime: 0,
    addNotification: (newNotification) => {
        set((state) => ({
            notifications: [
                ...state.notifications,
                {
                    ...newNotification,
                    id: Date.now() + 3000
                }
            ]
        }));

        if (newNotification.scrollToTop && window) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (newNotification.scrollToRef && window) {
            const ref = newNotification.scrollToRef;
            ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    },
    closeNotification: (id) => {
        const newNotifications = get().notifications.filter((notification) => notification.id !== id);

        set({ notifications: newNotifications });
    },
    cleanAllNotifications: () => set({ notifications: [] })
}));
