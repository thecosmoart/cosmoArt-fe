'use client';

import {
    Header,
    Header__Wrapper
} from './Header.module.scss';
import { useEffect, useState } from "react";
import { useDevice } from "@/stores/Device.store";
import { usePathname } from "next/navigation";
import LogoComponent from "@/components/Logo";
import HeaderLinksComponent from "@/components/Header/HeaderLinks";

export default function HeaderComponent() {
    const { isMobile, handleResize } = useDevice();
    const [menuActive, setMenuActive] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (window !== undefined) {
            handleResize();

            window.addEventListener('resize', handleResize);
        }
    }, []);


    useEffect(() => {
        setMenuActive(false);
    }, [pathname]);

    return (
        <header className={ Header }>
            <div className={ Header__Wrapper }>
                <LogoComponent />
                { !isMobile && <HeaderLinksComponent /> }
            </div>
        </header>
    );
}