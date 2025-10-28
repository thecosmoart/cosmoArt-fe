'use client';
import React, { useState } from 'react';

import { Profile__Page, Profile__Page__Wrapper } from './ProfilePage.module.scss';

import Orders from '@/components/Orders';
import Profile from '@/components/Profile';
import ProfileTopBarComponent from '@/components/ProfileTopBar';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { code: 'orders', label: 'Orders' },
        { code: 'profile', label: 'Profile' }
    ];

    return (
        <div className={ Profile__Page__Wrapper }>
            <ProfileTopBarComponent tabs={ tabs } activeTab={ activeTab } setActiveTab={ setActiveTab }/>
            <div className={ Profile__Page }>
                { activeTab === 'profile' && <Profile />  }
                { activeTab === 'orders' && <Orders />  }
            </div>
        </div>
    );
}
