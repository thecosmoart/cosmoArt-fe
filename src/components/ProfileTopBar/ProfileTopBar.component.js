'use client';

import {
    ProfileTopBar,
    ProfileTopBar__Tabs,
    ProfileTopBar__Tabs__Tab,
    ProfileTopBar__Tabs__Tab_isActive
} from './ProfileTopBar.module.scss';

import { useUser } from '@/stores/User.store';

export default function ProfileTopBarComponent({ tabs, activeTab, setActiveTab }) {
    const { user } = useUser();

    return (
        <div className={ ProfileTopBar }>
            <h1>Welcome{ user?.address?.first_name ? `, ${user?.address?.first_name}` : '' }</h1>
            <div className={ ProfileTopBar__Tabs }>
                { tabs.map((tab) => (
                    <div className={ `
                        ${ProfileTopBar__Tabs__Tab}
                        ${activeTab === tab.code && ProfileTopBar__Tabs__Tab_isActive }
                    ` } key={ tab.code } onClick={ () => setActiveTab(tab.code) }>
                        <span>{ tab.label }</span>
                    </div>
                )) }
            </div>
        </div>
    );
}
