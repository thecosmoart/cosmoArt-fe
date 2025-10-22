'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import {
    CmsPage,
    CmsPage__Background,
    CmsPage__Wrapper
} from './CmsPage.module.scss';

import { useBreadcrumbs } from '@/stores/Breadcrumbs.store';
import { fetchAPI } from '@/utils/api';

export default function CmsPageComponent() {
    const { slug } = useParams();
    const [page, setPage] = useState({});
    const { setBreadcrumbs } = useBreadcrumbs();
    const router = useRouter();

    useEffect(() => {
        fetchAPI(`/cms-pages?filters[url]=${slug}`).then(({ data: [page] = [] }) => {
            if (page?.name) {
                setPage(page);

                return setBreadcrumbs([{ label: 'Home', link: '/' }, { label: page?.name }]);
            }

            router.push('/');
        });
    }, []);

    return page?.name && (
        <div className={ CmsPage__Wrapper }>
            <Image fill src="/backgrounds/cart.svg" alt="cart bg" objectFit="cover" className={ CmsPage__Background }/>
            <div className={ CmsPage }>
                <h1>{ page.name }</h1>
                <div dangerouslySetInnerHTML={ { __html: page.content } }></div>
            </div>
        </div>
    );
}
