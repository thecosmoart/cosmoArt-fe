'use client';

import {
    Header,
    Header__Wrapper,
    Header__Right
} from './Header.module.scss';
import { useEffect, useState } from "react";
import { useDevice } from "@/stores/Device.store";
import { usePathname } from "next/navigation";
import LogoComponent from "@/components/Logo";
import HeaderLinksComponent from "@/components/Header/HeaderLinks";
import { useUser } from "@/stores/User.store";
import Link from "next/link";
import { browserStorage } from "@/utils/browserStorage";
import Image from "next/image";

export default function HeaderComponent() {
    const { isMobile, handleResize } = useDevice();
    const { isLoggedIn, setUser, getUserData } = useUser();

    useEffect(() => {
        if (window !== undefined) {
            handleResize();

            window.addEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const jwt = browserStorage.get('jwt');

        if (!jwt) {
            setUser(null);

            return;
        }

        getUserData();
    }, []);

    return (
        <header className={ Header }>
            <div className={ Header__Wrapper }>
                <LogoComponent />
                <div className={ Header__Right }>
                    { !isMobile && <HeaderLinksComponent /> }
                    { !isLoggedIn && (
                        <Link href='/login'><button>Sign in</button></Link>
                    ) || <Link href='/profile'><Image src="/avatar.svg" alt="avatar" width={ 40 } height={ 40 }></Image></Link>}
                </div>
            </div>
        </header>
    );
}