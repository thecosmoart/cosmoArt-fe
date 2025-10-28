import {
    LoginPage__Wrapper
} from './LoginPage.module.scss';

import LoginFormComponent from '@/components/LoginForm';
import ProfileTopBarComponent from '@/components/ProfileTopBar';

export default function LoginPage() {
    return (
        <div className={ LoginPage__Wrapper }>
            <ProfileTopBarComponent tabs={ [{ code: 'profile', label: 'Profile' }] } activeTab="profile" />
            <LoginFormComponent />
        </div>
    );
}
