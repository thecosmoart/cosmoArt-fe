import {
    Profile,
    Profile__Wrapper
} from  './Profile.module.scss';

import AccountFormComponent from '@/components/AccountForm';

export default function ProfileComponent() {
    return (
        <div className={ Profile__Wrapper }>
            <div className={ Profile }>
                <AccountFormComponent />
            </div>
        </div>
    );
}
