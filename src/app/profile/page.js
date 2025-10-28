'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Profile__Page, Profile__Page__Wrapper } from './ProfilePage.module.scss';

import Orders from '@/components/Orders';
import Profile from '@/components/Profile';
import ProfileTopBarComponent from '@/components/ProfileTopBar';
import { useUser } from '@/stores/User.store';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const { isLoggedIn } = useUser();
    const router = useRouter();

    const tabs = [
        { code: 'orders', label: 'Orders' },
        { code: 'profile', label: 'Profile' }
    ];

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, []);

    return isLoggedIn && (
        <div className={ Profile__Page__Wrapper }>
            <ProfileTopBarComponent tabs={ tabs } activeTab={ activeTab } setActiveTab={ setActiveTab }/>
            <div className={ Profile__Page }>
                { activeTab === 'profile' && <Profile />  }
                { activeTab === 'orders' && <Orders />  }
            </div>
        </div>
    );
}
