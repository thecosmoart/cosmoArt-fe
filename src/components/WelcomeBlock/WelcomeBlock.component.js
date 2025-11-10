'use client';

import {
    WelcomeBlock,
    WelcomeBlock__Single,
    WelcomeBlock__Tripple
} from './WelcomeBlock.module.scss';

import { useUser } from '@/stores/User.store';

export default function WelcomeBlockComponent() {
    const { isGeneratingActivated } = useUser();

    return !isGeneratingActivated && (
        <div className={ WelcomeBlock } id="about_us">
            <div className={ WelcomeBlock__Tripple }>
                <h2>Welcome</h2>
                <h2>to</h2>
                <h2>The CosmoArt</h2>
            </div>
            <div className={ WelcomeBlock__Single }>
                <p>
                    Where Imagination
                    Meets Artificial Intelligence
                </p>
                <p>
                    TheCosmoArt is a next-generation platform that turns your words into beautiful AI-generated images.
                    Our mission is to make visual creativity accessible to everyone — artists, designers, creators, and
                    dreamers — by merging human imagination with artificial intelligence.
                </p>
            </div>
        </div>
    );
}
