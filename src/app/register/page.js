import {
    RegisterPage__Wrapper
} from './RegisterPage.module.scss';

import AccountFormComponent from '@/components/AccountForm';
import ProfileTopBarComponent from '@/components/ProfileTopBar';

export default function RegisterPage() {
    return (
        <div className={ RegisterPage__Wrapper }>
            <ProfileTopBarComponent tabs={ [{ code: 'profile', label: 'Profile' }] } activeTab="profile" />
            <AccountFormComponent />
        </div>
    );
}
