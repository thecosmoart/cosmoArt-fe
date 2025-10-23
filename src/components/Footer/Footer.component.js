import {
    Footer
} from './Footer.module.scss';
import FooterLinksComponent from "@/components/Footer/FooterLinks";
import FooterCopyrightComponent from "@/components/Footer/FooterCopyright";

export default function FooterComponent() {
    return (
        <div className={ Footer }>
            <FooterLinksComponent />
            <FooterCopyrightComponent />
        </div>
    );
}