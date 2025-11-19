import {
    HomePage,
    HomePage__Galaxy,
    HomePage__Stars
} from './HomePage.module.scss';

import BannerComponent from '@/components/Banner';
import FaqComponent from '@/components/Faq';
import HowItWorksComponent from '@/components/HowItWorks';
import ProductListComponent from '@/components/ProductList';
import WelcomeBlockComponent from '@/components/WelcomeBlock';
import WhyUsComponent from '@/components/WhyUs';

export default function Home() {
    return (
        <div className={ HomePage }>
            <div className={ HomePage__Stars }>
                <BannerComponent />
                <WelcomeBlockComponent />
            </div>
            <HowItWorksComponent />
            <div className={ HomePage__Galaxy }>
                <ProductListComponent />
                <WhyUsComponent />
                <FaqComponent />
            </div>
        </div>
    );
}
