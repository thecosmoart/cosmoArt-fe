import {
    FooterCopyright,
    FooterCopyright__Content,
    FooterCopyright__Wrapper
} from './FooterCopyright.module.scss';

export default function FooterCopyrightComponent() {
    return (
        <div className={ FooterCopyright }>
            <div className={ FooterCopyright__Wrapper }>
                <div className={ FooterCopyright__Content }>
                    <p>
                        © { new Date().getFullYear() } CosmoArt. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
