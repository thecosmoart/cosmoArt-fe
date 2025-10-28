'use client';

import { useEffect, useRef, useState } from 'react';
import { getCountryDataList, getEmojiFlag } from 'countries-list';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
    AccountForm,
    AccountForm__ImageWrapper,
    AccountForm__SubWrapper,
    AccountForm__Wrapper
} from './AccountForm.module.scss';

import FormComponent from '@/components/Form';
import InputSelectComponent from '@/components/InputSelect';
import InputTextComponent from '@/components/InputText';
import { useBreadcrumbs } from '@/stores/Breadcrumbs.store';
import { useNotification } from '@/stores/Notification.store';
import { useUser } from '@/stores/User.store';
import { fetchAPI } from '@/utils/api';
import { browserStorage } from '@/utils/browserStorage';

export default function AccountFormComponent() {
    const { setUser, isLoggedIn, getUserData } = useUser();
    const countries = getCountryDataList();
    const router = useRouter();
    const { setBreadcrumbs } = useBreadcrumbs();
    const { addNotification } = useNotification();
    const [validateForm, setValidateForm] = useState(false);
    const [validationResult] = useState({
        name: false,
        lastname: false,
        email: false,
        password: false,
        phone: false,
        country: false,
        city: false,
        postcode: false,
        address: false
    });
    const ref = useRef();

    useEffect(() => {
        setBreadcrumbs([{ label: 'Home', link: '/' }, { label: 'Register' }]);
    }, []);

    const setIsValid = (id, isValid) => {
        validationResult[id] = isValid;
    };

    const saveAddress = async () => {
        const data = {
            first_name: ref.current?.name?.value,
            last_name: ref.current?.lastname?.value,
            phone: ref.current?.phone?.value,
            country: ref.current?.country?.value,
            city: ref.current?.city?.value,
            zip: ref.current?.postcode?.value,
            street: ref.current?.address?.value
        };

        try {
            const result = await fetchAPI('/addresses', null, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (result?.data?.id) {
                getUserData();
            }
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.message ?? 'An error occurred while updating address. Please try again!'
            });
        }
    };

    const handleSubmit = async () => {
        try {
            let result = await fetchAPI('/auth/local/register', null, {
                body: JSON.stringify({
                    username: ref.current?.email?.value,
                    email: ref.current?.email?.value,
                    password: ref.current?.password?.value
                }),
                method: 'POST'
            });

            if (!result.jwt) {
                addNotification({
                    type: 'error',
                    message: 'Failed to register. Please check the entered details and try again.'
                });

                return;
            }

            browserStorage.set('jwt', result.jwt, 86400);

            await saveAddress();
            addNotification({ type: 'success', message: 'Registration is successful!' });
        } catch (e) {
            addNotification({
                type: 'error',
                message: e.message ?? 'An error occurred while registering. Please try again.'
            });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [router, isLoggedIn]);

    return (
        <div className={ AccountForm__Wrapper }>
            <div className={ AccountForm__SubWrapper }>
                <h2>Profile Settings</h2>
                <div className={ AccountForm__ImageWrapper }>
                    <Image src="/avatar.svg" alt="Avatar" width={ 128 } height={ 128 } />
                </div>
                <FormComponent
                    className={ AccountForm }
                    onSubmit={ handleSubmit }
                    setValidateForm={ setValidateForm }
                    validationResult={ validationResult }
                    ref={ ref }
                >
                    <InputTextComponent
                        label="Name"
                        id="name"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Name is required' },
                            { rule: value => value.length >= 3, message: 'Name should be at least 3 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="Last name"
                        id="lastname"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Last name is required' },
                            { rule: value => value.length >= 3, message: 'Last name should be at least 3 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="Email"
                        id="email"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Email is required' },
                            { rule: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email format' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="Password"
                        id="password"
                        type="password"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Password is required' },
                            { rule: value => value.length >= 8, message: 'Password should be at least 8 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="Phone number"
                        id="phone"
                        forceValidate={ validateForm }
                        rules={ [
                            {
                                rule: (value) => value.trim()!== '' && value.trim().length >= 8,
                                message: 'Phone number must be at least 8 digits long'
                            },
                            {
                                rule: (value) => /^\+[1-9]\d{0,14}$/.test(value),
                                message: 'Phone number must be in the format +123456789012'
                            }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputSelectComponent
                        label="Country"
                        id="country"
                        options={ Object.values(countries).map(({ name, iso2 }) => ({ value: iso2, label: `${getEmojiFlag(iso2)} ${name}` })) }
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Country is required' },
                            { rule: value => value.length >= 2, message: 'Country should be at least 2 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="City"
                        id="city"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'City is required' },
                            { rule: value => value.length >= 2, message: 'City should be at least 2 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="Postcode"
                        id="postcode"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Postcode is required' },
                            { rule: value => value.length >= 2, message: 'Postcode should be at least 2 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <InputTextComponent
                        label="Address"
                        id="address"
                        forceValidate={ validateForm }
                        rules={ [
                            { rule: value => value.trim() !== '', message: 'Address is required' },
                            { rule: value => value.length >= 2, message: 'Address should be at least 2 characters long' }
                        ] }
                        setIsValid={ setIsValid }
                    />
                    <button type="submit">Register</button>
                </FormComponent>
            </div>
        </div>
    );
}
