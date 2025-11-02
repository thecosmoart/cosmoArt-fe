'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
    Banner,
    Banner__Actions,
    Banner__Actions_active,
    Banner__Background,
    Banner__Wrapper
} from './Banner.module.scss';

import ImageGeneratorComponent from '@/components/ImageGenerator';
import { useDevice } from '@/stores/Device.store';
import { useUser } from '@/stores/User.store';

export default function BannerComponent() {
    const [generationActivated, setGenerationActivated] = useState(false);
    const { isDesktop } = useDevice();
    const { user, isLoggedIn } = useUser();
    const router = useRouter();

    const handleButtonClick = () => {
        if (!isLoggedIn) {
            router.push('/login');

            return;
        }

        if (!user.balance) {
            router.push('#pricing');

            return;
        }

        setGenerationActivated(true);
    };

    const renderBannerActions = () => (
        <div className={ `
                ${Banner__Actions}
                ${generationActivated ? Banner__Actions_active : '' }  `
        }>
            <h1>
                { generationActivated
                    ? 'Unleash Your Imagination \n with AI-Powered Art'
                    : 'Create stunning AI images from text'
                }
            </h1>
            { !generationActivated && <button onClick={ handleButtonClick }>Start Generating</button> }
        </div>
    );

    return (
        <div className={ Banner__Wrapper }>
            <div className={ Banner }>
                <Image className={ Banner__Background } fill src="/backgrounds/hero-banner.gif" alt="hero banner" objectFit="cover" />
                { isDesktop && (renderBannerActions()) }
            </div>
            { !isDesktop && (renderBannerActions()) }
            { generationActivated && <ImageGeneratorComponent /> }
        </div>
    );
}
