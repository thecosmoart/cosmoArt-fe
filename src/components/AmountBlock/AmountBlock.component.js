import { useState } from 'react';

import {
    AmountBlock,
    AmountBlock__Amount,
    AmountBlock__Input
} from './AmountBlock.module.scss';

export default function AmountBlockComponent({ setQty }) {
    const [amount, setAmount] = useState('');

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');

        if (parseInt(value) > 1000) {
            setAmount('1000');
            setQty(1000);

            return;
        }

        setAmount(value);
        setQty(value);
    };

    return (
        <div className={ AmountBlock }>
            <div className={ AmountBlock__Amount }>
                € { amount && amount + '____'.substring(amount.length) || '1___' }
            </div>
            <input
                type="text"
                value={ amount }
                onChange={ handleChange }
                onClick={ () => setAmount('1') }
                placeholder="Enter amount"
                className={ AmountBlock__Input }
            />
        </div>
    );
}
