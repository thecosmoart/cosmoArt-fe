import React from 'react';
import Image from 'next/image';

import { Profile__Background, Profile__Page, Profile__Page__Wrapper } from './ProfilePage.module.scss';

import Orders from '@/components/Orders';
import Profile from '@/components/Profile';

export default function ProfilePage() {
    return (
        <div className={ Profile__Page__Wrapper }>
            <div className={ Profile__Page }>
                <Image fill src="/backgrounds/account.svg" alt="account bg" objectFit="cover" className={ Profile__Background }/>
                <Profile/>
                <Orders/>
            </div>
        </div>
    );
}
