'use client';

import { useRouter } from 'next/navigation';

import {
    ProductCart
} from './ProductCart.module.scss';

import { useUser } from '@/stores/User.store';
import { fetchAPI } from '@/utils/api';
import { browserStorage } from '@/utils/browserStorage';

export default function ProductCartComponent({ productData }) {
    const { isLoggedIn } = useUser();
    const router = useRouter();

    const postOrder = async (item) => {
        const requestData = {
            productIds: [item.documentId]
        };

        const { data } = await fetchAPI('/orders', null, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        browserStorage.set('orderId', data.orderId);

        window.location.replace(data.url);
    };

    const handleClick = (item) => {
        if (!isLoggedIn) {
            return router.push('/login');
        }

        postOrder(item);
    };
    
    return (
        <div className={ ProductCart }>
            <h3>{ productData.amount } generations</h3>
            <h2>€ { productData.price.toFixed(0) }</h2>
            <p>{ productData.amount } coin</p>
            <p>1 coin = { (productData.price / parseInt(productData.amount)).toFixed(2) } ¢</p>
            <button onClick={ () => handleClick(productData) }>Buy Now</button>
        </div>
    );
}
