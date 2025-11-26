'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
    MobileMenu,
    MobileMenu__AvatarImageWrapper
} from './MobileMenu.module.scss';

import HeaderLinksComponent from '@/components/Header/HeaderLinks';
import { useUser } from '@/stores/User.store';

export default function MobileMenuComponent({ handleClose }) {
    const { isLoggedIn } = useUser();

    return (
        <div className={ MobileMenu }>
            { !isLoggedIn
                && <Link href='/login'><button onClick={ handleClose }>Sign in/Sign up</button></Link>
                || (
                    <Link href='/profile'>
                        <div className={ MobileMenu__AvatarImageWrapper } onClick={ handleClose }>
                            <Image src="/avatar.svg" alt="Avatar" width={ 128 } height={ 128 } />
                        </div>
                    </Link>
                )
            }
            <div onClick={ handleClose }>
                <HeaderLinksComponent />
            </div>
        </div>
    );
}
