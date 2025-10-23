'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

import {
    Banner,
    Banner__Actions,
    Banner__Background,
} from './Banner.module.scss';

import { useBreadcrumbs } from '@/stores/Breadcrumbs.store';

export default function BannerComponent() {
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs([]);
    }, []);

    return (
        <div className={ Banner }>
            <Image className={ Banner__Background } fill src="/backgrounds/hero-banner.gif" alt="hero banner" objectFit="cover" />
            <div className={ Banner__Actions }>
                <h1>Create stunning AI images from text</h1>
                <button>Start Generating</button>
            </div>
        </div>
    );
}
