'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Orders__List, Orders__List__Order, Orders__Wrapper } from './Orders.module.scss';

import { fetchAPI } from '@/utils/api';

export default function OrdersComponent() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAPI('/orders').then((response) => setOrders(response));
    }, []);

    return (
        <div className={ Orders__Wrapper }>
            <div className={ Orders__List }>
                { orders.data?.map((order) => (
                    <div className={ Orders__List__Order } key={ order.id }>
                        <div>
                            <span>Order</span>
                            <div><span>{ order.id }</span></div>
                        </div>
                        <div>
                            <span>Date</span>
                            <div><span>{ dayjs(order.createdAt).format('MMM D, YYYY') }</span></div>
                        </div>
                        <div>
                            <span>Time</span>
                            <div><span>{ dayjs(order.createdAt).format('HH:mm') }</span></div>
                        </div>
                        <div>
                            <span>Amount</span>
                            <div><span>EUR { order.grand_total.toFixed(2) }</span></div>
                        </div>
                        <div>
                            <span>Tokens</span>
                            <div><span>{ order.items[0].amount }</span></div>
                        </div>
                        <div>
                            <span>Status</span>
                            <div><span>{ order.status }</span></div>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
