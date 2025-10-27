'use client';

import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
    LoginForm,
    LoginForm__RegisterLink,
    LoginForm__Wrapper
} from './LoginForm.module.scss';

import FormComponent from '@/components/Form';
import InputTextComponent from '@/components/InputText';
import { useBreadcrumbs } from '@/stores/Breadcrumbs.store';
import { useNotification } from '@/stores/Notification.store';
import { useUser } from '@/stores/User.store';
import { fetchAPI } from '@/utils/api';
import { browserStorage } from '@/utils/browserStorage';

export default function LoginFormComponent() {
    const { getUserData, isLoggedIn } = useUser();
    const router = useRouter();
    const { addNotification } = useNotification();
    const [validateForm, setValidateForm] = useState(false);
    const [validationResult] = useState({
        username: false,
        password: false
    });
    const ref = useRef();

    const setIsValid = (id, isValid) => {
        validationResult[id] = isValid;
    };

    const handleSubmit = async () => {
        try {
            let result = await fetchAPI('/auth/local', null, {
                body: JSON.stringify({
                    identifier: ref.current?.username?.value,
                    password: ref.current?.password?.value
                }),
                method: 'POST'
            });

            if (!result.jwt) {
                addNotification({ type: 'error', message: 'Invalid credentials!' });

                return;
            }

            browserStorage.set('jwt', result.jwt, 86400);
            Cookies.set('theme', result.jwt, 86400);

            await getUserData();
            addNotification({ type: 'success', message: 'Logged in successfully!' });
        } catch (e) {
            addNotification({ type: 'error', message: e.message ?? 'Invalid credentials!' });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [router, isLoggedIn]);

    return (
        <div className={ LoginForm__Wrapper }>
            <FormComponent
                className={ LoginForm }
                onSubmit={ handleSubmit }
                setValidateForm={ setValidateForm }
                validationResult={ validationResult }
                ref={ ref }
            >
                <InputTextComponent
                    placeholder="Username"
                    id="username"
                    forceValidate={ validateForm }
                    rules={ [
                        { rule: value => value.trim() !== '', message: 'Username is required' },
                        { rule: value => value.length >= 3, message: 'Username should be at least 3 characters long' }
                    ] }
                    setIsValid={ setIsValid }
                />
                <InputTextComponent
                    placeholder="Password"
                    id="password"
                    type="password"
                    forceValidate={ validateForm }
                    rules={ [
                        { rule: value => value.trim() !== '', message: 'Password is required' },
                        { rule: value => value.length >= 8, message: 'Password should be at least 8 characters long' }
                    ] }
                    setIsValid={ setIsValid }
                />
                <button type="submit">Log in</button>
                <div className={ LoginForm__RegisterLink }>Dont have an account? <Link href="/register">Register</Link></div>
            </FormComponent>
        </div>
    );
}
