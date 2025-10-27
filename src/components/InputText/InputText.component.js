'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import {
    InputText,
    InputText__Error,
    InputText_invalid
} from './InputText.module.scss';

export default function InputTextComponent({ placeholder, id, forceValidate, rules, setIsValid, iconLink = '', type = 'text' }) {
    const [errorMessage, setErrorMessage] = useState('');
    const ref = useRef();

    const validate = () => {
        const value = ref.current.value;

        for (const { rule, message } of rules) {
            if (!rule(value)) {
                setErrorMessage(message);
                setIsValid(id, false);

                return false;
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
        <div className={ `
            ${InputText}
            ${errorMessage && InputText_invalid}
        ` }>
            { iconLink && <Image src={ iconLink  } width={ 20 } height={ 20 } alt="icon" className={ 'input-icon' } /> }
            { type === 'textarea' ? (
                <textarea rows="5"  placeholder={ placeholder } id={ id } ref={ ref } onChange={ validate }/>
            ) : (
                <input type={ type } placeholder={ placeholder } id={ id } ref={ ref } onChange={ validate }/>
            )  }
            { errorMessage && <p className={ InputText__Error }>{ errorMessage }</p>  }
        </div>
    );
}
