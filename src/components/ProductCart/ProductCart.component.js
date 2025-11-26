'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    ProductCart
} from './ProductCart.module.scss';

import AmountBlockComponent from '@/components/AmountBlock';
import { useUser } from '@/stores/User.store';
import { fetchAPI } from '@/utils/api';
import { browserStorage } from '@/utils/browserStorage';

export default function ProductCartComponent({ productData }) {
    const { isLoggedIn } = useUser();
    const router = useRouter();
    const isCustom = productData.custom;
    const [qty, setQty] = useState(1);

    const postOrder = async (item, qty) => {
        const requestData = {
            productIds: [item.documentId],
            qty: parseInt(qty)
        };

        const { data } = await fetchAPI('/orders', null, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        browserStorage.set('orderId', data.orderId);

        window.location.replace(data.url);
    };

    const handleClick = (item, qty) => {
        if (!isLoggedIn) {
            return router.push('/login');
        }

        postOrder(item, qty);
    };
    
    return (
        <div className={ ProductCart }>
            <h3>{ isCustom && 'Enter your amount' || `${ productData.amount } generations` }</h3>
            <h2>{ isCustom && <AmountBlockComponent setQty={ setQty }/> || `€ ${productData.price.toFixed(0)}` }</h2>
            { !isCustom && <p>{ productData.amount } coin</p> }
            <p>1 coin = { (productData.price / parseInt(productData.amount)).toFixed(2) } €</p>
            { isCustom && (<p>Enter amount, get coins</p>) }
            <button onClick={ () => handleClick(productData, qty) }>Buy Now</button>
        </div>
    );
}
