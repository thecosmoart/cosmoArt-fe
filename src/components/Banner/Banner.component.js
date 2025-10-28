import React from 'react';
import Image from 'next/image';

import {
    Banner,
    Banner__Actions,
    Banner__Background
} from './Banner.module.scss';

export default function BannerComponent() {
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
