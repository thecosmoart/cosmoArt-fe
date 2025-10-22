import {
    HomePage
} from './HomePage.module.scss';

import BannerComponent from '@/components/Banner';

export default function Home() {
    return (
        <div className={ HomePage }>
            <BannerComponent />
        </div>
    );
}
