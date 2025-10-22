import { create } from 'zustand';

export const useBreadcrumbs = create((set) => ({
    breadcrumbs: {},
    setBreadcrumbs: (newBreadcrumbs) => set({ breadcrumbs: newBreadcrumbs })
}));
