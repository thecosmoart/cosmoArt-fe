'use client';

import { useEffect, useState } from 'react';
import { Orders__Wrapper } from './Orders.module.scss';

import { fetchAPI } from '@/utils/api';

export default function OrdersComponent() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAPI('/orders').then((response) => setOrders(response));
    }, []);

    return (
        <div className={ Orders__Wrapper }>
        </div>
    );
}
