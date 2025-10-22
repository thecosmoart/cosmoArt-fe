'use client';

import {
    Notifications,
    Notifications__List
} from './Notifications.module.scss';

import NotificationComponent from '@/components/Notification';
import { useNotification } from '@/stores/Notification.store';

export default function NotificationsComponent() {
    const { notifications } = useNotification();

    return (
        <div className={ Notifications }>
            <div className={ Notifications__List }>
                { notifications.map(
                    (notification, index) => (
                        <NotificationComponent
                            key={ index }
                            { ...notification }
                        />
                    )
                ) }
            </div>
        </div>
    );
}
