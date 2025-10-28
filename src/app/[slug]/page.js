'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
    CmsPage,
    CmsPage__Wrapper
} from './CmsPage.module.scss';

import { fetchAPI } from '@/utils/api';

export default function CmsPageComponent() {
    const { slug } = useParams();
    const [page, setPage] = useState({});
    const router = useRouter();

    useEffect(() => {
        fetchAPI(`/cms-pages?filters[url]=${slug}`).then(({ data: [page] = [] }) => {
            if (page?.name) {
                setPage(page);

                return;
            }

            router.push('/');
        });
    }, []);

    return page?.name && (
        <div className={ CmsPage__Wrapper }>
            <div className={ CmsPage }>
                <h1>{ page.name }</h1>
                <div dangerouslySetInnerHTML={ { __html: page.content } }></div>
            </div>
        </div>
    );
}
