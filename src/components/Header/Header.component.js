'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Header,
    Header__Right,
    Header__Wrapper } from './Header.module.scss';

import HeaderLinksComponent from '@/components/Header/HeaderLinks';
import LogoComponent from '@/components/Logo';
import MobileMenuComponent from '@/components/MobileMenu';
import { useDevice } from '@/stores/Device.store';
import { useUser } from '@/stores/User.store';
import { browserStorage } from '@/utils/browserStorage';

export default function HeaderComponent() {
    const { isMobile, handleResize } = useDevice();
    const { isLoggedIn, setUser, getUserData } = useUser();
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

    useEffect(() => {
        if (window !== undefined) {
            handleResize();

            window.addEventListener('resize', handleResize);
            window.addEventListener('resize', () => setIsMobileMenuActive(false));
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
                { isMobile &&
                    <div onClick={ () => setIsMobileMenuActive(!isMobileMenuActive) }>
                        <Image src="/burger.svg" alt="burger-menu" width={ 60 } height={ 18 } />
                    </div>
                }
                {
                    (isMobile && isMobileMenuActive) && <MobileMenuComponent handleClose={ () => setIsMobileMenuActive(false) }/>
                }
                <LogoComponent />
                <div className={ Header__Right }>
                    { !isMobile && <HeaderLinksComponent /> }
                    { !isLoggedIn && (
                        <Link href='/login'><button>Sign in</button></Link>
                    ) || <Link href='/profile'><Image src="/avatar.svg" alt="avatar" width={ 40 } height={ 40 }></Image></Link> }
                </div>
            </div>
        </header>
    );
}
