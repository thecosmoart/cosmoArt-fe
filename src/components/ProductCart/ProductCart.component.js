'use client';

import {
    ProductCart,
} from './ProductCart.module.scss';

import { useNotification } from '@/stores/Notification.store';
import { useQuote } from '@/stores/Quote.store';

export default function ProductCartComponent({ productData }) {
    const { addToCart, quote } = useQuote();
    const { addNotification } = useNotification();

    const handleAddToCart = () => {
        if (quote.items.find((item) => item.id === productData.id)) {
            addNotification({
                type: 'error',
                message: `"${productData.name}" is already in your cart!`
            });
            
            return;
        }

        addToCart(productData);
        addNotification({
            type: 'success',
            message: `"${productData.name}" added to cart!`
        });
    };

    return (
        <div className={ ProductCart }>
            <h3>{ productData.name } generations</h3>
            <h2>€ { productData.price.toFixed(0) }</h2>
            <p>{ productData.name } coin</p>
            <p>1 coin = { (productData.price / parseInt(productData.name)).toFixed(2) } ¢</p>
            <button onClick={ handleAddToCart }>Buy Now</button>
        </div>
    );
}
