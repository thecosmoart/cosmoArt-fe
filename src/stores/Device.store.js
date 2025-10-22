import { create } from 'zustand';

export const useDevice = create((set) => ({
    isMobile: false,
    isDesktop: false,
    isTablet: false,
    isLargeMobile: false,
    isLargeTable: false,
    handleResize: () => {
        const isMobileMedia = window.matchMedia('only screen and (max-width: 767px)');
        const isDesktopMedia = window.matchMedia('only screen and (min-width: 1025px)');
        const isTabletMedia = window.matchMedia('only screen and (min-width: 768px) and (max-width: 1025px)');
        const isLargeMobileMedia = window.matchMedia('only screen and (max-width: 577px)');
        const isLargeTableMedia = window.matchMedia('only screen and (min-width: 1151px)');

        set({
            isMobile: isMobileMedia.matches,
            isDesktop: isDesktopMedia.matches,
            isTablet: isTabletMedia.matches,
            isLargeMobile: isLargeMobileMedia.matches,
            isLargeTable: isLargeTableMedia.matches
        });
    }
}));
