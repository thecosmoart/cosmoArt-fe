'use client';
import Image from 'next/image';

import {
    Faq,
    Faq__Background,
    Faq__Item,
    Faq__Item__Content,
    Faq__List,
    Faq__Wrapper
} from './Faq.module.scss';

export default function FaqComponent() {
    const faqs = [
        {
            question: 'What are coins?',
            answer: 'Coins are the internal currency of The CosmoArt. You use them to generate.'
        },
        {
            question: 'My coins didn’t appear — what should I do?',
            answer: 'Payments may take a few minutes to process.If tokens don’t show up after 10–15 minutes, contact us at support@thecosmoart.com.'
        },
        {
            question: 'Do tokens expire?',
            answer: 'No, tokens never expire. You can use them anytime.'
        },
        {
            question: 'How does image generation work?',
            answer: 'Simply enter a text prompt — for example, “futuristic city at sunset” — choose a style, and our AI will generate your artwork.'
        },
        {
            question: 'Can I download my images in high quality?',
            answer: 'Yes, all generated images can be downloaded in high resolution.'
        },
        {
            question: 'Support',
            answer: 'Didn’t find what you were looking for? We’re always here to help. Contact our support team at support@thecosmoart.com — we usually respond within 24 hours.'
        }
    ];

    return (
        <div className={ Faq__Wrapper } id="faq">
            <div className={ Faq }>
                <h2>Frequently Asked Questions</h2>
                <div className={ Faq__List }>
                    {
                        faqs.map((faq, index) => (
                            <div key={ index } className={ Faq__Item }>
                                <h3>{ faq.question }</h3>
                                <p className={ Faq__Item__Content }>{ faq.answer }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
