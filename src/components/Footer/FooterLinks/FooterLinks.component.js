import Link from 'next/link';

import {
    FooterLinks
} from './FooterLinks.module.scss';

import { fetchAPI } from '@/utils/api';

export default async function FooterLinksComponent() {
    const { data: links } = await fetchAPI('/cms-pages') ?? [];

    return (
        <div className={ FooterLinks }>
            { links?.map((link, index) => <Link href={ `/${link.url}` } key={ index }>
                <span>{ link.name }</span>
            </Link>) }
        </div>
    );
}
