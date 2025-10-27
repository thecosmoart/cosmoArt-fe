import {
    HomePage
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
            <WelcomeBlockComponent />
            <HowItWorksComponent />
            <ProductListComponent />
            <WhyUsComponent />
            <FaqComponent />
        </div>
    );
}
