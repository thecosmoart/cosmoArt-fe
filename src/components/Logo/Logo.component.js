'use client';
import Image from 'next/image';
import Link from 'next/link';

import {
    Logo
} from './Logo.module.scss';

import { useDevice } from '@/stores/Device.store';

export default function LogoComponent() {
    const { isMobile } = useDevice();

    return (
        <div className={ Logo }>
            <Link href="/">
                <Image
                    src={ '/logo.svg' }
                    alt={ 'logo' }
                    width={ isMobile ? 113 : 149 }
                    height={ isMobile ? 42 : 56 }
                />
            </Link>
        </div>
    );
}
