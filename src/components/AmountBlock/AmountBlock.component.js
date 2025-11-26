import { useEffect, useRef, useState } from 'react';

import {
    AmountBlock,
    AmountBlock__Amount,
    AmountBlock__Amount_active,
    AmountBlock__Input
} from './AmountBlock.module.scss';

export default function AmountBlockComponent({ setQty }) {
    const [amount, setAmount] = useState('');
    const [isActive, setIsActive] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                setIsActive(false);
            }
        };

        window.addEventListener('mousedown', handleOutSideClick);

        return () => {
            window.removeEventListener('mousedown', handleOutSideClick);
        };
    }, [ref]);

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');

        if (parseInt(value) > 1000) {
            setAmount('1000');
            setQty(1000);
            setIsActive(false);

            return;
        }

        setAmount(value);
        setQty(value);
    };

    const makeActive = () => {
        setAmount('1');
        setIsActive(true);
    };

    return (
        <div className={ AmountBlock } ref={ ref }>
            <div className={ `
                ${AmountBlock__Amount}
                ${isActive && AmountBlock__Amount_active }
            ` }>
                € { amount ?? '1' }
                <b>{ '____'.substring(amount.length) }</b>
            </div>
            <input
                type="text"
                value={ amount }
                onChange={ handleChange }
                onClick={ makeActive }
                placeholder="Enter amount"
                className={ AmountBlock__Input }
            />
        </div>
    );
}
