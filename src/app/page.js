import {
    HomePage,
    HomePage__Stars,
    HomePage__Galaxy,
} from './HomePage.module.scss';

import BannerComponent from '@/components/Banner';
import FaqComponent from "@/components/Faq";
import HowItWorksComponent from "@/components/HowItWorks";
import WelcomeBlockComponent from "@/components/WelcomeBlock";
import ProductListComponent from "@/components/ProductList";
import WhyUsComponent from "@/components/WhyUs";

export default function Home() {
    return (
        <div className={ HomePage }>
            <BannerComponent />
            <div className={ HomePage__Stars }>
                <WelcomeBlockComponent />
                <HowItWorksComponent />
            </div>
            <div className={ HomePage__Galaxy }>
                <ProductListComponent />
                <WhyUsComponent />
                <FaqComponent />
            </div>
        </div>
    );
}
