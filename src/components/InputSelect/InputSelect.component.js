'use client';
import { useEffect, useRef, useState } from 'react';

import {
    InputSelect,
    InputSelect__Error,
    InputSelect_invalid
} from './InputSelect.module.scss';

export default function InputSelectComponent({
    label,
    id,
    options,
    forceValidate,
    rules,
    setIsValid
}) {
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
        <div
            className={ `
            ${ InputSelect }
            ${ errorMessage && InputSelect_invalid }
        ` }
        >
            <span>{ label }</span>
            <select id={ id } onChange={ validate } ref={ ref }>
                {
                    Object.values(options).map(({ label, value }) => (
                        <option key={ value } value={ value }>{ label }</option>
                    ))
                }
            </select>
            { errorMessage && <p className={ InputSelect__Error }>{ errorMessage }</p> }
        </div>
    );
}
