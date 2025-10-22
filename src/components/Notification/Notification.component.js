'use client';
import { useCallback, useEffect, useState } from 'react';

import {
    Notification,
    Notification__Button,
    Notification__CloseButton,
    Notification__Error,
    Notification__Info,
    Notification__Link,
    Notification__Message,
    Notification__Success,
    Notification__Warning,
    Notification_closing
} from './Notification.module.scss';

import { useNotification } from '@/stores/Notification.store';

export default function NotificationComponent({
    id,
    type,
    message,
    button = null,
    closeButton = true,
    link = false
}) {
    const { closeNotification, lastCleanTime } = useNotification();
    const [isClosing, setIsClosing] = useState(false);

    const getClassName = useCallback((type) => {
        switch (type) {
            case 'error':
                return Notification__Error;
            case 'success':
                return Notification__Success;
            case 'info':
                return Notification__Info;
            case 'warning':
            default:
                return Notification__Warning;
        }
    }, [type, closeButton]);

    const handleClose = (id) => {
        setIsClosing(true);

        // For smooth closing
        setTimeout(() => {
            closeNotification(id);
            setIsClosing(false);
        }, 300);
    };

    useEffect(() => {
        if (id < lastCleanTime) {
            handleClose(id);
        }
    }, [lastCleanTime, id]);

    useEffect(() => {
        if (closeButton) {
            setTimeout(() => {
                handleClose(id);
            }, 5000);
        }
    }, []);

    return (
        <div className={ `
            ${Notification}
            ${getClassName(type)}
            ${isClosing && Notification_closing }
        ` }
        >
            <div className={ Notification__Message } >
                <div>
                    <span dangerouslySetInnerHTML={ { __html: message } }></span>
                    { link && <span className={ Notification__Link }>{ link }</span> }
                </div>
                { closeButton && (
                    <div className={ Notification__CloseButton } onClick={ () => handleClose(id) }></div>
                ) }
            </div>
            { button && (
                <div className={ Notification__Button } onClick={ button.onClick }>
                    <a href={ button.href }>{ button.label }</a>
                </div>
            ) }
        </div>
    );
}
