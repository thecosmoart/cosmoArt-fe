'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
    HeaderLinks,
    HeaderLinks__List,
    HeaderLinks__List__Item
} from './HeaderLinks.module.scss';

import { handleClick } from '@/utils/scroll';

export default function HeaderLinksComponent({ closeMenu }) {
    const router = useRouter();

    return (
        <div className={ HeaderLinks }>
            <ul className={ HeaderLinks__List }>
                <Link href="/" className={ HeaderLinks__List__Item }>
                    <span>Home</span>
                </Link>
                <li className={ HeaderLinks__List__Item } onClick={ () => router.push('/#about_us') }>
                    <span>About Us</span>
                </li>
                <li className={ HeaderLinks__List__Item } onClick={ () => router.push('/#pricing') }>
                    <span>Pricing</span>
                </li>
                <li className={ HeaderLinks__List__Item } onClick={ () => router.push('/#faq') }>
                    <span>FAQ</span>
                </li>
            </ul>
        </div>
    );
}
