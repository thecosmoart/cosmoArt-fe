'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import {
    InputText,
    InputText__Error,
    InputText_invalid
} from './InputText.module.scss';

export default function InputTextComponent({
    placeholder,
    label,
    id,
    forceValidate,
    rules,
    setIsValid = () => {},
    type = 'text',
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref = useRef()
}) {
    const [errorMessage, setErrorMessage] = useState('');

    const validate = () => {
        const value = ref.current.value;

        if (rules) {
            for (const { rule, message } of rules) {
                if (!rule(value)) {
                    setErrorMessage(message);
                    setIsValid(id, false);

                    return false;
                }
            }
        }

        setIsValid(id, true);
        setErrorMessage(false);
    };

    useEffect(() => {
        if (forceValidate) {
            validate();
        }
    }, [forceValidate]);

    return (
        <div
            className={ `
            ${ InputText }
            ${ errorMessage && InputText_invalid }
        ` }
        >
            <span>{ label }</span>
            { type === 'textarea' ? (
                <textarea rows="5" placeholder={ placeholder } id={ id } ref={ ref } onChange={ validate } />
            ) : (
                <input type={ type } placeholder={ placeholder } id={ id } ref={ ref } onChange={ validate } />
            ) }
            { errorMessage && <p className={ InputText__Error }>{ errorMessage }</p> }
        </div>
    );
}
