'use client';

import Link from 'next/link';

import {
    HeaderLinks,
    HeaderLinks__List,
    HeaderLinks__List__Item
} from './HeaderLinks.module.scss';

import { handleClick } from '@/utils/scroll';

export default function HeaderLinksComponent({ closeMenu }) {
    return (
        <div className={ HeaderLinks }>
            <ul className={ HeaderLinks__List }>
                <Link href="/" className={ HeaderLinks__List__Item } onClick={ closeMenu }>
                    <span>Home</span>
                </Link>
                <li className={ HeaderLinks__List__Item } onClick={ () => {
                    handleClick('contact_us');
                    closeMenu();
                } }>
                    <span>About Us</span>
                </li>
                <li className={ HeaderLinks__List__Item } onClick={ () => {
                    handleClick('faq');
                    closeMenu();
                } }>
                    <span>Pricing</span>
                </li>
                <li className={ HeaderLinks__List__Item } onClick={ () => {
                    handleClick('faq');
                    closeMenu();
                } }>
                    <span>FAQ</span>
                </li>
            </ul>
        </div>
    );
}
